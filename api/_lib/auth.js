const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'roomzy-auth-secret-key-2026';

let supabaseClient = null;
let sqliteDb = null;

function getSupabase() {
    if (supabaseClient) return supabaseClient;
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (url && key) {
        const { createClient } = require('@supabase/supabase-js');
        supabaseClient = createClient(url, key, {
            auth: { persistSession: false, autoRefreshToken: false }
        });
    }
    return supabaseClient;
}

function getSqlite() {
    if (sqliteDb) return sqliteDb;
    const path = require('path');
    const fs = require('fs');
    const { DatabaseSync } = require('node:sqlite');
    const dataDir = path.join(__dirname, '..', '..', 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    const dbPath = path.join(dataDir, 'roomzy.db');
    sqliteDb = new DatabaseSync(dbPath);
    sqliteDb.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('student', 'owner')),
            property_name TEXT DEFAULT '',
            property_city TEXT DEFAULT '',
            created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS otps (
            phone TEXT PRIMARY KEY,
            otp_hash TEXT NOT NULL,
            expires_at TEXT NOT NULL,
            created_at TEXT NOT NULL
        );
    `);
    return sqliteDb;
}

function formatUserRow(row) {
    if (!row) return null;
    return {
        id: row.id,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.role,
        propertyName: row.property_name || '',
        propertyCity: row.property_city || '',
        timestamp: row.created_at
    };
}

async function findUserByEmail(email) {
    const sb = getSupabase();
    if (sb) {
        const { data, error } = await sb
            .from('roomzy_users')
            .select('*')
            .eq('email', email)
            .maybeSingle();
        if (error) throw error;
        return data || null;
    }
    const db = getSqlite();
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email) || null;
}

async function findUserById(id) {
    const sb = getSupabase();
    if (sb) {
        const { data, error } = await sb
            .from('roomzy_users')
            .select('*')
            .eq('id', id)
            .maybeSingle();
        if (error) throw error;
        return data || null;
    }
    const db = getSqlite();
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id) || null;
}

async function insertUser({ name, email, phone, passwordHash, role, propertyName, propertyCity, createdAt }) {
    const sb = getSupabase();
    if (sb) {
        const { data, error } = await sb
            .from('roomzy_users')
            .insert({
                name,
                email,
                phone,
                password_hash: passwordHash,
                role,
                property_name: propertyName,
                property_city: propertyCity,
                created_at: createdAt
            })
            .select('*')
            .single();
        if (error) throw error;
        return data;
    }
    const db = getSqlite();
    const result = db.prepare(`
        INSERT INTO users (name, email, phone, password_hash, role, property_name, property_city, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(name, email, phone, passwordHash, role, propertyName, propertyCity, createdAt);
    return {
        id: Number(result.lastInsertRowid),
        name,
        email,
        phone,
        password_hash: passwordHash,
        role,
        property_name: propertyName,
        property_city: propertyCity,
        created_at: createdAt
    };
}

async function saveOtpRecord(phone, otpHash, expiresAt, createdAt) {
    const sb = getSupabase();
    if (sb) {
        const { error } = await sb
            .from('roomzy_otps')
            .upsert(
                { phone, otp_hash: otpHash, expires_at: expiresAt, created_at: createdAt },
                { onConflict: 'phone' }
            );
        if (error) throw error;
        return;
    }
    const db = getSqlite();
    db.prepare(`
        INSERT INTO otps (phone, otp_hash, expires_at, created_at)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(phone) DO UPDATE SET
            otp_hash = excluded.otp_hash,
            expires_at = excluded.expires_at,
            created_at = excluded.created_at
    `).run(phone, otpHash, expiresAt, createdAt);
}

async function getOtpRecord(phone) {
    const sb = getSupabase();
    if (sb) {
        const { data, error } = await sb
            .from('roomzy_otps')
            .select('*')
            .eq('phone', phone)
            .maybeSingle();
        if (error) throw error;
        return data || null;
    }
    const db = getSqlite();
    return db.prepare('SELECT * FROM otps WHERE phone = ?').get(phone) || null;
}

async function deleteOtpRecord(phone) {
    const sb = getSupabase();
    if (sb) {
        await sb.from('roomzy_otps').delete().eq('phone', phone);
        return;
    }
    const db = getSqlite();
    db.prepare('DELETE FROM otps WHERE phone = ?').run(phone);
}

async function trySendTwilioSms(phone, otp) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromPhone = process.env.TWILIO_FROM_NUMBER;
    if (!sid || !authToken || !fromPhone) {
        return false;
    }

    const body = new URLSearchParams({
        To: `+91${phone}`,
        From: fromPhone,
        Body: `Your RoomZy verification code is ${otp}. Valid for 5 minutes.`
    });

    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
        method: 'POST',
        headers: {
            Authorization: 'Basic ' + Buffer.from(`${sid}:${authToken}`).toString('base64'),
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: body.toString()
    });

    return res.ok;
}

async function sendOtp(body) {
    const trimmedPhone = ((body && body.phone) || '').trim();

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
        return { status: 400, json: { error: 'Enter a valid 10-digit mobile number.' } };
    }

    const otp = String(crypto.randomInt(100000, 1000000));
    const otpHash = await bcrypt.hash(otp, 8);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60 * 1000).toISOString();

    await saveOtpRecord(trimmedPhone, otpHash, expiresAt, now.toISOString());

    let smsDelivered = false;
    try {
        smsDelivered = await trySendTwilioSms(trimmedPhone, otp);
    } catch (err) {
        console.error('SMS provider error:', err);
    }

    const responseJson = {
        message: smsDelivered
            ? `OTP sent to +91 ${trimmedPhone}`
            : `OTP generated for ${trimmedPhone}`
    };

    if (!smsDelivered) {
        responseJson.demoOtp = otp;
    }

    return { status: 200, json: responseJson };
}

async function verifyOtp(body) {
    const trimmedPhone = ((body && body.phone) || '').trim();
    const trimmedOtp = String((body && body.otp) || '').trim();

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
        return { status: 400, json: { error: 'Enter a valid 10-digit mobile number.' } };
    }

    if (!/^[0-9]{6}$/.test(trimmedOtp)) {
        return { status: 400, json: { error: 'Enter a valid 6-digit OTP.' } };
    }

    const record = await getOtpRecord(trimmedPhone);
    if (!record) {
        return { status: 400, json: { error: 'No OTP found for this mobile number. Please click Send OTP first.' } };
    }

    if (new Date(record.expires_at).getTime() < Date.now()) {
        await deleteOtpRecord(trimmedPhone);
        return { status: 400, json: { error: 'OTP has expired. Please request a new OTP.' } };
    }

    const isValid = await bcrypt.compare(trimmedOtp, record.otp_hash);
    if (!isValid) {
        return { status: 400, json: { error: 'Invalid OTP! Please check and try again.' } };
    }

    await deleteOtpRecord(trimmedPhone);

    const verificationToken = jwt.sign(
        { purpose: 'phone_otp_verified', phone: trimmedPhone },
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    return {
        status: 200,
        json: {
            message: 'Mobile number verified successfully!',
            verificationToken
        }
    };
}

async function registerUser(body) {
    const {
        name,
        email,
        phone,
        password,
        role,
        propertyName = '',
        propertyCity = '',
        otpVerificationToken = ''
    } = body || {};

    const trimmedName = (name || '').trim();
    const normalizedEmail = (email || '').trim().toLowerCase();
    const trimmedPhone = (phone || '').trim();
    const userRole = role === 'owner' ? 'owner' : 'student';

    if (!trimmedName || !normalizedEmail || !trimmedPhone || !password) {
        return { status: 400, json: { error: 'Please fill in all required fields.' } };
    }

    if (!/^[0-9]{10}$/.test(trimmedPhone)) {
        return { status: 400, json: { error: 'Enter a valid 10-digit mobile number.' } };
    }

    if (String(password).length < 6) {
        return { status: 400, json: { error: 'Password must contain at least 6 characters.' } };
    }

    if (userRole === 'student') {
        if (!otpVerificationToken) {
            return { status: 400, json: { error: 'Please verify your mobile number via OTP before creating an account.' } };
        }
        try {
            const payload = jwt.verify(otpVerificationToken, JWT_SECRET);
            if (payload.purpose !== 'phone_otp_verified' || payload.phone !== trimmedPhone) {
                return { status: 400, json: { error: 'Mobile number does not match verified OTP. Please verify again.' } };
            }
        } catch (_) {
            return { status: 400, json: { error: 'OTP verification expired or invalid. Please verify your mobile number again.' } };
        }
    }

    if (userRole === 'owner' && (!propertyName.trim() || !propertyCity.trim())) {
        return { status: 400, json: { error: 'Please provide PG / Property Name and PG City.' } };
    }

    const existing = await findUserByEmail(normalizedEmail);
    if (existing) {
        return { status: 409, json: { error: 'User already exists with this email!' } };
    }

    const passwordHash = await bcrypt.hash(String(password), 10);
    const createdAt = new Date().toISOString();

    const row = await insertUser({
        name: trimmedName,
        email: normalizedEmail,
        phone: trimmedPhone,
        passwordHash,
        role: userRole,
        propertyName: userRole === 'owner' ? propertyName.trim() : '',
        propertyCity: userRole === 'owner' ? propertyCity.trim() : '',
        createdAt
    });

    return {
        status: 201,
        json: {
            message: 'Registration successful! Please login.',
            user: formatUserRow(row)
        }
    };
}

async function loginUser(body) {
    const { email, password, role } = body || {};
    const normalizedEmail = (email || '').trim().toLowerCase();

    if (!normalizedEmail || !password || !role) {
        return { status: 400, json: { error: 'Email, password, and role are required.' } };
    }

    const row = await findUserByEmail(normalizedEmail);
    if (!row || row.role !== role) {
        return { status: 401, json: { error: 'Invalid email or password!' } };
    }

    const validPassword = await bcrypt.compare(String(password), row.password_hash);
    if (!validPassword) {
        return { status: 401, json: { error: 'Invalid email or password!' } };
    }

    const user = formatUserRow(row);
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
    );

    return {
        status: 200,
        json: {
            message: `Welcome back, ${user.name}!`,
            token,
            user
        }
    };
}

async function getAuthenticatedUser(authHeader) {
    const header = authHeader || '';
    if (!header.startsWith('Bearer ')) {
        return { status: 401, json: { error: 'Unauthorized' } };
    }

    try {
        const token = header.slice(7);
        const payload = jwt.verify(token, JWT_SECRET);
        const row = await findUserById(payload.id);
        if (!row) {
            return { status: 401, json: { error: 'User not found' } };
        }
        return { status: 200, json: { user: formatUserRow(row) } };
    } catch (_) {
        return { status: 401, json: { error: 'Invalid or expired session' } };
    }
}

module.exports = {
    sendOtp,
    verifyOtp,
    registerUser,
    loginUser,
    getAuthenticatedUser
};

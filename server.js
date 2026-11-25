const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { DatabaseSync } = require('node:sqlite');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'roomzy-auth-secret-key-2026';

// Ensure data directory exists for persistent SQLite storage
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'roomzy.db');
const db = new DatabaseSync(dbPath);

// Initialize users table
db.exec(`
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
    )
`);

app.use(express.json());

// ================= AUTH API ROUTES =================

// Create Account (Register)
app.post('/api/auth/register', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            role,
            propertyName = '',
            propertyCity = ''
        } = req.body || {};

        const trimmedName = (name || '').trim();
        const normalizedEmail = (email || '').trim().toLowerCase();
        const trimmedPhone = (phone || '').trim();
        const userRole = role === 'owner' ? 'owner' : 'student';

        if (!trimmedName || !normalizedEmail || !trimmedPhone || !password) {
            return res.status(400).json({ error: 'Please fill in all required fields.' });
        }

        if (!/^[0-9]{10}$/.test(trimmedPhone)) {
            return res.status(400).json({ error: 'Enter a valid 10-digit mobile number.' });
        }

        if (String(password).length < 6) {
            return res.status(400).json({ error: 'Password must contain at least 6 characters.' });
        }

        if (userRole === 'owner' && (!propertyName.trim() || !propertyCity.trim())) {
            return res.status(400).json({ error: 'Please provide PG / Property Name and PG City.' });
        }

        const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
        if (existing) {
            return res.status(409).json({ error: 'User already exists with this email!' });
        }

        const passwordHash = await bcrypt.hash(String(password), 10);
        const createdAt = new Date().toISOString();

        const result = db.prepare(`
            INSERT INTO users (name, email, phone, password_hash, role, property_name, property_city, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
            trimmedName,
            normalizedEmail,
            trimmedPhone,
            passwordHash,
            userRole,
            userRole === 'owner' ? propertyName.trim() : '',
            userRole === 'owner' ? propertyCity.trim() : '',
            createdAt
        );

        const user = {
            id: Number(result.lastInsertRowid),
            name: trimmedName,
            email: normalizedEmail,
            phone: trimmedPhone,
            role: userRole,
            propertyName: userRole === 'owner' ? propertyName.trim() : '',
            propertyCity: userRole === 'owner' ? propertyCity.trim() : '',
            timestamp: createdAt
        };

        return res.status(201).json({
            message: 'Registration successful! Please login.',
            user
        });
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ error: 'Server error while creating account.' });
    }
});

// Sign In (Login)
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, role } = req.body || {};
        const normalizedEmail = (email || '').trim().toLowerCase();

        if (!normalizedEmail || !password || !role) {
            return res.status(400).json({ error: 'Email, password, and role are required.' });
        }

        const row = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);
        if (!row || row.role !== role) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        const validPassword = await bcrypt.compare(String(password), row.password_hash);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid email or password!' });
        }

        const user = {
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            role: row.role,
            propertyName: row.property_name,
            propertyCity: row.property_city,
            timestamp: row.created_at
        };

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return res.json({
            message: `Welcome back, ${user.name}!`,
            token,
            user
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error while signing in.' });
    }
});

// Get Current Logged-in User (Verify Session Token)
app.get('/api/auth/me', (req, res) => {
    try {
        const authHeader = req.headers.authorization || '';
        if (!authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const token = authHeader.slice(7);
        const payload = jwt.verify(token, JWT_SECRET);

        const row = db.prepare('SELECT * FROM users WHERE id = ?').get(payload.id);
        if (!row) {
            return res.status(401).json({ error: 'User not found' });
        }

        const user = {
            id: row.id,
            name: row.name,
            email: row.email,
            phone: row.phone,
            role: row.role,
            propertyName: row.property_name,
            propertyCity: row.property_city,
            timestamp: row.created_at
        };

        return res.json({ user });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
});

// Logout endpoint
app.post('/api/auth/logout', (_req, res) => {
    return res.json({ message: 'Logged out successfully.' });
});

// Serve static frontend files strictly from root (only public frontend assets)
const allowedStaticFiles = new Set(['/index.html', '/style.css', '/script.js', '/logo.png']);
app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.use((req, res, next) => {
    if (req.method === 'GET' && allowedStaticFiles.has(req.path)) {
        return res.sendFile(path.join(__dirname, req.path));
    }
    return next();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`RoomZy server running on http://0.0.0.0:${PORT}`);
});

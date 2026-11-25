const express = require('express');
const path = require('path');
const { registerUser, loginUser, getAuthenticatedUser } = require('./api/_lib/auth');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ================= AUTH API ROUTES =================

app.post('/api/auth/register', async (req, res) => {
    try {
        const result = await registerUser(req.body);
        return res.status(result.status).json(result.json);
    } catch (err) {
        console.error('Register error:', err);
        return res.status(500).json({ error: 'Server error while creating account.' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const result = await loginUser(req.body);
        return res.status(result.status).json(result.json);
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error while signing in.' });
    }
});

app.get('/api/auth/me', async (req, res) => {
    try {
        const result = await getAuthenticatedUser(req.headers.authorization);
        return res.status(result.status).json(result.json);
    } catch (_) {
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
});

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

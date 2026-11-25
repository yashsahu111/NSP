const { loginUser } = require('../_lib/auth');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const result = await loginUser(req.body);
        return res.status(result.status).json(result.json);
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Server error while signing in.' });
    }
};

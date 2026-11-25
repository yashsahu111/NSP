const { getAuthenticatedUser } = require('../_lib/auth');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
    try {
        const result = await getAuthenticatedUser(req.headers.authorization);
        return res.status(result.status).json(result.json);
    } catch (err) {
        console.error('Auth me error:', err);
        return res.status(401).json({ error: 'Invalid or expired session' });
    }
};

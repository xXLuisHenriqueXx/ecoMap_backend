const authorize = require('../services/authorize');

const withAuth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Unauthorized: no token' });
    }

    const token = authorizationHeader.replace(/Bearer /, '');

    try {
        const user = await authorize(token);

        if (!user) throw new Error('Unauthorized');

        req.user = user;
        next();

    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized: invalid token' });
    }
};

module.exports = withAuth;
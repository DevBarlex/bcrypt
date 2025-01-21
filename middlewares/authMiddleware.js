// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

// Verificar el token JWT
const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token requerido' });
    }

    jwt.verify(token, secret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }
        req.user = user;
        next();
    });
};

module.exports = authenticateJWT();
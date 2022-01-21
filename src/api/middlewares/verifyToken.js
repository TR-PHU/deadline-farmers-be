const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            message: 'UNAUTHORIZED',
        });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodeToken) {
        return res.status(403).json({
            statusCode: 403,
            message: 'Token is not valid!',
        });
    }

    req.user = decodeToken;
    next();
};

module.exports = {
    verifyToken,
};

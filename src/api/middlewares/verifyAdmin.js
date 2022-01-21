
const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
        return next();
    }
    return res.status(403).json({
        statusCode: 403,
        message: 'FORBIDDEN',
    });
};

module.exports = {
    verifyAdmin,
};

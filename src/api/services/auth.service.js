const createError = require('http-errors');
const db = require('../configs/db.config');

module.exports = {
    signIn: async ({ username, password }) => {
        try {
            let filterUser = db.findOne({ username: username });
            console.log(filterUser);
            const accessToken = jwt.sign(
                {
                    email: filterUser[0].email,
                },
                'secret'
            );

            const refreshToken = jwt.sign(
                {
                    email: filterUser[0].email,
                    accessToken: accessToken,
                },
                'secret'
            );
        } catch (error) {
            throw new createError(500, 'Can not login');
        }
    },
};

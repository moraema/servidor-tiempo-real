// auth.middleware.js
const jwt = require('jsonwebtoken');
const secretJWT = process.env.SECRET_JWT;

const verifyJWT = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretJWT, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded.user);
            }
        });
    });
};

module.exports = {
    verifyJWT
};
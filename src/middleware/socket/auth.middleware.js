const jwt = require('jsonwebtoken');
const secretJWT = process.env.JWT;

const verifyJWT = (socket, next) => {
    try {
        const token = socket.handshake.token;

        jwt.verify(token, secretJWT, (err, decode) => {
            if (err) {
                next(err);
            }

            socket.user = decode;
            next();
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    verifyJWT
}
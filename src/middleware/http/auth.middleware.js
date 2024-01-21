const jwt = require('jsonwebtoken');
const newJwtSecret = process.env.JWT;

const verifyToken = (req, res, next) => {
    const token = req.get('Authorization');

    jwt.verify(token, newJwtSecret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                message: 'Hubo un error al validar el token',
                error: err.message
            });
        }
        req.usuario = decode.usuario;
        next();
    });
};

module.exports = {
    verifyToken
};
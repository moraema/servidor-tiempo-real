const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../models/user.model');
const secret = process.env.JWT;

const login = async(req, res) => {
    try {
        const { usuario, contraseña } = req.body;

        const usuarioObj = new Usuario({ usuario });

        const credencialesValidas = await usuarioObj.verificarUsuario();

        if (!credencialesValidas) {
            return res.status(400).json({
                message: 'Usuario o contraseña incorrectos',
            });
        }

        const contraseñaCorrecta = bcrypt.compareSync(contraseña, usuarioObj.contraseña);

        if (!contraseñaCorrecta) {
            return res.status(400).json({
                message: 'Usuario o contraseña incorrectos',
            });
        }

        const payload = {
            usuario: {
                id: usuarioObj.id,
            },
        };

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'El acceso fue correcto',
            token,
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrió un error al validar las credenciales',
            error: error.message,
        });
    }
};

module.exports = {
    login
};
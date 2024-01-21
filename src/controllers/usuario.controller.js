const Usuario = require('../models/user.model');
const bcrypt = require('bcrypt');
const saltosBcrypt = parseInt(process.env.SALTOS_BCRYPT);



const create = async(req, res) => {
    try {
        const usuario = new Usuario({
            usuario: req.body.usuario,
            contraseña: bcrypt.hashSync(req.body.contraseña, saltosBcrypt)
        });

        await usuario.guardarUsuarios()

        return res.status(200).json({
            message: 'usuario creado exitosamente'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'ocurrio un error al crear el usuario',
            error: error.message
        })
    }
}


module.exports = {
    create
}
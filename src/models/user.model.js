const db = require('../configs/db.config');

class Usuario {
    constructor({ id, usuario, contraseña }) {
        this.id = id;
        this.usuario = usuario;
        this.contraseña = contraseña;
    }

    async verificarUsuario() {
        const connection = await db.createConnection();

        try {
            const [rows] = await connection.execute('SELECT * FROM usuarios WHERE nombre_usuario = ?', [this.usuario]);

            if (rows.length === 0) {
                return false;
            }

            const { id, nombre_usuario, contraseña } = rows[0];
            this.id = id;
            this.usuario = nombre_usuario;
            this.contraseña = contraseña;

            return true;
        } finally {
            connection.end();
        }
    }

    async guardarUsuarios() {
        const connection = await db.createConnection();

        try {
            const result = await connection.execute('INSERT INTO usuarios (nombre_usuario, contraseña) VALUES (?, ?)', [this.usuario, this.contraseña]);

            if (result.insertId === 0) {
                throw new Error('No se inserto el usuario');
            }

            this.id = result.insertId;

            return this.id;
        } finally {
            connection.end();
        }
    }
}

module.exports = Usuario;
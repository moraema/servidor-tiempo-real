const db = require('../configs/db.config');

class Comentario {
    constructor({ id, comentario }) {
        this.id = id;
        this.comentario = comentario;
    }

    static async getComentarios() {
        const connection = await db.createConnection();

        const [rows] = await connection.execute('SELECT * FROM comentarios');
        return rows;
    }

    async guardarComentarios() {
        const connection = await db.createConnection();


        const [result] = await connection.execute('INSERT INTO comentarios (comentario) VALUES (?)', [this.comentario]);
        connection.end();

        if (result.insertId === 0) {
            throw new Error('No se insertó el comentario');
        }

        this.id = result.insertId;
        return this.id;
    }

}


module.exports = Comentario;
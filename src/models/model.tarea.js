const db = require('../configs/db.config');

class Tarea {
    constructor({ id, tarea, descripcion, status }) {
        this.id = id;
        this.tarea = tarea;
        this.descripcion = descripcion;
        this.status = status;
    }

    static async getTareas() {
        const connection = await db.createConnection();

        const [rows] = await connection.execute('SELECT * FROM tareas');
        return rows;

    }

    static async guardarTarea() {
        const connection = await db.createConnection();

        try {
            const [result] = await connection.execute('INSERT INTO tareas (tarea, descripcion, status) VALUES (?, ?, ?)', [this.tarea, this.descripcion, this.status]);

            if (result.insertId === 0) {
                throw new Error('No se insertó la tarea');
            }

            this.id = result.insertId;

            return this.id;
        } finally {
            connection.end();
        }
    }
}

module.exports = Tarea;
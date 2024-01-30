const db = require('../configs/db.config');

class Tarea {
    constructor({ id, tarea, descripcion, responsable }) {
        this.id = id;
        this.tarea = tarea;
        this.descripcion = descripcion;
        this.responsable = responsable;
    }

    static async getTareas() {
        const connection = await db.createConnection();

        const [rows] = await connection.execute('SELECT * FROM tareas');
        return rows;

    }


    async guardarTarea() {
        const connection = await db.createConnection();

        try {
            const [result] = await connection.execute('INSERT INTO tareas (tarea, descripcion, responsable) VALUES (?, ?, ?)', [this.tarea, this.descripcion, this.responsable]);

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
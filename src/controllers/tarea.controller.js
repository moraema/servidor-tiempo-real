const Tarea = require('../models/model.tarea');
const { sendPushNotification } = require('../../socket/utils/util');

const crearTarea = async(req, res) => {
    const { tarea, descripcion, responsable } = req.body;

    const tareas = new Tarea({
        tarea: tarea,
        descripcion: descripcion,
        responsable: responsable,
    });

    try {
        await tareas.guardarTarea();

        sendPushNotification('Nueva tarea agregada');


        res.status(201).json({
            success: true,
            message: 'Se creó la tarea',
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Ocurrió un error al crear la tarea',
            error: error.message,
        });
    }
};

module.exports = {
    crearTarea,
};
const Tarea = require('../models/model.tarea');
const { sendPushNotification, enviarTareas } = require('../../socket/utils/util');
const io = require('socket.io')();


// Websocket notificacion
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

        enviarTareas();


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
    crearTarea
};
const Tarea = require('../models/model.tarea');
const Comentarios = require('../models/model.comentario');


// short polling 
const getList = async(req, res) => {
    try {
        const tarea = await Tarea.getTareas();

        return res.status(200).json({
            message: 'Se obtuvo la lista de las tareas',
            tarea
        });
    } catch (error) {
        return res.status(500).json({
            message: 'hubo un error al obtenar las lista de tareas',
            error: error.message
        });
    }
};

const getidtareas = async(req, res) => {

    const tarea = await Tarea.getTareas();
    const ultimaTarea = parseInt(req.query.idTarea, 10);
    const nuevasTareas = tarea.filter(tarea => tarea.id > ultimaTarea);

    return res.status(200).json({
        success: true,
        tareas: nuevasTareas
    });

};

// long polling

let resComentarios = [];
const getComentarios = async(req, res) => {
    try {
        const comentario = await Comentarios.getComentarios();

        return res.status(200).json({
            message: 'Se obtuvieron los comentarios correctamente',
            comentario
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Hubo un error al obtener los comentarios',
            error: error.message
        });
    }

};

const getnuevoComentario = async(req, res) => {

    resComentarios.push(res);

    req.on('close', () => {
        const index = resComentarios.length - 1;
        resComentarios = resComentarios.slice(index - 1);
    });
};

const crearComentario = async(req, res) => {
    const nuevoComentario = req.body.comentario;

    const comentario = new Comentarios({
        comentario: nuevoComentario
    });

    try {
        await comentario.guardarComentarios();

        responderComentarios(comentario);

        res.status(201).json({
            success: true,
            message: "notificación creada"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Ocurrió un error al guardar el comentario",
            error: error.message
        });
    }
};


function responderComentarios(comentario) {
    for (const res of resComentarios) {
        res.status(200).json({
            success: true,
            comentario
        });
    }
    resComentarios = [];
}

module.exports = {
    getList,
    getidtareas,
    getComentarios,
    getnuevoComentario,
    crearComentario
}
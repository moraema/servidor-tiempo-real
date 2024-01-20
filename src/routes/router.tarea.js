const express = require('express');

const shortController = require('../controllers/controller.short');
const router = express.Router();

router.get('/obtener-lista', shortController.getList);
router.get('/actualizar', shortController.getidtareas);
router.get('/comentarios', shortController.getComentarios);
router.get('/nuevo-comentario', shortController.getnuevoComentario);
router.post('/crear-comentario', shortController.crearComentario);


module.exports = router;
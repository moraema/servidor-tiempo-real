const express = require('express');
const shortController = require('../controllers/controller.short');
const { crearTarea } = require('../controllers/tarea.controller');
const router = express.Router();
const authMiddleware = require('../middleware/http/auth.middleware');

router.get('/obtener-lista', authMiddleware.verifyToken, shortController.getList);
router.get('/actualizar', authMiddleware.verifyToken, shortController.getidtareas);
router.get('/comentarios', authMiddleware.verifyToken, shortController.getComentarios);
router.get('/nuevo-comentario', authMiddleware.verifyToken, shortController.getnuevoComentario);
router.post('/crear-comentario', authMiddleware.verifyToken, shortController.crearComentario);
router.post('/crear-tarea', authMiddleware.verifyToken, crearTarea);


module.exports = router;
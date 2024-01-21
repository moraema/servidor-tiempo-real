const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuario.controller');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/http/auth.middleware');

router.post('/login', authController.login);
router.post('/crear-usuario', authMiddleware.verifyToken, userController.create);

module.exports = router;
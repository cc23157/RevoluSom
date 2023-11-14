const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')


router.get('/', controller.getRaiz)  
router.get('/login', controller.getLogin)
router.post('/login/usuario', controller.postUsuario)
router.get('/infousuario', controller.getInfoUsuario)

module.exports = router
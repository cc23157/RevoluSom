const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller')


router.get('/', controller.getRaiz)  
router.get('/revolusom', controller.getTelaInicial)

router.post('/login/usuario', controller.postUsuario)
router.get('/loginusuario', controller.getLoginUsuario)
router.get('/playlistsusuario', controller.getPlaylistsUsuario)


router.get('/foto', controller.getFotoUsuario)

module.exports = router
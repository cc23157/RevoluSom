const express = require('express')
const router = express.Router()

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const extensaoArquivo = file.originalname.split('.')[1];
        const novoNomeArquivo = 'foto'
        cb(null, `${novoNomeArquivo}.${extensaoArquivo}`)
    }
});
const upload = multer({ storage });

const controller = require('../controllers/controller')


router.get('/', controller.getRaiz)  
router.get('/revolusom', controller.getTelaInicial)

router.post('/login/usuario', controller.postUsuario)
router.get('/loginusuario', controller.getLoginUsuario)
router.get('/playlistsusuario', controller.getPlaylistsUsuario)

router.post('/postfile', upload.single('file'), controller.postFile)
router.get('/getfile', controller.getFoto)


module.exports = router
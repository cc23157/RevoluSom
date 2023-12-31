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


// files 

router.post('/postfile', upload.single('file'), controller.postFile)
router.delete('/deletefile', controller.deleteFile)


// caminhos

router.get('/', controller.getRaiz)  
router.get('/revolusom', controller.getTelaInicial)
router.get('/perfil', controller.getTelaPerfil)
router.get('/escolher', controller.getTelaEscolherGeneros)
router.get('/generos', controller.getTelaGeneros)
router.get('/genero', controller.getTelaGenero)
router.get('/album', controller.getTelaAlbum)
router.get('/editarperfil', controller.getTelaEditarUsuario)
router.get('/criarplaylist', controller.getTelaCriarPlaylist)
router.get('/playlist', controller.getTelaPlaylist)
router.get('/musicas', controller.getTelaMusicas)


// usuario

router.post('/postusuario', controller.postUsuario)
router.put('/putusuario', controller.putUsuario)
router.delete('/deleteusuario', controller.deleteUsuario)
router.get('/loginusuario', controller.getLoginUsuario)
router.get('/telausuario', controller.getTelaUsuario)


// artista

router.post('/postartista', controller.postArtista)
router.put('/putartista', controller.putArtista)
router.delete('/deleteartista', controller.deleteArtista)
router.get('loginartista', controller.getLoginArtista)


// album

router.post('/postalbum', controller.postAlbum)
router.delete('/deletealbum', controller.deleteAlbum)
router.get('/musicasalbum', controller.getMusicasAlbum)


// musica

router.post('/postmusica', controller.postMusica)
router.delete('/deletemusica', controller.deleteMusica)


// genero

router.get('/albunsgenero', controller.getAlbunsGenero)

// playlist

router.post('/postplaylist', controller.postPlaylist)
router.delete('/deleteplaylist', controller.deletePlaylist)
router.get('/musicasplaylist', controller.getMusicasPlaylist)
router.get('/todasmusicas', controller.getTodasMusicas)


// relacionamentos

router.post('/curtirmusica', controller.curtirMusica)
router.delete('/descurtirmusica', controller.descurtirMusica)

router.post('/curtirartista', controller.curtirArtista)
router.delete('/descurtirartista', controller.descurtirArtista)

router.post('/curtirgenero', controller.curtirGenero)
router.delete('/descurtirgenero', controller.descurtirGenero)

router.post('/adicionarmusica', controller.adicionarMusicaPlaylist)
router.delete('/removermusica', controller.removerMusicaPlaylist)

router.post('/generoalbum', controller.generoAlbum)
router.post('/generomusica', controller.generoMusica)

router.post('/generoartista', controller.generoArtista)
router.delete('/deletargeneroartista', controller.deletarGeneroArtista)

module.exports = router
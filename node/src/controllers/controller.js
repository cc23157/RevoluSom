const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient()

const path = require('path');
const filePath = path.join(__dirname, '../../../frontEnd/')

const fs = require('fs')

const { google } = require('googleapis');
const exp = require('constants');
const { file } = require('googleapis/build/src/apis/file');

const client_id = "83216334534-qr733fr8kiag964nkocu7fmp43ioqq6u.apps.googleusercontent.com"
const client_secret = "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"
const redirect_uri = 'https://developers.google.com/oauthplayground'
const refresh_token  = '1//04tI7U5FHKJFNCgYIARAAGAQSNwF-L9IrI9wFYOdhJsgiWIylYIOW3tqQtjB9jewkWodUu-PvRyku3I8BENv42KXicSEZ0GO_LkY'

const aouth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uri
)

aouth2Client.setCredentials({refresh_token: refresh_token})

const folder_pfp_usuario = '1wsecSMjxCNWTnGjCidWlfuQ7GbQVPsGr'
const folder_pfp_artista = '1UoHh5C0mqcZymyZlhGK8W_vPR06Z2xvz'
const folder_capas_albuns = '10BW4p5CxlVVrjLeaYdU8Z9_NSEAv3PN6'
const folder_capas_playlists = '14l9P4I7D7OjsGRs6JCtUZzp_7OkIyIDd'
const folder_audio = '1v2Xw2sA_loNKGyDBMMJNn_0N7-SJ3E4s'

const drive = google.drive({
    version: 'v3',
    auth: aouth2Client
})


// files

async function uploadToDrive(fileName, fileType, filePathP, parentId) {

    const upload = await drive.files.create({
        requestBody: {
            name: fileName,
            mimeType: fileType,
            parents: [parentId]
        },
        media: {
            mimeType: fileType,
            body: fs.createReadStream(filePathP)
        }
    })

    return (upload.data.id)
}

exports.postFile = ("/postfile", async(req,res) => {
    try {
        let id = req.query.id;
        let type = req.query.type

        let parent 
        switch (req.query.parent) {
            case "0":
                parent = folder_audio
                break
            case "1":
                parent = folder_pfp_usuario
                break
            case "2":
                parent = folder_pfp_artista
                break
            case "3":
                parent = folder_capas_albuns
                break
            case "4":
                parent = folder_capas_playlists
                break
        }

        let shortType = type.split('/')[1]
        if (shortType == 'jpeg') {
            shortType = 'jpg'
        }

        let up = await uploadToDrive(id, type, 'uploads/foto.' + shortType, parent)

        let caminho = path.join(__dirname, '..\\uploads\\foto.' + shortType)
        fs.unlink(caminho, function (err) {
            if (err) throw err;
        })

        res.send({id: up})    
    }
    catch(error) {
        console.log(error)
        res.send(error)
    }
    
})

exports.deleteFile = ('/deletefile', async(req,res) => {
    let fileId = req.query.id
    console.log(fileId)

    const deleted = await drive.files.delete({
        fileId: fileId
    })
})

// caminhos

exports.getRaiz = ("/",(req, res) => {
    res.sendFile(filePath + '/login.html')
}) 

exports.getTelaInicial = ("/revolusom",(req, res) => {
    res.sendFile(filePath + '/menuInicial.html')
})

exports.getTelaPerfil = ("/perfil", (req,res) => {
    res.sendFile(filePath + '/perfil.html')
})

exports.getTelaEscolherGeneros = ('/escolher', (req,res) => {
    res.sendFile(filePath + '/escolherGeneros.html')
})

exports.getTelaGeneros = ('/generos', (req,res) => {
    res.sendFile(filePath + '/generos.html')
})

exports.getTelaGenero = ('/genero', (req,res) => {
    res.sendFile(filePath + '/genero.html')
})

exports.getTelaAlbum = ('/album', (req,res) => {
    res.sendFile(filePath + '/album.html')
})

exports.getTelaEditarUsuario = ('/editarperfil', (req,res) => {
    res.sendFile(filePath + '/editarPerfil.html')
})


// usuario

exports.postUsuario = ("/postusuario", async(req, res) => {

    try {
        let id = req.body.id
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let senha = req.body.senha
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spCadastrarUsuario ${id}, ${nome}, ${sobrenome}, ${senha}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Usuário cadastrado com sucesso!', resultado })
        }
    }
    catch (error) {
        console.error(error['meta']['message']);
        res.send({erro: error['meta']['message']})
    }
})

exports.putUsuario = ("/putusuario", async(req, res) => {   
    try {
        let id = req.body.id
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let senha = req.body.senha
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spEditarUsuario ${id}, ${nome}, ${sobrenome}, ${senha}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Usuário editado com sucesso!', resultado })
        }
    }
    catch (error) {
        console.log(error)
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deleteUsuario = ("/deleteusuario", async(req, res) => {
    try {
        let id = req.body.id
        let resultado

        const post = await prisma.$queryRaw`exec revolusom.spDeletarUsuario ${id}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Usuário deletado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.getLoginUsuario = ("/loginusuario", async(req, res) => {
    try {
        let id = req.query.id
        let senha = req.query.senha
        let resultado 
    
        const get = await prisma.$queryRaw`declare @output int; exec revolusom.spLoginUsuario ${id}, ${senha}, @output output; select @output as resultado` 
        
        resultado = get[0].resultado

        if (resultado = 1) {
            res.send(true)
        }
        else {
            res.send(false)
        }
    }
    catch (error) {
        console.error(error['meta']['message']);
        res.send({erro: error['meta']['message']})
    }
})

exports.getTelaUsuario = ("/telausuario", async(req, res) => {
    try {
        let id = req.query.id

        const get1 = await prisma.$queryRaw`SELECT nome, idCapa FROM Revolusom.Playlist WHERE idUsuario = ${id}`
        let playlists = await get1

        const get2 = await prisma.$queryRaw`SELECT TOP 1 preNome, sobrenome, idPfp, senha FROM Revolusom.Usuario WHERE idUsuario = ${id}`
        let data = await get2[0]
        let nome = data.preNome
        let sobrenome = data.sobrenome
        let idPfp = data.idPfp
        let senha = data.senha

        res.send({
            playlists: playlists,
            nome: nome,
            sobrenome: sobrenome,
            idPfp: idPfp,
            senha: senha
        })
    }
    catch (error) {
        console.error(error);
        res.send({erro: error})
    }
})


// artista 

exports.postArtista = ("/postartista", async(req, res) => {
    try {
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let email = req.body.email
        let senha = req.body.senha
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spCadastrarArtista ${nome}, ${sobrenome}, ${email}, ${senha}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Artista cadastrado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.putArtista = ("/putartista", async(req, res) => {
    try {
        let id = req.body.id
        let nome = req.body.nome
        let sobrenome = req.body.sobrenome
        let email = req.body.email
        let senha = req.body.senha
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spEditarArtista ${id}, ${nome}, ${sobrenome}, ${email}, ${senha}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Artista editado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deleteArtista = ("/deleteartista", async(req, res) => {
    try {
        let id = req.body.id
        let resultado

        const post = await prisma.$queryRaw`exec revolusom.spDeletarArtista ${id}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Artista deletado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.getLoginArtista = ("/loginartista", async(req, res) => {
    try {
        let email = req.query.email
        let senha = req.query.senha
        let resultado 
    
        const get = await prisma.$queryRaw`declare @output int; exec revolusom.spLoginUsuario ${email}, ${senha}, @output output; select @output as resultado` 
        
        resultado = get[0].resultado

        if (resultado = 1) {
            res.send(true)
        }
        else {
            res.send(false)
        }
    }
    catch (error) {
        console.error(error['meta']['message']);
        res.send({erro: error['meta']['message']})
    }
})


// album

exports.postAlbum = ("/postalbum", async(req,res) => {
    try {
        let nome = req.body.nome
        let artista = req.body.artista
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spPublicarAlbum ${nome}, ${artista}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Álbum publicado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deleteAlbum = ("/deletealbum", async(req, res) => {
    try {
        let id = req.body.id
        let resultado

        const post = await prisma.$queryRaw`exec revolusom.spDeletarAlbum ${id}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Álbum deletado com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.getMusicasAlbum = ('/musicasalbum', async(req,res) => {
    let idAlbum = req.query.idalbum

    const get1 = await prisma.$queryRaw`SELECT * FROM revolusom.V_musicas_artista WHERE idAlbum = ${idAlbum}`
    let dados = await get1[0]
    let nome = dados.nome
    let idCapa = dados.idCapa
    let artista = dados.preNome + ' ' + dados.sobrenome

    const get2 = await prisma.$queryRaw`SELECT nome, idArquivo FROM Revolusom.Musica WHERE idAlbum = ${idAlbum}`
    let musicas = await get2

    res.send({
        musicas: musicas,
        nome: nome,
        idCapa: idCapa,
        artista: artista
    })
})


// musica

exports.postMusica = ("/postmusica", async(req,res) => {
    try {
        let nome = req.body.nome
        let album = req.body.album
        let artista = req.body.artista
        let foto = req.body.foto
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spPublicarMusica ${nome}, ${album}, ${artista}, ${foto}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música publicada com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deleteMusica = ("/deletemusica", async(req, res) => {
    try {
        let id = req.body.id
        let resultado

        const post = await prisma.$queryRaw`exec revolusom.spDeletarMusica ${id}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música deletada com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


// genero

exports.getAlbunsGenero = ('/albunsgenero', async(req,res) => {
    let idGenero = req.query.idgenero
    const get = await prisma.$queryRaw`SELECT idAlbum, nome, idCapa FROM revolusom.Album WHERE idAlbum IN (SELECT idAlbum FROM revolusom.AlbumGenero WHERE idGenero = ${idGenero})`;
    res.json(get)
})


// playlist 

exports.postPlaylist = ("/postplaylist", async(req, res) => {
    try {
        let nome = req.body.nome
        let foto = req.body.foto
        let usuario = req.body.usuario
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spCriarPlaylisy ${nome}, ${foto}, ${usuario}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Playlist criada com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deletePlaylist = ("/deleteplaylist", async(req, res) => {
    try {
        let id = req.body.id
        let resultado

        const post = await prisma.$queryRaw`exec revolusom.spDeletarPlaylist ${id}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Playlist deletada com sucesso!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


// relacionamentos 

exports.curtirMusica = ("/curtirmusica", async(req,res) => {
    try {
        let idUsuario = req.body.idusuario
        let idMusica = req.body.idMusica
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spUsuarioCurteMusica ${idUsuario}, ${idMusica}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música adicionada às curtidas!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.descurtirMusica = ("/descurtirmusica", async(req, res) => {
    try {
        let idUsuario = req.body.idusuario
        let idMusica = req.body.idMusica
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spDelUsuarioMusica ${idUsuario}, ${idMusica}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música removida das curtidas!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


exports.curtirArtista = ("/curtirartista", async(req,res) => {
    try {
        let idUsuario = req.body.idusuario
        let idArtista = req.body.idArtista
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spUsuarioCurteArtista ${idUsuario}, ${idArtista}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Artista adicionado aos curtidos!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.descurtirArtista = ("/descurtirartista", async(req,res) => {
    try {
        let idUsuario = req.body.idusuario
        let idArtista = req.body.idArtista
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spDelUsuarioArtista ${idUsuario}, ${idArtista}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Artista removido dos curtidos!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


exports.curtirGenero = ("/curtirgenero", async(req,res) => {
    try {
        let idUsuario = req.body.idusuario
        let idGenero = req.body.idgenero
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spUsuarioCurteGenero ${idUsuario}, ${idGenero}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero adicionado aos curtidos!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.descurtirGenero = ("/descurtirgenero", async(req,res) => {
    try {
        let idUsuario = req.body.idusuario
        let idGenero = req.body.idGenero
        let resultado 


        const post = await prisma.$queryRaw`exec revolusom.spDelUsuarioGenero ${idUsuario}, ${idGenero}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero removido dos curtidos!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


exports.adicionarMusicaPlaylist = ("/adicionarmusica", async(req,res) => {
    try {
        let idPlaylist = req.body.idPlaylist
        let idMusica = req.body.idMusica
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spUsuarioCurteMusica ${idPlaylist}, ${idMusica}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música adicionada à playlist!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.removerMusicaPlaylist = ("/removermusica", async(req,res) => {
    try {
        let idPlaylist = req.body.idPlaylist
        let idMusica = req.body.idMusica
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spUsuarioCurteMusica ${idPlaylist}, ${idMusica}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Música removida da playlist!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


exports.generoAlbum = ("/generoalbum", async(req,res) => {
    try {
        let idGenero = req.body.idGenero
        let idAlbum = req.body.idAlbum
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spGeneroAlbum ${idGenero}, ${idAlbum}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero adicionado ao álbum!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.generoMusica = ("/generomusica", async(req,res) => {
    try {
        let idGenero = req.body.idGenero
        let idMusica = req.body.idMusica
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spGeneroMusica ${idGenero}, ${idMusica}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero adicionado à música!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})


exports.generoArtista = ("/generoartista", async(req,res) => {
    try {
        let idGenero = req.body.idGenero
        let idArtista = req.body.idArtista
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spGeneroArtista ${idGenero}, ${idArtista}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero adicionado ao artista!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})

exports.deletarGeneroArtista = ("/deletargeneroartista", async(req,res) => {
    try {
        let idGenero = req.body.idGenero
        let idArtista = req.body.idArtista
        let resultado 

        const post = await prisma.$queryRaw`exec revolusom.spDelGeneroArtista ${idGenero}, ${idArtista}, ${resultado} output` 

        if (resultado != 0) {
            res.send({ message: 'Gênero removido do artista!', resultado })
        }
    }
    catch (error) {
        try {
            console.error(error['meta']['message']);
            res.send({erro: error['meta']['message']})
        }
        catch(erro) {
            console.log(error)
            res.send(error)
        }
    }
})
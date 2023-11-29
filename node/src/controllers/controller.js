const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient()

const path = require('path');
const filePath = path.join(__dirname, '../../../frontEnd/')

const fs = require('fs')

const { google } = require('googleapis')

const client_id = "83216334534-qr733fr8kiag964nkocu7fmp43ioqq6u.apps.googleusercontent.com"
const client_secret = "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"
const redirect_uri = 'https://developers.google.com/oauthplayground'
const refresh_token  = '1//04fc3CmDwiOajCgYIARAAGAQSNwF-L9Ir3ayeLHNdfTlzVIcnmAoanh3wjPzG1ZQqB59h6jW-y57rg-l64o0kWYmJbnsDm_eEuuQ'

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

exports.getFoto = ("/getfoto", async(req, res) => {
    try {
        let id = req.query.id;

        const post = await prisma.$queryRaw`SELECT idPfp FROM revolusom.usuario WHERE idUsuario = ${id}` 
        let idPfp = post[0].idPfp

        const fileUrl = `https://drive.google.com/uc?export=view&id=${idPfp}`
        res.send({url: fileUrl})

    }
    catch(error) {
        console.log(error)
        res.send(error)
    }
})

exports.getRaiz = ("/",(req, res) => {
    res.sendFile(filePath + '/login.html')
}) 

exports.getTelaInicial = ("/revolusom",(req, res) => {
    res.sendFile(filePath + '/menuInicial.html')
})

exports.postUsuario = ("/login/usuario", async(req, res) => {

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

exports.getPlaylistsUsuario = ("/playlistsusuario", async(req, res) => {
    try {
        let id = req.query.id

        const get = await prisma.$queryRaw`SELECT * FROM Revolusom.V_playlists_usuario WHERE idUsuario = ${id}`
        res.send(get)
    }
    catch (error) {
        console.error(error);
        res.send({erro: error})
    }
})

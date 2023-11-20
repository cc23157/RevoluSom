const { PrismaClient } = require('@prisma/client'); 
const { json } = require('express');
const prisma = new PrismaClient()
const path = require('path');
const { isUndefined } = require('util');
const filePath = path.join(__dirname, '../../../frontEnd/');


exports.getRaiz = ("/",(req, res) => {
    res.sendFile(filePath + '/login.html')
}) 

exports.getTelaInicial = ("/revolusom",(req, res) => {
    res.sendFile(filePath + '/menuInicial.html')
})

exports.postUsuario = ("/login/usuario", async(req, res) => {

    try {
        let id = req.query.id
        let nome = req.query.nome
        let sobrenome = req.query.sobrenome
        let senha = req.query.senha
        let foto = req.query.foto
        let resultado 
        let imagem

        imagem = Buffer.from(foto, 'base64');

        const post = await prisma.$queryRaw`exec revolusom.spCadastrarUsuario ${id}, ${nome}, ${sobrenome}, ${senha}, ${imagem}, ${resultado} output` 
        
        if (resultado != 0) {
            res.send({ message: 'Usuário cadastrado com sucesso!', resultado })
        }
    }
    catch (error) {
        console.error(error['meta']['message']);
        res.send({erro: error['meta']['message']})
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

exports.getPlaylistsUsuario = ("playlistsusuario", async(req, res) => {
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


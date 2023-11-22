const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()

const express = require('express')
const app = express()

app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true,}),);

const route = require('./routes/route')
app.use('/', route) 

app.use(express.static(__dirname + '\\..\\..\\frontEnd\\'))

app.listen(3000, () => {
    let data = new Date()
    console.log("Sevidor Node iniciado em " + data + " na porta 3000")
})
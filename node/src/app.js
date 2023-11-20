const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()

const express = require('express')
const app = express()

const route = require('./routes/route')
app.use('/', route) 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static(__dirname + '\\..\\..\\frontEnd\\'))

app.listen(3000, () => {
    let data = new Date()
    console.log("Sevidor Node iniciado em " + data + " na porta 3000")
})
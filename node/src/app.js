const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()

const express = require('express')
const app = express()

const route = require('./routes/route')
app.use('/', route) 

app.use(express.urlencoded({extended:true}))
app.use(express.json())

// monitora requisições na porta 3000
app.listen(3000, () => {
    console.log('foi')
})
const { PrismaClient } = require('@prisma/client') 
const prisma = new PrismaClient()
const path = require('path');



exports.getRaiz = ("/",(req, res) => {
    const filePath = path.join(__dirname, '../../../frontEnd/login.html');
    res.sendFile(filePath)
}) 

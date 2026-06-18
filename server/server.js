require('dotenv').config()

const express = require('express')
const cors = require('cors')
const sequelize = require('./config/database')
const User = require('./models/User')
const authRoutes = require('./routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())

// Rotas
app.use('/auth', authRoutes)

// Liga à base de dados e inicia o servidor
sequelize.authenticate()
    .then(() => {
        console.log('PostgreSQL ligado')
        return sequelize.sync()
    })
    .then(() => {
        app.listen(5000, () => {
            console.log('Servidor na porta 5000')
        })
    })
    .catch(err => {
        console.log('Erro ao ligar à base de dados:', err)
    })
require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const fs = require('fs')
const sequelize = require('./config/database')
const User = require('./models/User')
const Animal = require('./models/Animal')
const Formulario = require('./models/Formulario')
const Favorito = require('./models/Favorito')
const authRoutes = require('./routes/authRoutes')
const animalRoutes = require('./routes/animalRoutes')
const formularioRoutes = require('./routes/formularioRoutes')
const userRoutes = require('./routes/userRoutes')
const favoritoRoutes = require('./routes/favoritoRoutes')
const uploadRoutes = require('./routes/uploadRoutes')

const app = express()

// Cria a pasta uploads se não existir
if (!fs.existsSync('uploads')) fs.mkdirSync('uploads')

app.use(cors())
app.use(express.json())

// Ficheiros estáticos
app.use('/uploads', express.static('uploads'))

// Rotas
app.use('/api/auth', authRoutes)
app.use('/api/animais', animalRoutes)
app.use('/api/formularios', formularioRoutes)
app.use('/api/users', userRoutes)
app.use('/api/favoritos', favoritoRoutes)
app.use('/api/upload', uploadRoutes)



// depois de todas as rotas app.use('/api/...')
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

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
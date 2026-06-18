const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// REGISTER
router.post('/register', async (req, res) => {
    try {
        const { nome_cliente, email_cliente, password_cliente, perfil } = req.body

        const existe = await User.findOne({ where: { email_cliente } })
        if (existe) {
            return res.status(400).json({ erro: 'Email já registado.' })
        }

        const passwordHash = await bcrypt.hash(password_cliente, 10)

        await User.create({ nome_cliente, email_cliente, password_cliente: passwordHash, perfil })

        res.status(201).json({ mensagem: 'Conta criada com sucesso.' })

    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao criar conta.' })
    }
})

// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { email_cliente, password_cliente } = req.body

        const user = await User.findOne({ where: { email_cliente } })
        if (!user) {
            return res.status(401).json({ erro: 'Email ou password incorretos.' })
        }

        const passwordCorreta = await bcrypt.compare(password_cliente, user.password_cliente)
        if (!passwordCorreta) {
            return res.status(401).json({ erro: 'Email ou password incorretos.' })
        }

        const token = jwt.sign(
            { id: user.id, email: user.email_cliente, perfil: user.perfil },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        )

        res.json({ token, perfil: user.perfil })

    } catch (err) {
        res.status(500).json({ erro: 'Erro ao fazer login.' })
    }
})

module.exports = router
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Formulario = require('../models/Formulario')
const Favorito = require('../models/Favorito')

const listarUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password_cliente'] }
        })
        res.json(users)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar utilizadores.' })
    }
}

const buscarUserPorId = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id, {
            attributes: { exclude: ['password_cliente'] }
        })
        if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' })
        res.json(user)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar utilizador.' })
    }
}

const criarUser = async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password_cliente, 10)
        const user = await User.create({ ...req.body, password_cliente: hash })
        const { password_cliente, ...userSemPassword } = user.toJSON()
        res.status(201).json(userSemPassword)
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao criar utilizador.' })
    }
}

const editarUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' })

        if (req.body.password_cliente) {
            req.body.password_cliente = await bcrypt.hash(req.body.password_cliente, 10)
        }

        await user.update(req.body)
        const { password_cliente, ...userSemPassword } = user.toJSON()
        res.json(userSemPassword)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao editar utilizador.' })
    }
}

const apagarUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id)
        if (!user) return res.status(404).json({ erro: 'Utilizador não encontrado.' })

        // apaga registos associados primeiro
        await Formulario.destroy({ where: { id_user: req.params.id } })
        await Favorito.destroy({ where: { id_user: req.params.id } })

        await user.destroy()
        res.json({ mensagem: 'Utilizador apagado com sucesso.' })
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao apagar utilizador.' })
    }
}

module.exports = { listarUsers, buscarUserPorId, criarUser, editarUser, apagarUser }
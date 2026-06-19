const Formulario = require('../models/Formulario')
const Animal = require('../models/Animal')
const User = require('../models/User')

const listarFormularios = async (req, res) => {
    try {
        const formularios = await Formulario.findAll({
            include: [
                { model: Animal, attributes: ['id', 'nome_animal'] },
                { model: User, attributes: ['id', 'nome_cliente', 'email_cliente'] }
            ]
        })
        res.json(formularios)
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao buscar formulários.' })
    }
}

const buscarFormularioPorId = async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id, {
            include: [
                {
                    model: Animal,
                    attributes: [
                        'id', 'nome_animal', 'especie_animal', 'genero_animal',
                        'idade_valor_animal', 'idade_unidade_animal', 'idade_indefinida_animal',
                        'fotografia_animal', 'descricao_animal'
                    ]
                },
                {
                    model: User,
                    attributes: [
                        'id', 'nome_cliente', 'email_cliente', 'telefone_cliente',
                        'data_nascimento_cliente', 'localidade_cliente',
                        'concelho_cliente', 'distrito_cliente'
                        // password_cliente excluída intencionalmente
                    ]
                }
            ]
        })
        if (!formulario) return res.status(404).json({ erro: 'Formulário não encontrado.' })
        res.json(formulario)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar formulário.' })
    }
}

const criarFormulario = async (req, res) => {
    try {
        const formulario = await Formulario.create({
            ...req.body,
            id_user: req.user.id  // vem do token, não do body
        })
        res.status(201).json(formulario)
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao criar formulário.' })
    }
}

const editarFormulario = async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id)
        if (!formulario) return res.status(404).json({ erro: 'Formulário não encontrado.' })
        await formulario.update(req.body)
        res.json(formulario)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao editar formulário.' })
    }
}

const apagarFormulario = async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id)
        if (!formulario) return res.status(404).json({ erro: 'Formulário não encontrado.' })
        await formulario.destroy()
        res.json({ mensagem: 'Formulário apagado com sucesso.' })
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar formulário.' })
    }
}

const marcarComoLido = async (req, res) => {
    try {
        const formulario = await Formulario.findByPk(req.params.id)
        if (!formulario) return res.status(404).json({ erro: 'Formulário não encontrado.' })
        await formulario.update({ formulario_lido: true })
        res.json(formulario)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao marcar formulário como lido.' })
    }
}

const listarMeusFormularios = async (req, res) => {
    try {
        const formularios = await Formulario.findAll({
            where: { id_user: req.user.id },
            include: [{ model: Animal, attributes: ['id', 'nome_animal', 'especie_animal', 'fotografia_animal'] }],
            order: [['data_formulario', 'DESC']]
        })
        res.json(formularios)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar formulários.' })
    }
}

module.exports = { listarFormularios, buscarFormularioPorId, criarFormulario, editarFormulario, apagarFormulario, marcarComoLido, listarMeusFormularios }
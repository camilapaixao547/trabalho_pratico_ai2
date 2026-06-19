const Animal = require('../models/Animal')

const listarAnimais = async (req, res) => {
    try {
        const animais = await Animal.findAll()
        res.json(animais)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar animais.' })
    }
}

const buscarAnimalPorId = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        if (!animal) return res.status(404).json({ erro: 'Animal não encontrado.' })
        res.json(animal)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar animal.' })
    }
}

const criarAnimal = async (req, res) => {
    try {
        const animal = await Animal.create(req.body)
        res.status(201).json(animal)
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao criar animal.' })
    }
}

const editarAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        if (!animal) return res.status(404).json({ erro: 'Animal não encontrado.' })
        await animal.update(req.body)
        res.json(animal)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao editar animal.' })
    }
}

const apagarAnimal = async (req, res) => {
    try {
        const animal = await Animal.findByPk(req.params.id)
        if (!animal) return res.status(404).json({ erro: 'Animal não encontrado.' })
        await animal.destroy()
        res.json({ mensagem: 'Animal apagado com sucesso.' })
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao apagar animal.' })
    }
}

module.exports = { listarAnimais, buscarAnimalPorId, criarAnimal, editarAnimal, apagarAnimal }
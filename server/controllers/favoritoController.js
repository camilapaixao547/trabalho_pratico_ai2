const Favorito = require('../models/Favorito')
const Animal = require('../models/Animal')
const User = require('../models/User')

const listarFavoritosDoUser = async (req, res) => {
    try {
        const favoritos = await Favorito.findAll({
            where: { id_user: req.params.id_user },
            include: [{ model: Animal }]
        })
        res.json(favoritos)
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao buscar favoritos.' })
    }
}

const adicionarFavorito = async (req, res) => {
    try {
        const { id_user, id_animal } = req.body

        const existe = await Favorito.findOne({ where: { id_user, id_animal } })
        if (existe) return res.status(400).json({ erro: 'Animal já está nos favoritos.' })

        const favorito = await Favorito.create({ id_user, id_animal })
        res.status(201).json(favorito)
    } catch (err) {
        console.log(err)
        res.status(500).json({ erro: 'Erro ao adicionar favorito.' })
    }
}

const removerFavorito = async (req, res) => {
    try {
        const { id_user, id_animal } = req.params

        const favorito = await Favorito.findOne({ where: { id_user, id_animal } })
        if (!favorito) return res.status(404).json({ erro: 'Favorito não encontrado.' })

        await favorito.destroy()
        res.json({ mensagem: 'Favorito removido com sucesso.' })
    } catch (err) {
        res.status(500).json({ erro: 'Erro ao remover favorito.' })
    }
}

module.exports = { listarFavoritosDoUser, adicionarFavorito, removerFavorito }
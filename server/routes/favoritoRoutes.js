const router = require('express').Router()
const { listarFavoritosDoUser, adicionarFavorito, removerFavorito } = require('../controllers/favoritoController')

router.get('/:id_user', listarFavoritosDoUser)
router.post('/', adicionarFavorito)
router.delete('/:id_user/:id_animal', removerFavorito)

module.exports = router
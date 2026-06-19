const router = require('express').Router()
const { listarUsers, buscarUserPorId, criarUser, editarUser, apagarUser, verMeuPerfil, editarMeuPerfil, apagarMinhaConta } = require('../controllers/userController')
const verificarToken = require('../middleware/auth')

router.get('/me', verificarToken, verMeuPerfil)
router.put('/me', verificarToken, editarMeuPerfil)
router.delete('/me', verificarToken, apagarMinhaConta)

router.get('/', listarUsers)
router.get('/:id', buscarUserPorId)
router.post('/', criarUser)
router.put('/:id', editarUser)
router.delete('/:id', apagarUser)

module.exports = router
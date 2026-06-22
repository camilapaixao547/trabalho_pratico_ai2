const router = require('express').Router()
const { listarFormularios, buscarFormularioPorId, criarFormulario, editarFormulario, apagarFormulario, marcarComoLido, listarMeusFormularios } = require('../controllers/formularioController')
const verificarToken = require('../middleware/auth')

router.get('/meus', verificarToken, listarMeusFormularios)
router.get('/', listarFormularios)
router.get('/:id', buscarFormularioPorId)
router.post('/', verificarToken, criarFormulario)
router.put('/:id', editarFormulario)
router.delete('/:id', apagarFormulario)
router.patch('/:id/lido', marcarComoLido)

module.exports = router
const router = require('express').Router()
const { listarFormularios, buscarFormularioPorId, criarFormulario, editarFormulario, apagarFormulario, marcarComoLido } = require('../controllers/formularioController')
const verificarToken = require('../middleware/auth')

router.get('/', listarFormularios)
router.get('/:id', buscarFormularioPorId)
router.post('/', verificarToken, criarFormulario)
router.put('/:id', editarFormulario)
router.delete('/:id', apagarFormulario)
router.patch('/:id/lido', marcarComoLido)
router.get('/meus', verificarToken, listarMeusFormularios)

module.exports = router
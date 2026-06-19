const router = require('express').Router()
const { listarUsers, buscarUserPorId, criarUser, editarUser, apagarUser } = require('../controllers/userController')

router.get('/', listarUsers)
router.get('/:id', buscarUserPorId)
router.post('/', criarUser)
router.put('/:id', editarUser)
router.delete('/:id', apagarUser)

module.exports = router
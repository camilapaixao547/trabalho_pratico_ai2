const router = require('express').Router()
const { listarAnimais, buscarAnimalPorId, criarAnimal, editarAnimal, apagarAnimal } = require('../controllers/animalController')

router.get('/', listarAnimais)
router.get('/:id', buscarAnimalPorId)
router.post('/', criarAnimal)
router.put('/:id', editarAnimal)
router.delete('/:id', apagarAnimal)

module.exports = router
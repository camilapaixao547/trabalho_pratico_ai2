const router = require('express').Router()
const upload = require('../middleware/upload')

router.post('/', upload.single('imagem'), (req, res) => {
    if (!req.file) return res.status(400).json({ erro: 'Nenhum ficheiro enviado.' })
    const url = `http://localhost:5000/uploads/${req.file.filename}`
    res.json({ url })
})

module.exports = router
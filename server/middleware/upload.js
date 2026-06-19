const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const extensao = path.extname(file.originalname)
        const nomeFicheiro = `upload_${Date.now()}${extensao}`
        cb(null, nomeFicheiro)
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const tiposPermitidos = /jpeg|jpg|png|webp/
        const valido = tiposPermitidos.test(path.extname(file.originalname).toLowerCase())
        valido ? cb(null, true) : cb(new Error('Apenas imagens são permitidas.'))
    }
})

module.exports = upload
/* const multer = require('multer')
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

module.exports = upload */

const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'pantureco',
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp'],
        public_id: (req, file) => `animal_${Date.now()}`
    }
})

const upload = multer({ storage })

module.exports = upload
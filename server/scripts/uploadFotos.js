require('dotenv').config({ path: './.env' })
const cloudinary = require('cloudinary').v2
const { Sequelize } = require('sequelize')
const path = require('path')
const fs = require('fs')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
})

const uploadsDir = path.join(__dirname, '../uploads')

async function main() {
    const [animais] = await sequelize.query('SELECT id, "fotografia_animal" FROM "Animals"')

    for (const animal of animais) {
        if (!animal.fotografia_animal) continue

        // extrai o nome do ficheiro do caminho
        const nomeFicheiro = path.basename(animal.fotografia_animal)
        const caminhoLocal = path.join(uploadsDir, nomeFicheiro)

        if (!fs.existsSync(caminhoLocal)) {
            console.log(`Ficheiro não encontrado: ${nomeFicheiro}`)
            continue
        }

        try {
            const resultado = await cloudinary.uploader.upload(caminhoLocal, {
                folder: 'pantureco',
                public_id: `animal_${animal.id}`
            })

            await sequelize.query(
                `UPDATE "Animals" SET "fotografia_animal" = :url WHERE id = :id`,
                { replacements: { url: resultado.secure_url, id: animal.id } }
            )

            console.log(`✓ Animal ${animal.id} → ${resultado.secure_url}`)
        } catch (err) {
            console.log(`✗ Erro no animal ${animal.id}:`, err.message)
        }
    }

    console.log('Concluído!')
    process.exit(0)
}

main()
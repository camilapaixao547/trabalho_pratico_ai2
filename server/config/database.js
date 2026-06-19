/* const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    'pantureco_db',
    'postgres',
    'qf5W2M3',
    {
        host: 'localhost',
        dialect: 'postgres'
    }
)

module.exports = sequelize */

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

module.exports = sequelize
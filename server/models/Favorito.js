const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Animal = require('./Animal')
const User = require('./User')

const Favorito = sequelize.define('Favorito', {
    id_user: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    id_animal: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Animal,
            key: 'id'
        }
    }
}, {
    timestamps: false
})

Favorito.belongsTo(User, { foreignKey: 'id_user' })
Favorito.belongsTo(Animal, { foreignKey: 'id_animal' })

User.belongsToMany(Animal, { through: Favorito, foreignKey: 'id_user' })
Animal.belongsToMany(User, { through: Favorito, foreignKey: 'id_animal' })

module.exports = Favorito
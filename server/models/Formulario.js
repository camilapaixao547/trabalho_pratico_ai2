const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Animal = require('./Animal')
const User = require('./User')

const Formulario = sequelize.define('Formulario', {
    id_formulario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    data_formulario: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },

    id_animal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Animal,
            key: 'id'
        }
    },

    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },

    formulario_quintal: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    formulario_outros_animais: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    formulario_experiencia: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    formulario_descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    formulario_lido: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

Formulario.belongsTo(Animal, { foreignKey: 'id_animal' })
Formulario.belongsTo(User, { foreignKey: 'id_user' })

module.exports = Formulario
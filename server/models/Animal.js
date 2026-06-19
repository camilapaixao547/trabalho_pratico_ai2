const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Animal = sequelize.define('Animal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome_animal: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    fotografia_animal: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    idade_valor_animal: {
        type: DataTypes.INTEGER,
        allowNull: true
    },

    idade_unidade_animal: {
        type: DataTypes.ENUM('meses', 'anos'),
        allowNull: true
    },

    idade_indefinida_animal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    especie_animal: {
        type: DataTypes.ENUM('cão', 'gato'),
        allowNull: false
    },

    genero_animal: {
        type: DataTypes.ENUM('macho', 'fêmea', 'indefinido'),
        allowNull: false,
        defaultValue: 'indefinido'
    },

    descricao_animal: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    disponivel_animal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
})

module.exports = Animal
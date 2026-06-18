const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    fotografia_cliente: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    nome_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    email_cliente: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false
    },

    telefone_cliente: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    data_nascimento_cliente: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    localidade_cliente: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    concelho_cliente: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    distrito_cliente: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    password_cliente: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    perfil: {
        type: DataTypes.ENUM('cliente', 'admin'),
        allowNull: false,
        defaultValue: 'cliente'
    }
})

module.exports = User
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ViagemSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        default: ''
    },
    autorizado_por: {
        type: String,
        default: ''
    },
    data_envio: {
        type: Date,
        default: null
    },
    data_criacao: {
        type: Date,
        default: new Date()
    },
    percursos: [{
        type: Schema.ObjectId,
        ref: 'Percurso'
    }]
});

ViagemSchema.post('validate', doc => {
    doc.data_criacao = Date.now();
});

module.exports = mongoose.model('Viagem', ViagemSchema);
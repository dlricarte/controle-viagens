'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const ViagemSchema = new Schema({
    nome: {
        type: String,
        require: true
    },
    departamento: {
        type: String,
        default: ''
    },
    destino: {
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
    data_retorno: {
        type: Date,
        default: null
    },
    taxa_quilometragem: {
        type: mongoose.Types.Currency,
        default: 0
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
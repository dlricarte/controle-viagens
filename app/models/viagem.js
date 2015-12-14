'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ViagemSchema = new Schema({
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
    }
});

ViagemSchema.post('validate', doc => {
    doc.data_criacao = Date.now();
});

module.exports = mongoose.model('Viagem', ViagemSchema);
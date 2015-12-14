'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);

const PercursoSchema = new Schema({
    data: {
        type: Date,
        required: true
    },
    descricao_despesa: {
        type: String,
        default: ''
    },
    passagem_aerea: {
        type: mongoose.Types.Currency,
        default: 0
    },
    hospedagem: {
        type: mongoose.Types.Currency,
        default: 0
    },
    transporte_terrestre: {
        type: mongoose.Types.Currency,
        default: 0
    },
    refeicoes: {
        type: mongoose.Types.Currency,
        default: 0
    },
    conferencias: {
        type: mongoose.Types.Currency,
        default: 0
    },
    reembolso_quilometragem: {
        type: mongoose.Types.Currency,
        default: 0
    },
    diversos: {
        type: mongoose.Types.Currency,
        default: 0
    },
    taxa_cambial: {
        type: mongoose.Types.Currency,
        default: 0
    },
    quilometros: {
        type: Number,
        default: 0
    },
    moeda: {
        type: String,
        default: 0
    },
    data_criacao: {
        type: Date,
        default: new Date()
    }
});

PercursoSchema.post('validate', doc => {
    doc.data_criacao = Date.now();
});

module.exports = mongoose.model('Percurso', PercursoSchema);
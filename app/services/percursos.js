'use strict';

const PercursoSchema = require('../models/percurso');
const ViagemSchema = require('../models/viagem');

module.exports = {

    /**
     * Get percurso
     */
    get: (id, callback) => {
        PercursoSchema.findById(id, (err, percurso) => {
            if (err) {
                return callback(err);
            }

            callback(null, percurso);
        });
    },

    /**
     * Create percurso
     */
    create: (idViagem, percurso, callback) => {
        ViagemSchema.findById(idViagem, (err, viagem) => {
            if (err) {
                return callback(err);
            }
            
            percurso = new PercursoSchema(percurso);
            percurso.save(err => {
                if (err) {
                    return callback(err);
                }
                
                viagem.percursos.push(percurso);
                viagem.save(err => {
                    if (err) {
                        return callback(err);
                    }
                });
                
                callback(null, percurso);
            });
        });
    },

    /**
     * Delete percurso
     */
    delete: (id, callback) => {
        PercursoSchema.findByIdAndRemove(id, err => {
            if (err) {
                return callback(err);
            }

            callback();
        });
    }
};
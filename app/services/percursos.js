'use strict';

const PercursoSchema = require('../models/percurso');
const ViagemSchema = require('../models/viagem');

module.exports = {
    
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
    }
};
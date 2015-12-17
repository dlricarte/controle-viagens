'use strict';

const ViagemSchema = require('../models/viagem');

module.exports = {
    
    /**
     * List viagens
     */
    list: (query, page, callback) => {
        const perPage = 10;
        page = Math.max(0, page);
        
        ViagemSchema.find()
            .limit(perPage)
            .skip(perPage * page)
            .sort('data_criacao')
            .where(query || '')
            .exec((err, viagens) => {
                if (err) {
                    return callback(err);
                }
                
                ViagemSchema.count().exec((err, count) => {
                    if (err) {
                        return callback(err);
                    }
                    
                    callback(null, {
                        viagens: viagens,
                        page: page,
                        pages: count / perPage
                    });
                });
            });
    },
    
    /**
     * Create viagem
     */
    create: (viagem, callback) => {
        viagem = new ViagemSchema(viagem);
        viagem.save((err) => {
            if (err) {
                return callback(err);
            }
            
            callback(null, viagem);
        });
    },
    
    /**
     * Update viagem
     */
    update: (viagem, callback) => {
        ViagemSchema.findByIdAndUpdate(viagem._id, viagem, (err, uViagem) => {
            if (err) {
                return callback(err);
            }
            
            callback(null, viagem);
        });
    },

    /**
     * Get viagem
     */
    get: (id, callback) => {
        ViagemSchema.findById(id, (err, viagem) => {
            if (err) {
                return callback(err);
            }

            ViagemSchema.populate(viagem, 'percursos', (err, viagem) => {
                if (err) {
                    return callback(err);
                }
                
                callback(null, viagem);
            });
        });
    },
    
    /**
     * Delete viagem
     */
    delete: (id, callback) => {
        ViagemSchema.findByIdAndRemove(id, err => {
            if (err) {
                return callback(err);
            }

            callback();
        });
    },

    /**
     * Finds by percurso
     */
    findByPercurso: (percurso, callback) => {
        ViagemSchema.findOne({ percursos: percurso }, (err, viagem) => {
            if (err) {
                return callback(err);
            }

            callback(null, viagem);
        });
    },
    
    /**
     * Finds all em viagem
     */
    findAllEmViagem: (callback) => {
        let hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        
        ViagemSchema
            .find()
            .where('data_envio').lte(hoje)
            .where('data_retorno').gte(hoje)
            .exec((err, viagens) => {
                if (err) {
                    return callback(err);
                }
                
                callback(null, viagens);
            });
    }
};
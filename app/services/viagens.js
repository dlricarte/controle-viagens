'use strict';

const ViagemSchema = require('../models/viagem');

module.exports = {
    
    /**
     * List viagens
     */
    list: (page, callback) => {
        const perPage = 10;
        page = Math.max(0, page);
        
        ViagemSchema.find()
            .limit(perPage)
            .skip(perPage * page)
            .sort('data_criacao')
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
                })
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
     * Delete viagem
     */
    delete: (id, callback) => {
        ViagemSchema.findByIdAndRemove(id, err => {
            if (err) {
                return callback(err);
            }
            
            callback();
        });
    }
};
'use strict';

const PercursoService = require('../services/percursos');
const DateUtils = require('../utils/date');

module.exports = {
    
    /**
     * Create percurso
     */
    create: (req, res, next) => {
        let percurso = {
            data:                       DateUtils.toDate(req.body.data),
            descricao_despesa:          req.body.descricao_despesa,
            passagem_aerea:             req.body.passagem_aerea,
            hospedagem:                 req.body.hospedagem,
            transporte_terrestre:       req.body.transporte_terrestre,
            refeicoes:                  req.body.refeicoes,
            conferencias:               req.body.conferencias,
            reembolso_quilometragem:    req.body.reembolso_quilometragem,
            diversos:                   req.body.diversos,
            taxa_cambial:               req.body.taxa_cambial,
            quilometros:                req.body.quilometros,
            moeda:                      req.body.moeda
        };
        
        PercursoService.create(req.body['viagem.id'], percurso, (err, p) => {
            if (err) {
                return next(err);
            }
            
            req.flash('info', `Registro ${p._id} criado com sucesso`);
            res.redirect(`/${req.body['viagem.id']}`);
        });
    }
};
'use strict';

const ViagensService = require('../services/viagens');
const DateUtils = require('../utils/date');

module.exports = {

    /**
     * Index action
     */
    index: (req, res, next) => {
        const page = req.query.page || 0;

        ViagensService.list(page, (err, retorno) => {
            if (err) {
                return next(err);
            }

            res.render('index', {
                viagens: retorno.viagens,
                page: retorno.page,
                pages: retorno.pages,
                url: req.path
            });
        });
    },

    /**
     * Create action
     */
    create: (req, res, next) => {
        let viagem = {
            nome:               req.body.nome,
            departamento:       req.body.departamento,
            autorizado_por:     req.body.autorizado_por,
            taxa_quilometragem: req.body.taxa_quilometragem,
            data_envio:         DateUtils.toDate(req.body.data_envio)
        };

        ViagensService.create(viagem, (err, viagem) => {
            if (err) {
                return next(err);
            }

            req.flash('info', `Registro ${viagem._id} criado com sucesso`);
            res.redirect(`/${viagem._id}`);
        });
    },

    /**
     * Edit action
     */
    edit: (req, res, next) => {
        const id = req.params.id;

        ViagensService.get(id, (err, viagem) => {
            if (err) {
                return next(err);
            }
            
            res.render('edit', {viagem: viagem});
        });
    },

    /**
     * Update action
     */
    update: (req, res, next) => {
        let viagem = {
            _id:                req.body.id,
            nome:               req.body.nome,
            departamento:       req.body.departamento,
            autorizado_por:     req.body.autorizado_por,
            taxa_quilometragem: req.body.taxa_quilometragem,
            data_envio:         DateUtils.toDate(req.body.data_envio)
        };

        ViagensService.update(viagem, (err, viagem) => {
            if (err) {
                return next(err);
            }
        
            req.flash('info', `Registro ${viagem._id} atualizado com sucesso`);
            res.redirect(`/${viagem._id}`);
        });
    },

    /**
     * Delete action
     */
    delete: (req, res, next) => {
        let id = req.params.id;

        ViagensService.delete(id, err => {
            if (err) {
                return next(err);
            }

            req.flash('info', `Registro ${id} excluído com sucesso`);
            res.redirect('/');
        });
    },

    /**
     * Print action
     */
    print: (req, res, next) => {
        let id = req.params.id;
        ViagensService.get(id, (err, viagem) => {
            if (err) {
                return next(err);
            }
            
            res.render('reports/viagem', {viagem: viagem});
        });
    }
};
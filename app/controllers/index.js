'use strict';

const moment = require('moment');

const ViagensService = require('../services/viagens');

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
            nome: req.body.nome,
            departamento: req.body.departamento,
            autorizado_por: req.body.autorizado_por,
            data_envio: moment(req.body.data_envio, 'DD/MM/YYYY').isValid() ?
                moment(req.body.data_envio, 'DD/MM/YYYY').toDate() : null
        };

        ViagensService.create(viagem, (err, viagem) => {
            if (err) {
                return next(err);
            }

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

    },

    /**
     * Delete action
     */
    delete: (req, res, next) => {
        var id = req.params.id;

        ViagensService.delete(id, err => {
            if (err) {
                return next(err);
            }

            req.flash('info', `Registro ${id} excluído com sucesso`);
            res.redirect('/');
        });
    }
};
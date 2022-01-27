const { Router } = require('express');
const Dididoit = require('../models/Dididoit.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const dididoit = await Dididoit.insert({
        dididoit: req.body.dididoit,
        isToBlame: req.body.isToBlame,
      });
      res.send(dididoit);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const dididoit = await Dididoit.getAll();

      res.json(dididoit);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dididoit = await Dididoit.getById(id);
      res.json(dididoit);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dididoit = await Dididoit.updateById(id, { ...req.body });

      res.json(dididoit);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const dididoit = await Dididoit.deleteById(id);

      res.json(dididoit);
    } catch (error) {
      next(error);
    }
  });

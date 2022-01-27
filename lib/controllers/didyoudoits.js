const { Router } = require('express');
const Didyoudoit = require('../models/Didyoudoit.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const didyoudoit = await Didyoudoit.insert({
        didyoudoit: req.body.didyoudoit,
        isToBlame: req.body.isToBlame,
      });
      res.send(didyoudoit);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const didyoudoit = await Didyoudoit.getAll();

      res.json(didyoudoit);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const didyoudoit = await Didyoudoit.getById(id);
      res.json(didyoudoit);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const didyoudoit = await Didyoudoit.updateById(id, { ...req.body });

      res.json(didyoudoit);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const didyoudoit = await Didyoudoit.deleteById(id);

      res.json(didyoudoit);
    } catch (error) {
      next(error);
    }
  });

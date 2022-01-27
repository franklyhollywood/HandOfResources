const { Router } = require('express');
const Haveyoudoneit = require('../models/Haveyoudoneit.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const haveyoudoneit = await Haveyoudoneit.insert({
        haveyoudoneit: req.body.haveyoudoneit,
        isdone: req.body.isdone,
      });
      res.send(haveyoudoneit);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const haveyoudoneit = await Haveyoudoneit.getAll();

      res.json(haveyoudoneit);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const haveyoudoneit = await Haveyoudoneit.getById(id);
      res.json(haveyoudoneit);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const haveyoudoneit = await Haveyoudoneit.updateById(id, { ...req.body });

      res.json(haveyoudoneit);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const haveyoudoneit = await Haveyoudoneit.deleteById(id);

      res.json(haveyoudoneit);
    } catch (error) {
      next(error);
    }
  });

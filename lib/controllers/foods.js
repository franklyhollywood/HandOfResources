const { Router } = require('express');
const Food = require('../models/Food.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const food = await Food.insert({
        food: req.body.food,
        isEdible: req.body.isEdible,
      });
      res.send(food);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const food = await Food.getAll();

      res.json(food);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const food = await Food.getById(id);
      res.json(food);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const food = await Food.updateById(id, { ...req.body });

      res.json(food);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const food = await Food.deleteById(id);

      res.json(food);
    } catch (error) {
      next(error);
    }
  });

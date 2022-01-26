const { Router } = require('express');
const Artist = require('../models/Artist.js');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const artist = await Artist.insert({
        artist: req.body.artist,
        albumName: req.body.albumName,
        isFavorited: req.body.isFavorited,
      });
      res.send(artist);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const artists = await Artist.getAll();

      res.json(artists);
    } catch (error) {
      next(error);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const artist = await Artist.getById(id);
      res.json(artist);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const artist = await Artist.updateById(id, { ...req.body });

      res.json(artist);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const projector = await Artist.deleteById(id);

      res.json(projector);
    } catch (error) {
      next(error);
    }
  });

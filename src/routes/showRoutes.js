const express = require('express');
const { validationResult, check } = require('express-validator');
const Show = require('../models/Show');
const User = require('../models/User');

const router = express.Router();

router.get('/', async (req, res) => {
  const shows = await Show.findAll();
  res.json(shows);
});

router.get('/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    res.json(show);
  } else {
    res.status(404).json({ error: 'Show not found' });
  }
});

router.get('/:id/users', async (req, res) => {
  const show = await Show.findByPk(req.params.id, { include: User });
  if (show) {
    res.json(show.users);
  } else {
    res.status(404).json({ error: 'Show not found' });
  }
});

router.put('/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    show.available = req.body.available;
    await show.save();
    res.json(show);
  } else {
    res.status(404).json({ error: 'Show not found' });
  }
});

router.delete('/:id', async (req, res) => {
  const show = await Show.findByPk(req.params.id);
  if (show) {
    await show.destroy();
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Show not found' });
  }
});

router.get('/', async (req, res) => {
  const genre = req.query.genre;
  const shows = await Show.findAll({ where: { genre } });
  res.json(shows);
});

module.exports = router;

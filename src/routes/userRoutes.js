const express = require('express');
const { validationResult, check } = require('express-validator');
const User = require('../models/User');
const Show = require('../models/Show');

const router = express.Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', async (req, res) => {
  const user = await User.findByPk(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.get('/:id/shows', async (req, res) => {
  const user = await User.findByPk(req.params.id, { include: Show });
  if (user) {
    res.json(user.shows);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

router.put('/:userId/shows/:showId', async (req, res) => {
  const user = await User.findByPk(req.params.userId);
  const show = await Show.findByPk(req.params.showId);

  if (user && show) {
    await user.addShow(show);
    res.status(200).json({ message: 'User added to show' });
  } else {
    res.status(404).json({ error: 'User or Show not found' });
  }
});

module.exports = router;

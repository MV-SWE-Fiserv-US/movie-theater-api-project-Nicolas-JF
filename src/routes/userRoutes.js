const express = require('express');
const { check, validationResult } = require('express-validator');
const { User, Show } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve user' });
  }
});

router.get('/:id/shows', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const shows = await user.getShows();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve shows' });
  }
});

router.put('/:userId/shows/:showId', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    const show = await Show.findByPk(req.params.showId);
    if (!user || !show) {
      return res.status(404).json({ error: 'User or show not found' });
    }
    await user.addShow(show);
    res.status(200).json({ message: 'Show added to user successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to associate show with user' });
  }
});

module.exports = router;

const { check, validationResult } = require('express-validator');

router.post(
  '/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Email must be valid'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  }
);

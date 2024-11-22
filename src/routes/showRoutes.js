const express = require('express');
const { Show, User } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const shows = await Show.findAll();
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve shows' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve show' });
  }
});

router.get('/:id/users', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    const users = await show.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
});

router.put('/:id/available', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    show.available = req.body.available;
    await show.save();
    res.json(show);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update show availability' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const show = await Show.findByPk(req.params.id);
    if (!show) {
      return res.status(404).json({ error: 'Show not found' });
    }
    await show.destroy();
    res.status(200).json({ message: 'Show deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete show' });
  }
});

router.get('/:genre', async (req, res) => {
  try {
    const shows = await Show.findAll({
      where: { genre: req.params.genre },
    });
    res.json(shows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve shows by genre' });
  }
});

module.exports = router;

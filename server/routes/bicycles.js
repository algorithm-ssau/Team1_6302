const express = require('express');
const router = express.Router();
const Bicycle = require('../models/Bicycle');

// @route   GET /api/bicycles
// @desc    Получить все велосипеды
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Фильтрация по категории, если указана
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const bicycles = await Bicycle.find(filter);
    res.json(bicycles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

// @route   GET /api/bicycles/:id
// @desc    Получить велосипед по ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const bicycle = await Bicycle.findById(req.params.id);
    
    if (!bicycle) {
      return res.status(404).json({ msg: 'Велосипед не найден' });
    }
    
    res.json(bicycle);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Велосипед не найден' });
    }
    res.status(500).send('Ошибка сервера');
  }
});

// @route   POST /api/bicycles
// @desc    Добавить новый велосипед
// @access  Public (в реальном проекте здесь должна быть аутентификация)
router.post('/', async (req, res) => {
  try {
    const { name, category, price, description, image } = req.body;
    
    const newBicycle = new Bicycle({
      name,
      category,
      price,
      description,
      image
    });
    
    const bicycle = await newBicycle.save();
    res.json(bicycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router; 
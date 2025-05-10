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
    // Фильтрация по цене, если указан минимум или максимум
    if (req.query.minPrice || req.query.maxPrice) {
      filter.price = {};
      if (req.query.minPrice) {
        filter.price.$gte = parseInt(req.query.minPrice);
      }
      if (req.query.maxPrice) {
        filter.price.$lte = parseInt(req.query.maxPrice);
      }
    } 
    // Фильтрация по размеру рамы
    if (req.query.frameSize) {
      filter.frameSize = req.query.frameSize;
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
    const { name, category, price, description, image, frameSize } = req.body;
    
    const newBicycle = new Bicycle({
      name,
      category,
      price,
      description,
      image,
      frameSize
    });
    
    const bicycle = await newBicycle.save();
    res.json(bicycle);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Ошибка сервера');
  }
});

module.exports = router; 
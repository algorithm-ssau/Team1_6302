const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');

// Подключаемся к MongoDB
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Маршруты API
app.use('/api/bicycles', require('./routes/bicycles'));

// Статические файлы
app.use(express.static(path.join(__dirname, '../')));

// Простой эндпоинт для проверки работы API
app.get('/api/test', (req, res) => {
  res.json({ message: 'API работает' });
});

// Маршрут для главной страницы
app.get('/', (req, res) => {
  res.redirect('/catalog');
});

// Маршрут для страницы каталога
app.get('/catalog', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../catalog.html'));
});

// Маршрут для страницы "О нас"
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../about.html'));
});

// Маршрут для страницы корзины
app.get('/cart', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../cart.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../checkout.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

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
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/js', express.static(path.join(__dirname, '../js')));

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
app.get('/catalog.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../catalog.html'));
});

// Маршрут для страницы "О нас"
app.get('/about', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../about.html'));
});
app.get('/about.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../about.html'));
});

// Маршрут для страницы корзины
app.get('/cart', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../cart.html'));
});
app.get('/cart.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../cart.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../checkout.html'));
});
app.get('/checkout.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../checkout.html'));
});

// Маршрут для страницы калькулятора
app.get('/calculator', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../calculator.html'));
});
app.get('/calculator.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../calculator.html'));
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

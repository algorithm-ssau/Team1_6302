const mongoose = require('mongoose');
const bicycles = require('./data/bicycles');
const Bicycle = require('./models/Bicycle');
const connectDB = require('./config/db');

// Подключаемся к базе данных
connectDB();

// Импорт данных
const importData = async () => {
  try {
    // Очищаем существующие данные
    await Bicycle.deleteMany();
    
    // Добавляем новые данные
    await Bicycle.insertMany(bicycles);
    
    console.log('Данные успешно импортированы!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
};

// Удаление всех данных
const destroyData = async () => {
  try {
    // Очищаем существующие данные
    await Bicycle.deleteMany();
    
    console.log('Данные успешно удалены!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
};

// Запуск в зависимости от аргумента
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
} 
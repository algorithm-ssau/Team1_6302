const mongoose = require('mongoose');
const Bicycle = require('./models/Bicycle');
const connectDB = require('./config/db');

// Подключаемся к базе данных
connectDB();

// Загрузка данных из MongoDB
const loadDataFromDB = async () => {
  try {
    const bicycles = await Bicycle.find();
    console.log('Данные успешно загружены из MongoDB!');
    console.log('Количество загруженных велосипедов:', bicycles.length);
    process.exit();
  } catch (error) {
    console.error(`Ошибка при загрузке данных: ${error.message}`);
    process.exit(1);
  }
};

// Инициализация базы данных с тестовыми данными
const initDB = async () => {
  try {
    // Очищаем существующие данные
    await Bicycle.deleteMany();
    
    // Тестовые данные
    const testBicycles = [
      {
        name: 'Горный велосипед XC Pro',
        category: 'mountain',
        price: 45000,
        description: 'Профессиональный горный велосипед для трейлов и кросс-кантри. Алюминиевая рама, подвеска RockShox.',
        image: 'img/mountain_bike.jpg',
        frameSize: 'L',
        inStock: true,
        rating: 4.8,
        numReviews: 12
      },
      {
        name: 'Шоссейный велосипед Road Master',
        category: 'road',
        price: 78000,
        description: 'Скоростной шоссейный велосипед с карбоновой рамой и аэродинамической формой. Идеален для шоссейных гонок.',
        image: 'img/road_bike.jpg',
        frameSize: 'M',
        inStock: true,
        rating: 4.5,
        numReviews: 8
      },
      {
        name: 'Городской велосипед City Cruiser',
        category: 'city',
        price: 25000,
        description: 'Комфортный городской велосипед с прямой посадкой, полноразмерными крыльями и багажником.',
        image: 'img/city_bike.jpg',
        frameSize: 'S',
        inStock: true,
        rating: 4.2,
        numReviews: 15
      },
      {
        name: 'Городской велосипед Fun Free',
        category: 'children',
        price: 5000,
        description: 'Детский велосипед, подойде для всех',
        image: 'img/children_bike.jpg',
        frameSize: 'S',
        inStock: true,
        rating: 4.2,
        numReviews: 15
      },
      {
        name: 'BMX Freestyle Pro',
        category: 'bmx',
        price: 30000,
        description: 'Профессиональный BMX велосипед для выполнения трюков. Прочная рама, усиленные колеса и отличная маневренность.',
        image: 'img/bmx_bike.jpg',
        frameSize: 'S',
        inStock: true,
        rating: 4.9,
        numReviews: 18
      },
      {
        name: 'Складной велосипед Folding Master',
        category: 'folding',
        price: 32000,
        description: 'Компактный складной велосипед для путешествий и ежедневных поездок. Легко складывается и помещается в багажник автомобиля.',
        image: 'img/folding_bike.jpg',
        frameSize: 'Universal',
        inStock: true,
        rating: 4.3,
        numReviews: 9
      },
      {
        name: 'Гравийный велосипед Gravel Explorer',
        category: 'gravel',
        price: 65000,
        description: 'Универсальный гравийный велосипед для дальних поездок по различным типам дорог. Прочная рама и широкие покрышки.',
        image: 'img/gravel_bike.jpg',
        frameSize: 'L',
        inStock: true,
        rating: 4.6,
        numReviews: 14
      },
      {
        name: 'Трековый велосипед Track Speed',
        category: 'track',
        price: 58000,
        description: 'Профессиональный трековый велосипед для велодрома. Фиксированная передача, легкая аэродинамическая рама.',
        image: 'img/track_bike.jpg',
        frameSize: 'M',
        inStock: true,
        rating: 4.8,
        numReviews: 7
      }
    ];
    
    // Добавляем тестовые данные
    await Bicycle.insertMany(testBicycles);
    
    console.log('База данных успешно инициализирована тестовыми данными!');
    process.exit();
  } catch (error) {
    console.error(`Ошибка: ${error.message}`);
    process.exit(1);
  }
};

// Удаление всех данных
const destroyData = async () => {
  try {
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
} else if (process.argv[2] === '-l') {
  loadDataFromDB();
} else if (process.argv[2] === '-i') {
  initDB();
} else {
  console.log('Используйте один из следующих флагов:');
  console.log('-i: инициализировать базу данных тестовыми данными');
  console.log('-l: загрузить данные из MongoDB');
  console.log('-d: удалить все данные');
  process.exit();
} 
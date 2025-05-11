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
        description: 'Материал рамы: Алюминий\nРазмер рамы: 19"\nКоличество передач: 21 (3x7)\nТормоза: Дисковые\nПодвеска: RockShox, ход 100мм\nРазмер колес: 29"\nТип: Горный велосипед для трейлов и кросс-кантри',
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
        description: 'Материал рамы: Карбон\nРазмер рамы: 56см\nКоличество передач: 22 (2x11)\nТормоза: Гидравлические дисковые\nКолеса: Карбоновые 700с\nТип: Шоссейный велосипед для гонок',
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
        description: 'Материал рамы: Сталь\nРазмер рамы: 18"\nКоличество передач: 7\nТормоза: V-brake ободные\nРазмер колес: 28"\nДополнительно: Крылья, багажник\nТип: Городской велосипед',
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
        description: 'Материал рамы: Алюминий\nРазмер рамы: 14"\nКоличество передач: 6\nТормоза: Ободные\nРазмер колес: 20"\nДополнительно: Защита цепи, звонок\nТип: Детский велосипед',
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
        description: 'Материал рамы: Хромомолибден\nРазмер рамы: 20.5"\nПередача: Фиксированная\nТормоза: U-brake\nРазмер колес: 20"\nОсобенности: Двойные обода\nТип: BMX для трюков',
        image: 'img/bmx_bike.jpg',
        frameSize: 'S',
        inStock: true,
        rating: 4.9,
        numReviews: 18
      },
      {
        name: 'Складной велосипед Folding Master',
        category: 'fold',
        price: 32000,
        description: 'Материал рамы: Алюминий\nРазмер рамы: 16"\nКоличество передач: 8\nТормоза: Дисковые\nРазмер колес: 20"\nОсобенности: Складная конструкция\nТип: Складной велосипед',
        image: 'img/folding_bike.jpg',
        frameSize: 'M',
        inStock: true,
        rating: 4.3,
        numReviews: 9
      },
      {
        name: 'Гравийный велосипед Gravel Explorer',
        category: 'gravel',
        price: 65000,
        description: 'Материал рамы: Карбон\nРазмер рамы: 56см\nКоличество передач: 22 (2x11)\nТормоза: Гидравлические дисковые\nРазмер колес: 700с\nПокрышки: 40мм\nТип: Гравийный велосипед',
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
        description: 'Материал рамы: Алюминий\nРазмер рамы: 54см\nПередача: Фиксированная 48/16\nРазмер колес: 700с\nОсобенности: Трековые втулки\nТип: Трековый велосипед',
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
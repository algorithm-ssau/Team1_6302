// Функция для получения всех велосипедов
async function getAllBicycles() {
    try {
      const response = await fetch('/api/bicycles');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении велосипедов:', error);
      return [];
    }
  }
  
  // Функция для получения велосипеда по ID
  async function getBicycleById(id) {
    try {
      const response = await fetch(`/api/bicycles/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении велосипеда:', error);
      return null;
    }
  }
  
  // Функция для получения велосипедов по категории
  async function getBicyclesByCategory(category) {
    try {
      const response = await fetch(`/api/bicycles?category=${category}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка при получении велосипедов по категории:', error);
      return [];
    }
  }
  
  // Функция для добавления товара в корзину
  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Проверяем, есть ли уже такой товар в корзине
    const existItem = cart.find(item => item._id === product._id);
    
    if (existItem) {
      // Если товар уже есть, увеличиваем количество
      cart = cart.map(item => 
        item._id === product._id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      // Если товара нет, добавляем новый с количеством 1
      cart.push({ ...product, qty: 1 });
    }
    
    // Сохраняем обновленную корзину
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Обновляем счетчик товаров в корзине
    updateCartCount();
    
    return cart;
  }
  
  // Функция для получения содержимого корзины
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }
  
  // Функция для обновления количества товаров в корзине
  function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((total, item) => total + item.qty, 0);
    
    // Обновляем отображение количества товаров в корзине
    const cartCountElements = document.querySelectorAll('.cart_count');
    cartCountElements.forEach(element => {
      element.textContent = count;
    });
  }
  
  // Инициализируем счетчик корзины при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
  }); 
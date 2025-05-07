document.addEventListener('DOMContentLoaded', function() {
    // Получаем контейнер для товаров в корзине
    const cartContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.cart-total-price');
    
    // Проверяем, существует ли контейнер на странице
    if (!cartContainer) return;
    
    // Функция для отображения товаров в корзине
    function renderCart() {
      // Получаем содержимое корзины
      const cart = getCart();
      
      // Если корзина пуста, показываем сообщение
      if (!cart.length) {
        cartContainer.innerHTML = '<p class="empty-cart">Ваша корзина пуста</p>';
        totalPriceElement.textContent = '0 ₽';
        return;
      }
      
      // Очищаем контейнер
      cartContainer.innerHTML = '';
      
      // Считаем общую сумму
      let totalPrice = 0;
      
      // Выводим товары
      cart.forEach(item => {
        const itemPrice = item.price * item.qty;
        totalPrice += itemPrice;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
          <div class="cart-item-image">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h3>${item.name}</h3>
            <p class="cart-item-price">${item.price.toLocaleString()} ₽</p>
          </div>
          <div class="cart-item-quantity">
            <button class="qty-btn decrease" data-id="${item._id}">-</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn increase" data-id="${item._id}">+</button>
          </div>
          <div class="cart-item-total">
            <p>${itemPrice.toLocaleString()} ₽</p>
          </div>
          <div class="cart-item-remove">
            <button class="remove-btn" data-id="${item._id}">✕</button>
          </div>
        `;
        
        cartContainer.appendChild(cartItem);
      });
      
      // Обновляем общую сумму
      totalPriceElement.textContent = totalPrice.toLocaleString() + ' ₽';
      
      // Добавляем обработчики событий
      attachCartEventListeners();
    }
    
    // Функция для обновления количества товара
    function updateItemQuantity(id, change) {
      let cart = getCart();
      
      cart = cart.map(item => {
        if (item._id === id) {
          const newQty = Math.max(1, item.qty + change); // Минимум 1 товар
          return { ...item, qty: newQty };
        }
        return item;
      });
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
    
    // Функция для удаления товара
    function removeItem(id) {
      let cart = getCart();
      cart = cart.filter(item => item._id !== id);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      renderCart();
    }
    
    // Функция для привязки обработчиков событий
    function attachCartEventListeners() {
      // Обработчики кнопок уменьшения количества
      document.querySelectorAll('.qty-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          updateItemQuantity(id, -1);
        });
      });
      
      // Обработчики кнопок увеличения количества
      document.querySelectorAll('.qty-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          updateItemQuantity(id, 1);
        });
      });
      
      // Обработчики кнопок удаления
      document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', function() {
          const id = this.getAttribute('data-id');
          removeItem(id);
        });
      });
    }
    
    // Обработчик кнопки оформления заказа
    const checkoutButton = document.querySelector('.checkout-btn');
    if (checkoutButton) {
      checkoutButton.addEventListener('click', function() {
        const cart = getCart();
        if (!cart.length) {
          alert('Ваша корзина пуста!');
          return;
        }
        
        window.location.href = 'checkout.html';
        
      });
    }
    
    // Обработчик кнопки очистки корзины
    const clearCartButton = document.querySelector('.clear-cart-btn');
    if (clearCartButton) {
      clearCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart');
        updateCartCount();
        renderCart();
      });
    }
    
    
    // Отображаем текущее содержимое корзины
    renderCart();
  });
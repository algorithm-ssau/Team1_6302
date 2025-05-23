document.addEventListener('DOMContentLoaded', async function() {
    // Получаем контейнер для товаров
    const productContainer = document.querySelector('.product-grid');
    
    // Проверяем, существует ли контейнер на странице
    if (!productContainer) return;
    
    // Создаем модальное окно для описания
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2 class="modal-title"></h2>
        <p class="modal-description"></p>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Получаем параметры из URL для фильтрации
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    
    // Получаем велосипеды
    let bicycles = [];
    if (category) {
      bicycles = await getBicyclesByCategory(category);
      
      // Обновляем заголовок страницы
      const categoryTitles = {
        'mountain': 'Горные велосипеды',
        'road': 'Шоссейные велосипеды',
        'city': 'Городские велосипеды',
        'children': 'Детские велосипеды'
      };
      
      const catalogTitle = document.querySelector('h1');
      if (catalogTitle && categoryTitles[category]) {
        catalogTitle.textContent = categoryTitles[category];
      }
    } else {
      bicycles = await getAllBicycles();
    }
    
    // Если товары не загрузились, показываем сообщение
    if (!bicycles.length) {
      productContainer.innerHTML = '<p>Товары не найдены</p>';
      return;
    }
    
    // Очищаем контейнер
    productContainer.innerHTML = '';
    
    // Выводим товары
    bicycles.forEach(bicycle => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      
      productCard.innerHTML = `
        <div class="product-image">
          <img src="${bicycle.image}" alt="${bicycle.name}">
        </div>
        <h3>${bicycle.name}</h3>
        <p class="product-price">${bicycle.price.toLocaleString()} ₽</p>
        <div class="product-rating">
          <span class="stars">${'★'.repeat(Math.round(bicycle.rating))}</span>
          <span class="rating-count">(${bicycle.numReviews})</span>
        </div>
        <div class="product-actions">
          <button class="btn btn-primary add-to-cart" data-id="${bicycle._id}">В корзину</button>
          <button class="btn btn-info show-description" data-id="${bicycle._id}">Описание</button>
        </div>
      `;
      
      productContainer.appendChild(productCard);
    });
    
    // Добавляем обработчики событий для кнопок "В корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
      button.addEventListener('click', async function() {
        const bicycleId = this.getAttribute('data-id');
        const bicycle = await getBicycleById(bicycleId);
        
        if (bicycle) {
          addToCart(bicycle);
          alert('Товар добавлен в корзину!');
        }
      });
    });

    // Добавляем обработчики событий для кнопок "Описание"
    document.querySelectorAll('.show-description').forEach(button => {
      button.addEventListener('click', async function() {
        const bicycleId = this.getAttribute('data-id');
        const bicycle = await getBicycleById(bicycleId);
        
        if (bicycle) {
          modal.querySelector('.modal-title').textContent = bicycle.name;
          modal.querySelector('.modal-description').textContent = bicycle.description;
          modal.style.display = 'block';
        }
      });
    });

    // Закрытие модального окна
    modal.querySelector('.close-modal').addEventListener('click', () => {
      modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const calculatorForm = document.getElementById('calculatorForm');
    const resultsSection = document.getElementById('calculatorResults');
    const recommendedBikes = document.getElementById('recommendedBikes');

    if (!calculatorForm || !resultsSection || !recommendedBikes) {
        console.error('Не найдены необходимые элементы на странице');
        return;
    }

    calculatorForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const height = parseInt(document.getElementById('height').value);
            if (isNaN(height) || height < 140 || height > 220) {
                throw new Error('Пожалуйста, введите корректный рост (от 140 до 220 см)');
            }

            const gender = document.querySelector('input[name="gender"]:checked');
            if (!gender) {
                throw new Error('Пожалуйста, выберите пол');
            }

            const ridingStyle = document.getElementById('ridingStyle').value;
            if (!ridingStyle) {
                throw new Error('Пожалуйста, выберите стиль езды');
            }

            const experience = document.getElementById('experience').value;
            if (!experience) {
                throw new Error('Пожалуйста, выберите уровень опыта');
            }

            // Определяем размер рамы на основе роста
            let frameSize;
            if (height < 175) {
                frameSize = 'S';
            } else if (height < 190) {
                frameSize = 'M';
            } else {
                frameSize = 'L';
            }

            console.log('Параметры подбора:', {
                height,
                gender: gender.value,
                ridingStyle,
                experience,
                frameSize
            });

            // Получаем все велосипеды
            const response = await fetch('/api/bicycles');
            if (!response.ok) {
                throw new Error(`Ошибка сервера: ${response.status}`);
            }
            
            const bicycles = await response.json();
            console.log('Получено велосипедов:', bicycles.length);

            // Фильтруем велосипеды по параметрам
            const filteredBikes = bicycles.filter(bike => {
                // Проверяем размер рамы
                if (bike.frameSize !== frameSize) return false;

                // Проверяем стиль катания
                if (bike.category !== ridingStyle) return false;

                // Проверяем опыт (для начинающих рекомендуем более простые модели)
                if (experience === 'beginner' && bike.price > 50000) return false;

                return true;
            });

            console.log('Отфильтровано велосипедов:', filteredBikes.length);

            // Отображаем результаты
            displayResults(filteredBikes);
        } catch (error) {
            console.error('Ошибка при подборе велосипеда:', error);
            alert(error.message || 'Произошла ошибка при подборе велосипеда. Пожалуйста, попробуйте позже.');
        }
    });

    function displayResults(bikes) {
        if (bikes.length === 0) {
            recommendedBikes.innerHTML = `
                <div class="no-results">
                    <p>К сожалению, по вашим параметрам не найдено подходящих велосипедов.</p>
                    <p>Попробуйте изменить параметры поиска или обратитесь к нашим консультантам.</p>
                </div>
            `;
        } else {
            recommendedBikes.innerHTML = bikes.map(bike => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${bike.image}" alt="${bike.name}">
                    </div>
                    <div class="product-info">
                        <h3>${bike.name}</h3>
                        <p class="price">${bike.price.toLocaleString()} ₽</p>
                        <div class="rating">
                            ${generateRatingStars(bike.rating)}
                            <span>(${bike.numReviews})</span>
                        </div>
                        <p class="frame-size">Размер рамы: ${bike.frameSize}</p>
                        <div class="product-actions">
                            <button class="btn btn-primary add-to-cart" data-id="${bike._id}">
                                В корзину
                            </button>
                            <button class="btn btn-info show-description" data-id="${bike._id}">
                                Описание
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');

            // Добавляем обработчики для кнопок
            addEventListeners();
        }

        resultsSection.style.display = 'block';
    }

    function generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '<i class="fas fa-star"></i>';
        }
        if (hasHalfStar) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        }
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars += '<i class="far fa-star"></i>';
        }

        return stars;
    }

    function addEventListeners() {
        // Обработчик для кнопки "В корзину"
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bikeId = e.target.dataset.id;
                try {
                    // Получаем информацию о велосипеде
                    const response = await fetch(`/api/bicycles/${bikeId}`);
                    if (!response.ok) {
                        throw new Error(`Ошибка сервера: ${response.status}`);
                    }
                    
                    const bike = await response.json();
                    
                    // Добавляем в корзину через localStorage
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existItem = cart.find(item => item._id === bike._id);
                    
                    if (existItem) {
                        cart = cart.map(item => 
                            item._id === bike._id ? { ...item, qty: item.qty + 1 } : item
                        );
                    } else {
                        cart.push({ ...bike, qty: 1 });
                    }
                    
                    localStorage.setItem('cart', JSON.stringify(cart));
                    
                    // Обновляем счетчик корзины
                    const cartCount = document.querySelector('.cart_count');
                    if (cartCount) {
                        const count = cart.reduce((total, item) => total + item.qty, 0);
                        cartCount.textContent = count;
                    }

                    alert('Велосипед добавлен в корзину!');
                } catch (error) {
                    console.error('Ошибка при добавлении в корзину:', error);
                    alert('Не удалось добавить велосипед в корзину. Пожалуйста, попробуйте позже.');
                }
            });
        });

        // Обработчик для кнопки "Описание"
        document.querySelectorAll('.show-description').forEach(button => {
            button.addEventListener('click', async (e) => {
                const bikeId = e.target.dataset.id;
                try {
                    const response = await fetch(`/api/bicycles/${bikeId}`);
                    const bike = await response.json();

                    const modal = document.createElement('div');
                    modal.className = 'modal';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <span class="close-modal">&times;</span>
                            <h2 class="modal-title">${bike.name}</h2>
                            <p class="modal-description">${bike.description}</p>
                        </div>
                    `;

                    document.body.appendChild(modal);
                    modal.style.display = 'block';

                    // Закрытие модального окна
                    const closeBtn = modal.querySelector('.close-modal');
                    closeBtn.onclick = () => {
                        modal.remove();
                    };

                    window.onclick = (e) => {
                        if (e.target === modal) {
                            modal.remove();
                        }
                    };
                } catch (error) {
                    console.error('Ошибка:', error);
                    alert('Не удалось загрузить описание велосипеда');
                }
            });
        });
    }
}); 
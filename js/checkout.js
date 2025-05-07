document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    const successMessage = document.getElementById('success-message');

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const phone = document.getElementById('phone').value;

        // Проверяем, что корзина не пуста
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Ваша корзина пуста!');
            return;
        }

        // Создаем объект заказа
        const order = {
            fullname: fullname,
            phone: phone,
            items: cart,
            date: new Date().toISOString()
        };

        // Сохраняем заказ в localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        // Очищаем корзину
        localStorage.removeItem('cart');
        updateCartCount();

        // Показываем сообщение об успешном оформлении заказа
        checkoutForm.style.display = 'none';
        successMessage.style.display = 'block';
    });

    // Функция для обновления счетчика товаров в корзине
    function updateCartCount() {
        const cartCount = document.querySelector('.cart_count');
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartCount.textContent = cart.length;
    }

    // Обновляем счетчик при загрузке страницы
    updateCartCount();
});
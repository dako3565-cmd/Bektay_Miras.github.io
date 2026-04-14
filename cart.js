const container = document.getElementById("cartItems");
const totalBox = document.getElementById("total");

function renderCart() {
    // Получаем актуальные данные из памяти
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Очищаем контейнер перед новой отрисовкой
    container.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = "<p>Your cart is empty</p>";
        totalBox.innerText = "Total: $0";
        return;
    }

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "cart-item";

        div.innerHTML = `
            <div class="cart-item__info">
                <p><b>${item.name}</b></p>
                <p>$${item.price}</p>
            </div>
            <button class="btn-delete" onclick="removeItem(${index})">✕ Remove</button>
        `;

        container.appendChild(div);
        total += item.price;
    });

    totalBox.innerText = "Total: $" + total;
}

// Функция удаления товара по индексу
window.removeItem = function(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Удаляем один элемент по индексу
    cart.splice(index, 1);
    
    // Сохраняем обновленный массив обратно в localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Перерисовываем корзину
    renderCart();
};

// Запускаем отрисовку при загрузке страницы
renderCart();
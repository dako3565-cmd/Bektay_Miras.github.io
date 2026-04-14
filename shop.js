const container = document.getElementById("products");
const sortSelect = document.getElementById("sortSelect");
const priceFilter = document.getElementById("priceFilter");
const countElement = document.getElementById("productCount"); // Элемент для счетчика

// 1. Сразу определяем категорию товаров по ID тела страницы
const bodyId = document.body.id; 
const categoryProducts = products.filter(p => p.category === bodyId);

function renderProducts() {
    // Очищаем контейнер перед новой отрисовкой
    container.innerHTML = "";
    
    // Создаем копию массива, чтобы не испортить оригинал
    let filtered = [...categoryProducts];

    // --- ФИЛЬТРАЦИЯ ПО ЦЕНЕ ---
    const priceVal = priceFilter.value;
    if (priceVal === "0-100") {
        filtered = filtered.filter(p => p.price <= 100);
    } else if (priceVal === "100-500") {
        filtered = filtered.filter(p => p.price > 100 && p.price <= 500);
    } else if (priceVal === "500+") {
        filtered = filtered.filter(p => p.price > 500);
    }

    // --- СОРТИРОВКА ---
    const sortVal = sortSelect.value;
    if (sortVal === "low") {
        filtered.sort((a, b) => a.price - b.price);
    } else if (sortVal === "high") {
        filtered.sort((a, b) => b.price - a.price);
    }

    // --- ОБНОВЛЕНИЕ СЧЕТЧИКА ---
    if (countElement) {
        countElement.innerText = filtered.length;
    }

    // --- ОТРИСОВКА КАРТОЧЕК ---
    if (filtered.length === 0) {
        container.innerHTML = "<p style='grid-column: 1/-1; text-align: center; padding: 50px; color: #888;'>Тауар табылмады</p>";
        return;
    }

    filtered.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        
        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        const isFavorite = wishlist.includes(product.id);

        card.innerHTML = `
            <div class="card__img">
                <a href="product.html?id=${product.id}">
                    <img src="${product.image}">
                </a>
                <button class="wishlist-btn ${isFavorite ? 'active' : ''}" onclick="toggleWishlist(${product.id}, this)">
                    ❤
                </button>
            </div>
            <div class="card__meta">
                <p class="card__title">${product.name}</p>
                <span>$${product.price}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Слушаем изменения в селекторах
sortSelect.addEventListener("change", renderProducts);
priceFilter.addEventListener("change", renderProducts);

// Запускаем первую отрисовку при загрузке
renderProducts();

// Функция для избранного
window.toggleWishlist = function(id, btn) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlist.includes(id)) {
        wishlist = wishlist.filter(itemId => itemId !== id);
        btn.classList.remove('active');
    } else {
        wishlist.push(id);
        btn.classList.add('active');
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};
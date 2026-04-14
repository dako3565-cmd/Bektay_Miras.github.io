// Было: let cart = [];
// Стало:
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const buttons = document.querySelectorAll(".add-to-cart");

buttons.forEach(button => {

button.addEventListener("click", () => {

const product = {
name: "Leather Sneakers",
price: 120
};

cart.push(product);

localStorage.setItem("cart", JSON.stringify(cart));

alert("Added to cart");

});

});

function toggleWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    
    if (wishlist.includes(productId)) {
        // Если уже есть — удаляем
        wishlist = wishlist.filter(id => id !== productId);
        alert("Removed from Wishlist");
    } else {
        // Если нет — добавляем
        wishlist.push(productId);
        alert("Added to Wishlist");
    }
    
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    searchResults.innerHTML = '';

    if (query.length < 2) {
        searchResults.classList.remove('show'); // Скрываем с анимацией
        return;
    }

    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );

    if (filtered.length > 0) {
        filtered.forEach(product => {
            const div = document.createElement('div');
            div.className = 'search-item';
            // Обновленный HTML для элемента результата
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="search-item__info">
                    <p class="search-item__name">${product.name}</p>
                    <p class="search-item__price">$${product.price}</p>
                </div>
            `;
            div.onclick = () => {
                window.location.href = `product.html?id=${product.id}`;
            };
            searchResults.appendChild(div);
        });
        searchResults.classList.add('show'); // Показываем с анимацией
    } else {
        // Красивое сообщение, если ничего не найдено
        searchResults.innerHTML = '<div class="search-no-results">Ештеңе табылмады</div>';
        searchResults.classList.add('show');
    }
});

// Закрытие при клике вне поля
document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
        searchResults.classList.remove('show');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });
});
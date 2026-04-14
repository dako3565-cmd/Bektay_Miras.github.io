const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));
const product = products.find(p => p.id === id);

const container = document.getElementById("product");

// Проверка: если товар не найден, выводим сообщение
if (!product) {
    container.innerHTML = "<h2>Product not found</h2><a href='index.html'>Go back</a>";
}  else {
    // Проверяем, есть ли товар в избранном для покраски кнопки
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isFavorite = wishlist.includes(product.id);

    container.innerHTML = `
    <div class="product">
        <div class="product__img">
            <img src="${product.image}">
        </div>
        <div class="product_info">
            <h1>${product.name}</h1>
            <p class="price">$${product.price}</p>
            
            <div class="product__actions">
                <button id="addCart" class="btn btn--primary">Add to cart</button>
                <button id="wishBtn" class="wish-circle ${isFavorite ? 'active' : ''}">
                    ❤
                </button>
            </div>
        </div>
    </div>
    `;

    // Логика корзины
    document.getElementById("addCart").addEventListener("click", () => {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Added to cart");
    });

    // Логика избранного
    const wishBtn = document.getElementById("wishBtn");
    wishBtn.addEventListener("click", () => {
        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        
        if (wishlist.includes(product.id)) {
            wishlist = wishlist.filter(id => id !== product.id);
            wishBtn.classList.remove('active');
        } else {
            wishlist.push(product.id);
            wishBtn.classList.add('active');
        }
        
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    });
}


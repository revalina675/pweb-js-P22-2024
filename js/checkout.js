document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItemsDisplay = document.getElementById("total-items");
    const totalPriceDisplay = document.getElementById("total-price");

    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }

    function updateCartDisplay() {
        const cart = loadCartFromLocalStorage();
        cartItemsContainer.innerHTML = ""; 

        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p>Your cart is empty.</p>`;
        } else {
            cart.forEach(item => {
                const cartItemDiv = document.createElement("div");
                cartItemDiv.classList.add("cart-item");

                cartItemDiv.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>Price: ${formatRupiah(item.price)}</p>
                    <div>
                        <button onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span> <!-- Hapus "Quantity: " dari sini -->
                        <button onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button onclick="removeFromCart(${item.id})">Remove</button>
                    </div>
                `;

                cartItemsContainer.appendChild(cartItemDiv);

                totalItems += item.quantity;
                totalPrice += item.price * item.quantity;
            });
        }

        totalItemsDisplay.innerText = totalItems;
        totalPriceDisplay.innerText = formatRupiah(totalPrice); 
    }

    function formatRupiah(amount) {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
        }).format(amount);
    }

    // Fungsi untuk menambah atau mengurangi kuantitas
    window.changeQuantity = (id, amount) => {
        const cart = loadCartFromLocalStorage();
        const item = cart.find(i => i.id === id);
        if (item) {
            item.quantity += amount;
            if (item.quantity <= 0) {
                removeFromCart(id);
            } else {
                localStorage.setItem("cart", JSON.stringify(cart));
                updateCartDisplay(); 
            }
        }
    };

    // Fungsi untuk menghapus item dari keranjang
    window.removeFromCart = (id) => {
        let cart = loadCartFromLocalStorage();
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartDisplay();
    };

    updateCartDisplay();

    // Tambahkan event listener untuk tombol checkout
    document.getElementById("proceed-checkout").addEventListener("click", () => {
        const cart = loadCartFromLocalStorage(); 
        if (cart.length === 0) { 
            alert("Your cart is empty! You cannot proceed to checkout."); 
        } else {
            // Mengosongkan keranjang jika ada item di dalamnya
            localStorage.removeItem("cart");
            alert("Checkout successful!");
            updateCartDisplay(); 
        }
    });
});

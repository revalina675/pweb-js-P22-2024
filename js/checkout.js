document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalItemsDisplay = document.getElementById("total-items");
    const totalPriceDisplay = document.getElementById("total-price");

    // Memuat cart dari Local Storage
    function loadCartFromLocalStorage() {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Mengupdate tampilan keranjang
    function updateCartDisplay() {
        const cart = loadCartFromLocalStorage();
        cartItemsContainer.innerHTML = ""; // Kosongkan container

        let totalItems = 0;
        let totalPrice = 0;

        if (cart.length === 0) {
            // Jika keranjang kosong, tampilkan pesan
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
        totalPriceDisplay.innerText = formatRupiah(totalPrice); // Memastikan hanya satu format harga
    }

    // Format angka menjadi Rupiah
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
                localStorage.setItem("cart", JSON.stringify(cart)); // Simpan perubahan
                updateCartDisplay(); // Update tampilan
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

    // Inisialisasi tampilan keranjang saat halaman dimuat
    updateCartDisplay();

    // Tambahkan event listener untuk tombol checkout
    document.getElementById("proceed-checkout").addEventListener("click", () => {
        // Mengosongkan keranjang
        localStorage.removeItem("cart");

        // Mengupdate tampilan untuk menunjukkan keranjang kosong
        alert("Checkout successful! Your cart has been emptied.");
        updateCartDisplay(); // Memperbarui tampilan untuk menunjukkan bahwa keranjang kosong
    });
});

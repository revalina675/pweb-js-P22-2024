document.addEventListener("DOMContentLoaded", async () => {
  let quantity = 1;
  const defaultPricePerItem = 450000; // Harga tetap per item dalam Rupiah
  const quantityDisplay = document.getElementById("quantity");
  const addToCartButton = document.getElementById("add-to-cart-btn");
  const totalPriceDisplay = document.getElementById("total-price"); // Elemen untuk menampilkan total harga
  const productNameDisplay = document.getElementById("product-name"); // Elemen untuk menampilkan nama produk

  // Format angka menjadi Rupiah
  function formatRupiah(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }

  // Update total harga berdasarkan kuantitas
  function updateTotalPrice() {
    const totalPrice = defaultPricePerItem * quantity;
    totalPriceDisplay.textContent = `Total Price: ${formatRupiah(totalPrice)}`; // Update total harga
  }

  // Ambil data produk dari API
  async function fetchProductData() {
    try {
      const response = await fetch("https://dummyjson.com/products/12"); // Mengambil data produk dengan ID 12
      const product = await response.json();

      // Menampilkan nama produk dan rating
      productNameDisplay.textContent = product.name; // Menampilkan nama produk
      document.querySelector(".stars").textContent = "★★★★★"; // Mengisi rating
      updateTotalPrice(); // Mengupdate total harga setelah mengambil data
    } catch (error) {
      console.error("Error fetching product data:", error);
      updateTotalPrice(); // Tetap update total harga meskipun API gagal
    }
  }

  // Tambah kuantitas
  document.getElementById("increase-btn").addEventListener("click", () => {
    quantity++;
    quantityDisplay.textContent = quantity;
    updateTotalPrice(); // Update total harga saat kuantitas ditambah
  });

  // Kurangi kuantitas
  document.getElementById("decrease-btn").addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      quantityDisplay.textContent = quantity;
      updateTotalPrice(); // Update total harga saat kuantitas dikurangi
    }
  });

  // Fungsi untuk menyimpan keranjang ke Local Storage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Fungsi untuk memuat keranjang dari Local Storage
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Fungsi tombol "Add to Cart"
  addToCartButton.addEventListener("click", () => {
    const totalPrice = defaultPricePerItem * quantity;
    const cart = loadCartFromLocalStorage();

    // Cek apakah item sudah ada di cart
    const existingItem = cart.find((item) => item.id === 12); // ID produk

    if (existingItem) {
      existingItem.quantity += quantity; // Update kuantitas jika sudah ada
    } else {
      cart.push({
        id: 12, // ID produk
        name: productNameDisplay.textContent, // Nama produk
        price: defaultPricePerItem,
        quantity: quantity,
      });
    }

    saveCartToLocalStorage(cart); // Simpan cart ke Local Storage
    alert(
      `Added ${quantity} items to the cart, total price: ${formatRupiah(
        totalPrice
      )}`
    );
  });

  // Inisialisasi tampilan awal
  updateTotalPrice(); // Update total harga di awal

  // Ambil data produk saat dokumen sudah dimuat
  await fetchProductData();
});

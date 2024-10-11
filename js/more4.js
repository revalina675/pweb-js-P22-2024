document.addEventListener("DOMContentLoaded", async () => {
  let quantity = 1;
  const defaultPricePerItem = 290000; // Harga tetap per item dalam Rupiah
  const quantityDisplay = document.getElementById("quantity");
  const addToCartButton = document.getElementById("add-to-cart-btn");
  const totalPriceDisplay = document.getElementById("total-price"); // Elemen untuk menampilkan total harga

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
      const response = await fetch("https://dummyjson.com/products/4"); // Mengambil data produk dengan ID 4
      const product = await response.json();

      // Hanya menggunakan data API untuk rating atau informasi lain, tidak untuk harga
      document.querySelector(".stars").textContent = "★★★★★"; // Mengisi rating (atau bisa menggunakan product.rating)
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

  // Fungsi untuk menyimpan cart ke Local Storage
  function saveCartToLocalStorage(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Fungsi untuk memuat cart dari Local Storage
  function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  }

  // Fungsi untuk memperbarui total checkout
  function updateCheckoutTotal() {
    const cart = loadCartFromLocalStorage();
    let totalItems = 0;
    let totalAmount = 0;

    cart.forEach((item) => {
      totalItems += item.quantity;
      totalAmount += item.quantity * item.price;
    });

    // Update elemen total checkout
    document.getElementById(
      "checkout-total-items"
    ).textContent = `Total Items: ${totalItems}`;
    document.getElementById(
      "checkout-total-amount"
    ).textContent = `Total Amount: ${formatRupiah(totalAmount)}`;
  }

  // Fungsi tombol "Add to Cart"
  addToCartButton.addEventListener("click", () => {
    const totalPrice = defaultPricePerItem * quantity;
    const cart = loadCartFromLocalStorage();

    // Cek apakah item sudah ada di cart
    const existingItem = cart.find((item) => item.id === 4); // ID produk (dalam kasus ini adalah ID 4)

    if (existingItem) {
      existingItem.quantity += quantity; // Update kuantitas jika sudah ada
    } else {
      cart.push({
        id: 4, // ID produk
        name: "Product Name", // Bisa ambil dari API, misalnya product.title
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
    updateCheckoutTotal(); // Update tampilan checkout total
  });

  // Inisialisasi tampilan awal
  updateTotalPrice(); // Update total harga di awal
  updateCheckoutTotal(); // Update total checkout di awal

  // Ambil data produk saat dokumen sudah dimuat
  await fetchProductData();
});

document.addEventListener("DOMContentLoaded", async () => {
    let quantity = 1;
    const defaultPricePerItem = 350000; // Harga tetap per item dalam Rupiah
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
        const response = await fetch("https://dummyjson.com/products/8"); // Mengambil data produk dengan ID 1
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
  
    // Fungsi tombol "Add to Cart"
    addToCartButton.addEventListener("click", () => {
      const totalPrice = defaultPricePerItem * quantity;
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
  
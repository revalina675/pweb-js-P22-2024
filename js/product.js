document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-button");
  const productItems = document.querySelectorAll(".product-item");
  let currentCategory = "all"; // Track active category

  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      currentCategory = category; // Set current category

      // Filter products based on category
      filterProducts(category);

      // Highlight the active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  document
    .getElementById("itemsCount")
    .addEventListener("change", updateItemsPerCategory);

  function filterProducts(category) {
    productItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    updateItemsPerCategory(); // Update after filtering
  }

  function updateItemsPerCategory() {
    const selectedCount = document.getElementById("itemsCount").value;
    let visibleCount =
      selectedCount === "all" ? productItems.length : parseInt(selectedCount);

    let filteredItems = [...productItems].filter(
      (item) =>
        currentCategory === "all" || item.dataset.category === currentCategory
    );

    // Hide all filtered items first
    filteredItems.forEach((item, index) => {
      if (index < visibleCount) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Initial display setup
  filterProducts(currentCategory);
});

function updateCheckout() {
  let cart = getCartFromLocalStorage(); // Asumsikan fungsi ini mengambil cart dari localStorage
  let totalItems = 0;
  let totalPrice = 0;
  
  cart.forEach(item => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price; // item.price sudah termasuk harga yang diambil dari API atau data produk
  });
  
  document.getElementById('total-items').innerText = totalItems;
  document.getElementById('total-price').innerText = totalPrice.toLocaleString(); // Format harga agar lebih rapi
}

// Panggil updateCheckout setiap kali keranjang di-update, misalnya setelah menambah item
document.getElementById('add-to-cart-btn').addEventListener('click', function() {
  addItemToCart(); // Asumsikan ini fungsi untuk menambah item ke keranjang
  updateCheckout();
});

// Inisialisasi saat halaman pertama kali dimuat
window.onload = function() {
  updateCheckout();
};


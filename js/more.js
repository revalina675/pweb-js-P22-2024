document.addEventListener("DOMContentLoaded", async () => {
  let quantity = 1;
  const defaultPricePerItem = 189000; 
  const quantityDisplay = document.getElementById("quantity");
  const addToCartButton = document.getElementById("add-to-cart-btn");
  const totalPriceDisplay = document.getElementById("total-price");
  
  function formatRupiah(amount) {
      return new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
      }).format(amount);
  }

  function updateTotalPrice() {
      const totalPrice = defaultPricePerItem * quantity;
      totalPriceDisplay.textContent = `Total Price: ${formatRupiah(totalPrice)}`;
  }

  // Ambil data produk dari API
  async function fetchProductData() {
      try {
          const response = await fetch("https://dummyjson.com/products/1"); 
          // Jika ada masalah pada respon (status di luar 200-299), lemparkan error
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          const product = await response.json();
          document.querySelector(".stars").textContent = "★★★★★"; 
          document.getElementById("product-info").textContent = product.title; // Update nama produk dari API
          updateTotalPrice(); 
      } catch (error) {
          console.error("Error fetching product data:", error);
          // Menampilkan pesan error di UI
          document.getElementById("product-info").innerHTML = `<p style="color:red;">Failed to load product data. Please check your internet connection or try again later.</p>`;
          updateTotalPrice(); 
      }
  }

  document.getElementById("increase-btn").addEventListener("click", () => {
      quantity++;
      quantityDisplay.textContent = quantity;
      updateTotalPrice(); 
  });

  document.getElementById("decrease-btn").addEventListener("click", () => {
      if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          updateTotalPrice(); 
      }
  });

  function saveCartToLocalStorage(cart) {
      localStorage.setItem("cart", JSON.stringify(cart));
  }

  function loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
  }

  addToCartButton.addEventListener("click", () => {
      const totalPrice = defaultPricePerItem * quantity;
      const cart = loadCartFromLocalStorage();
      const existingItem = cart.find(item => item.id === 1); 

      if (existingItem) {
          existingItem.quantity += quantity; 
      } else {
          cart.push({
              id: 1, 
              name: "MCR Sweater Brand Tomstory",
              price: defaultPricePerItem,
              quantity: quantity,
          });
      }

      saveCartToLocalStorage(cart); 
      alert(`Added ${quantity} items to the cart, total price: ${formatRupiah(totalPrice)}`);
  });

  document.getElementById("go-to-checkout").addEventListener("click", () => {
      window.location.href = 'checkout.html'; 
  });

  updateTotalPrice(); 
  await fetchProductData(); 
});

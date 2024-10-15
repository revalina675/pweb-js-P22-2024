document.addEventListener("DOMContentLoaded", async () => {
  let quantity = 1;
  const defaultPricePerItem = 290000;
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

  async function fetchProductData() {
      try {
          const response = await fetch("https://dummyjson.com/products/4");
          const product = await response.json();
          document.querySelector(".stars").textContent = "★★★★★";
          updateTotalPrice();
      } catch (error) {
          console.error("Error fetching product data:", error);
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
      const existingItem = cart.find(item => item.id === 4);

      if (existingItem) {
          existingItem.quantity += quantity;
      } else {
          cart.push({
              id: 4,
              name: "BMTH Jacket Modern Basic Casual",
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

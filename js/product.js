document.addEventListener("DOMContentLoaded", function () {
  const categoryButtons = document.querySelectorAll(".category-button");
  const productItems = document.querySelectorAll(".product-item");
  let currentCategory = "all"; // Track active category
  let cart = []; // Cart to store added products

  // Event listener for category filtering
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      currentCategory = category;

      filterProducts(category);

      // Highlight the active button
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });

  // Add event listener to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.productId;
      const productPrice = parseFloat(button.dataset.price);

      // Add product to cart
      cart.push({ id: productId, price: productPrice });

      // Update checkout summary
      updateCheckout();
    });
  });

  // Function to filter products
  function filterProducts(category) {
    productItems.forEach((item) => {
      if (category === "all" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    updateItemsPerCategory();
  }

  // Function to update visible items
  function updateItemsPerCategory() {
    const selectedCount = document.getElementById("itemsCount").value;
    let visibleCount =
      selectedCount === "all" ? productItems.length : parseInt(selectedCount);

    let filteredItems = [...productItems].filter(
      (item) => currentCategory === "all" || item.dataset.category === currentCategory
    );

    filteredItems.forEach((item, index) => {
      if (index < visibleCount) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  // Function to update checkout summary
  function updateCheckout() {
    const totalProducts = cart.length;
    const totalPrice = cart.reduce((acc, product) => acc + product.price, 0);

    document.getElementById("totalProducts").innerText = totalProducts;
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
  }

  // Fetch API data with error handling
  async function fetchDataFromAPI() {
    try {
      const response = await fetch("https://api.example.com/products");
      if (!response.ok) {
        throw new Error("Failed to fetch data from the API");
      }
      const data = await response.json();
      // Process data here
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("There was a problem fetching the product data. Please try again later.");
    }
  }

  fetchDataFromAPI();
});

document.addEventListener('DOMContentLoaded', function () {
    const categoryButtons = document.querySelectorAll('.category-button');
    const productItems = document.querySelectorAll('.product-item');
  
    categoryButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Filter products based on category
        productItems.forEach((item) => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
        
        // Highlight the active button
        categoryButtons.forEach((btn) => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  });
  
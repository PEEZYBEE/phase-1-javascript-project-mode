document.addEventListener('DOMContentLoaded', () => {
  const productContainer = document.getElementById('product-container');
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  const searchInput = document.getElementById('searchInput');
  const toggleThemeBtn = document.getElementById('toggleTheme');
  let currentPage = 1;

  // Fetch products from API
  async function fetchProducts(page = 1) {
      const res = await fetch(`https://fakestoreapi.com/products?limit=5&page=${page}`);
      const products = await res.json();

      products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('product-card');
          productCard.innerHTML = `
              <img src="${product.image}" alt="${product.title}">
              <h3>${product.title}</h3>
              <p>$${product.price}</p>
              <button>Buy Now</button>
          `;
          productContainer.appendChild(productCard);
      });
  }

  // Load more products
  loadMoreBtn.addEventListener('click', () => {
      currentPage++;
      fetchProducts(currentPage);
  });

  // Search functionality
  searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      const productCards = document.querySelectorAll('.product-card');
      productCards.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          card.style.display = title.includes(query) ? 'block' : 'none';
      });
  });

  // Toggle dark/light mode
  toggleThemeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
  });

  // Initial product fetch
  fetchProducts(currentPage);
});

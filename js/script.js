document.addEventListener('DOMContentLoaded', () => {
  // === Search Bar Functionality ===
  const searchTrigger = document.getElementById('search-trigger');
  const searchBox = document.getElementById('search-box');
  const closeSearch = document.getElementById('close-search');
  const navbar = document.getElementById('navbar');
  const searchContent = document.querySelector('.search-content');

  function closeSearchBox() {
    if (searchBox && navbar) {
      searchBox.style.display = 'none';
      navbar.classList.remove('hidden');
    }
  }

  if (searchTrigger && searchBox && closeSearch && navbar && searchContent) {
    searchTrigger.addEventListener('click', () => {
      navbar.classList.add('hidden');
      searchBox.style.display = 'block';
    });

    closeSearch.addEventListener('click', closeSearchBox);

    document.addEventListener('click', function (event) {
      if (
        searchBox.style.display === 'block' &&
        !searchContent.contains(event.target) &&
        !searchTrigger.contains(event.target)
      ) {
        closeSearchBox();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && searchBox.style.display === 'block') {
        closeSearchBox();
      }
    });
  }

  // === Hero Image Auto Slide ===
  const images = document.querySelectorAll('.hero-image');
  let current = 0;

  if (images.length > 0) {
    setInterval(() => {
      const prev = images[current];
      prev.classList.remove('active');
      prev.classList.add('exit-left');

      current = (current + 1) % images.length;
      const next = images[current];

      next.classList.remove('exit-left');
      next.classList.add('active');

      setTimeout(() => {
        prev.classList.remove('exit-left');
      }, 1000);
    }, 3000);
  }

  // === Horizontal Scroll Section ===
  const container = document.getElementById("collectionContainer");
  const leftBtn = document.getElementById("leftBtn");
  const rightBtn = document.getElementById("rightBtn");

  if (container && leftBtn && rightBtn) {
    leftBtn.onclick = () => container.scrollBy({ left: -400, behavior: "smooth" });
    rightBtn.onclick = () => container.scrollBy({ left: 400, behavior: "smooth" });
  }

  // === Dropdown & Filters ===
  const dropdownButtons = document.querySelectorAll('.dropdown-btn');
  dropdownButtons.forEach(function (button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('.dropdown-icon');
    content?.classList.remove('hidden');
    icon?.classList.add('rotate-180');

    button.addEventListener('click', () => {
      content?.classList.toggle('hidden');
      icon?.classList.toggle('rotate-180');
    });
  });

  document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
      console.log(`Selected radio: ${radio.value}`);
    });
  });

  document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      const label = checkbox.parentElement?.textContent?.trim();
      console.log(`${checkbox.checked ? 'Checked' : 'Unchecked'}: ${label}`);
    });
  });

  // === Submenu Toggles ===
  const submenuToggles = [
    { checkbox: '.fragrance-checkbox', submenu: '.fragrance-submenu' },
    { checkbox: '.warth-checkbox', submenu: '.warth-submenu' },
    { checkbox: '.source-checkbox', submenu: '.source-submenu' }
  ];

  submenuToggles.forEach(({ checkbox, submenu }) => {
    const checkEl = document.querySelector(checkbox);
    const subEl = document.querySelector(submenu);
    checkEl?.addEventListener('change', () => {
      subEl?.classList.toggle('hidden', !checkEl.checked);
    });
  });

  // === Timeline Animation ===
  const workshops = [
    { title: "Intro Workshop", brief: "Basics of electronics", date: "2025-08-01", image: "file.jpg", link: "#" },
    { title: "IoT Bootcamp", brief: "Connecting devices online", date: "2025-08-05", image: "file.jpg", link: "#" },
    { title: "AI Workshop", brief: "ML with microcontrollers", date: "2025-08-10", image: "file.jpg", link: "#" },
    { title: "Robotics Lab", brief: "Build your first bot", date: "2025-08-15", image: "file.jpg", link: "#" },
    { title: "Hackathon", brief: "Apply your skills", date: "2025-08-20", image: "file.jpg", link: "#" }
  ];

  const path = document.getElementById("curvePath");
  const svg = document.getElementById("svg");
  const dotsContainer = document.getElementById("dotsContainer");
  const popup = document.getElementById("popup");

  if (path && svg && dotsContainer && popup) {
    const pathLength = path.getTotalLength();
    const dotSpacing = pathLength / (workshops.length + 1);
    const dotElements = [];
    const triggered = new Set();
    let offset = 0, paused = false, speed = 0.6;

    workshops.forEach(() => {
      const dot = document.createElement("div");
      dot.className = "dot";
      dotsContainer.appendChild(dot);
      dotElements.push(dot);
    });

    function animateDots() {
      const containerRect = dotsContainer.getBoundingClientRect();
      const scaleX = svg.clientWidth / 1200;
      const scaleY = svg.clientHeight / 200;
      const centerX = containerRect.left + containerRect.width / 2;

      dotElements.forEach((dot, i) => {
        const dist = (offset + i * dotSpacing) % pathLength;
        const point = path.getPointAtLength(dist);
        const localX = point.x * scaleX;
        const localY = point.y * scaleY;

        dot.style.left = `${localX - 8}px`;
        dot.style.top = `${localY - 8}px`;

        const screenX = localX + containerRect.left;

        if (!triggered.has(i) && Math.abs(screenX - centerX) < 5 && !paused) {
          triggered.add(i);
          showPopup(i, localX, localY);
        }
      });

      if (!paused) {
        offset += speed;
        if (offset > pathLength) {
          offset = 0;
          triggered.clear();
        }
      }

      requestAnimationFrame(animateDots);
    }

    function showPopup(index, x, y) {
      const data = workshops[index];
      popup.style.backgroundImage = `url('${data.image}')`;
      popup.innerHTML = `
                <div class="absolute inset-0 bg-white/5 text-white flex flex-col items-center justify-center p-4 space-y-3 text-center">
                    <div>
                        <h2 class="text-3xl font-bold mb-4">${data.title}</h2>
                        <p class="text-2xl mb-4">${data.date}</p>
                    </div>
                    <a href="${data.link}" class="inline-block bg-blue-500 hover:bg-blue-600 px-3 py-2 rounded text-2xl">
                        Know More
                    </a>
                </div>
            `;

      const popupW = 416, popupH = 320;
      popup.style.left = `${x - popupW / 2}px`;
      popup.style.top = `${y - popupH - 10}px`;
      popup.classList.remove("hidden");

      paused = true;
      setTimeout(() => {
        popup.classList.add("hidden");
        paused = false;
      }, 3000);
    }

    requestAnimationFrame(animateDots);
  }

  // === Shopping Cart Logic ===
  let cartItemsList = [], subtotal = 0;

  function openCart() {
    document.getElementById('carts').style.right = '0';
    document.getElementById('overlay').style.display = 'block';
  }

  function closeCart() {
    document.getElementById('carts').style.right = '-450px';
    document.getElementById('overlay').style.display = 'none';
  }

  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cartItemsList.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
<img src="${item.image}" alt="Product Image" style="width: 120px; height: 130px; object-fit: cover;">
                <div class="details" style="font-size: 1.1rem;">
                    <div style="font-size: 1.5rem; font-weight: 600;">${item.name}</div>
                    <div style="font-size: 1.2rem; font-weight: 300;">${item.desc}</div>
                    <div style="font-size: 1.1rem;">${item.unit}</div>
                    <div class="unit-price" style="font-size: 1.1rem;">
                        <span><strong>Qty:</strong> ${item.quantity}</span>
                        <span class="subtotal-price" style="font-weight: bold;">₹${item.totalPrice}</span>
                    </div>
                </div>
            `;
      cartItems.appendChild(div);
    });
  }

  function updateSubtotal() {
    subtotal = cartItemsList.reduce((acc, item) => acc + item.totalPrice, 0);
    document.getElementById('subtotal').innerHTML = `₹${subtotal}`;
  }

  function handleAddToCart(event) {
    event.preventDefault();
    const card = this.closest('.relative');
    const name = card.querySelector('.product-name')?.textContent?.trim();
    const desc = card.querySelector('.product-desc')?.textContent?.trim();
    const price = parseInt(card.querySelector('.product-price')?.textContent.replace(/[^\d]/g, ''));
    const image = card.querySelector('.product-image')?.getAttribute('src');
    const unit = card.querySelector('.product-unit')?.textContent?.trim() || '1 pc';
    const existing = cartItemsList.find(p => p.name === name);
    if (existing) {
      existing.quantity += 1;
      existing.totalPrice = existing.quantity * existing.price;
    } else {
      cartItemsList.push({ name, desc, price, unit, image, quantity: 1, totalPrice: price });
    }
    updateCart();
    updateSubtotal();
    openCart();
  }

  function attachAddToCartEvents() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.removeEventListener('click', handleAddToCart);
      btn.addEventListener('click', handleAddToCart);
    });
  }

  attachAddToCartEvents();

  document.getElementById('continueShopping')?.addEventListener('click', closeCart);
  document.getElementById('closeCart')?.addEventListener('click', closeCart);
  document.getElementById('cart-icon')?.addEventListener('click', () => {
    console.log("Cart icon clicked");
    openCart();
  });


  // === Load More Products ===
  const productGrid = document.getElementById('product-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  const newProductsHTML = `
    <!-- Product Card 1 -->
  <div class="block">
    <div class="relative p-4 group transition duration-130 border border-transparent hover:border-black">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">♡</button>

      <!-- Product clickable area wrapped in <a> -->
      <a href="productDetailPage.html" class="block cursor-pointer">
        <img src="images/product/file.jpg" alt="New Product" class="product-image w-full h-64 object-contain" />
        <div class="text-center mt-4 group-hover:border-t-2 group-hover:border-black text-2xl">
          <h4 class="product-name font-bold tracking-wide">New Product</h4>
          <p class="product-desc text-xl text-gray-600">Extra Fresh Fragrance</p>
          <p class="product-price font-semibold mt-1">₹299</p>
        </div>
      </a>

      <!-- Add to Cart Button -->
      <button class="mt-4 w-full bg-black text-white py-2 text-xl font-semibold uppercase tracking-wide hidden group-hover:block add-to-cart-btn">
        Add To Cart
      </button>
    </div>
  </div>
  
      <!-- Product Card 2 -->
  <div class="block">
    <div class="relative p-4 group transition duration-130 border border-transparent hover:border-black">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">♡</button>

      <!-- Product clickable area wrapped in <a> -->
      <a href="productDetailPage.html" class="block cursor-pointer">
        <img src="images/product/file.jpg" alt="New Product" class="product-image w-full h-64 object-contain" />
        <div class="text-center mt-4 group-hover:border-t-2 group-hover:border-black text-2xl">
          <h4 class="product-name font-bold tracking-wide">New Product</h4>
          <p class="product-desc text-xl text-gray-600">Extra Fresh Fragrance</p>
          <p class="product-price font-semibold mt-1">₹299</p>
        </div>
      </a>

      <!-- Add to Cart Button -->
      <button class="mt-4 w-full bg-black text-white py-2 text-xl font-semibold uppercase tracking-wide hidden group-hover:block add-to-cart-btn">
        Add To Cart
      </button>
    </div>
  </div>

      <!-- Product Card 3 -->
  <div class="block">
    <div class="relative p-4 group transition duration-130 border border-transparent hover:border-black">
      <button class="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl">♡</button>

      <!-- Product clickable area wrapped in <a> -->
      <a href="productDetailPage.html" class="block cursor-pointer">
        <img src="images/product/file.jpg" alt="New Product" class="product-image w-full h-64 object-contain" />
        <div class="text-center mt-4 group-hover:border-t-2 group-hover:border-black text-2xl">
          <h4 class="product-name font-bold tracking-wide">New Product</h4>
          <p class="product-desc text-xl text-gray-600">Extra Fresh Fragrance</p>
          <p class="product-price font-semibold mt-1">₹299</p>
        </div>
      </a>

      <!-- Add to Cart Button -->
      <button class="mt-4 w-full bg-black text-white py-2 text-xl font-semibold uppercase tracking-wide hidden group-hover:block add-to-cart-btn">
        Add To Cart
      </button>
    </div>
  </div>
  `;

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
      productGrid.insertAdjacentHTML('beforeend', newProductsHTML);
      attachAddToCartEvents();

      // ✅ Hide the button and show message below it
      const message = document.createElement('p');
      message.textContent = "No more products";
      message.style.textAlign = 'center';
      message.style.fontSize = '1.2rem';
      message.style.marginTop = '1rem';
      message.style.color = 'gray';

      loadMoreBtn.parentElement.appendChild(message); // Add after button
      loadMoreBtn.style.display = 'none'; // Hide button
    });
  }

  // More Blogs Button
  const blogGrid = document.getElementById('blog-grid');
  const moreBlogsBtn = document.getElementById('more-blogs-btn');

  const newBlogsHTML = `
    <!-- Blog 1 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Making Atra" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">The Art of Making Atra</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Atra crafting is an ancient art form that combines nature and science...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>

    <!-- Blog 2 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Luxury Scents" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">Secrets of Luxury Scents</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Discover how premium ingredients elevate the fragrance to a new level...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>

    <!-- Blog 3 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Aromatic Journey" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">An Aromatic Journey</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Travel through time and culture with scents that define tradition...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>
  `;

  if (moreBlogsBtn) {
    moreBlogsBtn.addEventListener('click', () => {
      blogGrid.insertAdjacentHTML('beforeend', newBlogsHTML);

      // ✅ Hide the button and show a message
      const message = document.createElement('p');
      message.textContent = "No more blogs";
      message.style.textAlign = 'center';
      message.style.fontSize = '1.2rem';
      message.style.marginTop = '1rem';
      message.style.color = 'gray';

      moreBlogsBtn.parentElement.appendChild(message);
      moreBlogsBtn.style.display = 'none';
    });
  }

  // More Workshops Button
  const workshopGrid = document.getElementById('workshop-grid');
  const moreWorkshopsBtn = document.getElementById('more-workshops-btn');

  const newWorkshopsHTML = `
    <!-- Blog 1 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Making Atra" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">The Art of Making Atra</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Atra crafting is an ancient art form that combines nature and science...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>

    <!-- Blog 2 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Luxury Scents" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">Secrets of Luxury Scents</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Discover how premium ingredients elevate the fragrance to a new level...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>

    <!-- Blog 3 -->
    <div onclick="window.location.href='blogDetailPage.html';" class="cursor-pointer">
    <div class="bg-white text-black rounded shadow overflow-hidden">
      <img src="images/home/istockphoto-1452925414-612x612.jpg" alt="Aromatic Journey" class="w-full h-48 object-cover">
      <div class="p-6">
        <h3 class="text-3xl font-semibold mb-2">An Aromatic Journey</h3>
        <p class="text-xl mb-2">
          <span class="truncate-text">Travel through time and culture with scents that define tradition...</span>
        </p>
        <a href="blogDetailPage.html" class="text-purple-700 hover:underline text-xl">Read more</a>
      </div>
    </div>
    </div>
  `;

  if (moreWorkshopsBtn) {
    moreWorkshopsBtn.addEventListener('click', () => {
      workshopGrid.insertAdjacentHTML('beforeend', newWorkshopsHTML);

      // ✅ Hide the button and show a message
      const message = document.createElement('p');
      message.textContent = "No more blogs";
      message.style.textAlign = 'center';
      message.style.fontSize = '1.2rem';
      message.style.marginTop = '1rem';
      message.style.color = 'gray';

      moreWorkshopsBtn.parentElement.appendChild(message);
      moreWorkshopsBtn.style.display = 'none';
    });
  }

  // productDetailPage.js
  // === Main Image Change Function ===
  // Change main image on thumbnail click
  window.changeImage = function (thumbnail) {
    const mainImage = document.getElementById('main-image');
    if (mainImage && thumbnail) {
      mainImage.src = thumbnail.src;
      mainImage.alt = thumbnail.alt;
    }
  };

  // Make function global by attaching to window
  window.scrollThumbnails = function (direction) {
    const scrollWrapper = document.getElementById('thumbnailScrollWrapper');
    const scrollAmount = 120;

    if (scrollWrapper) {
      scrollWrapper.scrollBy({
        top: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  }
});

// === Global Cart Control Functions (accessible from anywhere) ===
document.addEventListener('DOMContentLoaded', () => {
  let cartItemsList = [], subtotal = 0;
  let isCartIconClick = false;

  // === Load Cart UI Dynamically ===
  function loadCartUI() {
    fetch('shoppingCart.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('cart-container').innerHTML = html;

        // Attach Event Listeners after HTML is loaded
        document.getElementById('continueShopping')?.addEventListener('click', closeCart);
        document.getElementById('closeCart')?.addEventListener('click', closeCart);

        updateCart();
        updateSubtotal();
        attachAddToCartEvents();
      });
  }

  // === Open Cart Sidebar ===
  function openCart() {
    document.getElementById('carts').style.right = '0';
    document.getElementById('overlay').style.display = 'block';

    const emptyMsg = document.getElementById('cart-empty-message');
    const subtotalContainer = document.getElementById('subtotal-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItemsList.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (subtotalContainer) subtotalContainer.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      if (subtotalContainer) subtotalContainer.style.display = 'block';
      if (checkoutBtn) checkoutBtn.style.display = 'block';
    }

    isCartIconClick = false;
  }

  // === Close Cart Sidebar ===
  function closeCart() {
    document.getElementById('carts').style.right = '-450px';
    document.getElementById('overlay').style.display = 'none';
  }

  // === Update Cart Items ===
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = '';

    cartItemsList.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="Product Image" style="width: 120px; height: 130px; object-fit: cover;">
        <div class="details" style="font-size: 1.1rem;">
            <div style="font-size: 1.5rem; font-weight: 600;">${item.name}</div>
            <div style="font-size: 1.2rem; font-weight: 300;">${item.desc}</div>
            <div style="font-size: 1.1rem;">${item.unit}</div>
            <div class="unit-price" style="font-size: 1.1rem;">
                <span><strong>Qty:</strong> ${item.quantity}</span>
                <span class="subtotal-price" style="font-weight: bold;">₹${item.totalPrice}</span>
            </div>
        </div>`;
      cartItems.appendChild(div);
    });

    // Show/hide based on cart contents
    const emptyMsg = document.getElementById('cart-empty-message');
    const subtotalContainer = document.getElementById('subtotal-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItemsList.length === 0) {
      if (emptyMsg) emptyMsg.style.display = 'block';
      if (subtotalContainer) subtotalContainer.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      if (subtotalContainer) subtotalContainer.style.display = 'block';
      if (checkoutBtn) checkoutBtn.style.display = 'block';
    }
  }

  // === Update Subtotal and Visibility ===
  function updateSubtotal() {
    subtotal = cartItemsList.reduce((acc, item) => acc + item.totalPrice, 0);
    const subtotalSpan = document.getElementById('subtotal');
    if (subtotalSpan) subtotalSpan.innerHTML = `₹${subtotal}`;

    const subtotalContainer = document.getElementById('subtotal-container');
    const checkoutBtn = document.getElementById('checkout-btn');
    const emptyMsg = document.getElementById('cart-empty-message');

    if (cartItemsList.length === 0) {
      if (subtotalContainer) subtotalContainer.style.display = 'none';
      if (checkoutBtn) checkoutBtn.style.display = 'none';
      if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
      if (subtotalContainer) subtotalContainer.style.display = 'block';
      if (checkoutBtn) checkoutBtn.style.display = 'block';
      if (emptyMsg) emptyMsg.style.display = 'none';
    }
  }

  // === Handle Add to Cart ===
  function handleAddToCart(event) {
    event.preventDefault();
    const card = this.closest('.relative');
    const name = card.querySelector('.product-name')?.textContent?.trim();
    const desc = card.querySelector('.product-desc')?.textContent?.trim();
    const price = parseInt(card.querySelector('.product-price')?.textContent.replace(/[^\d]/g, ''));
    const image = card.querySelector('.product-image')?.getAttribute('src');
    const unit = card.querySelector('.product-unit')?.textContent?.trim() || '1 pc';

    const existing = cartItemsList.find(p => p.name === name);
    if (existing) {
      existing.quantity += 1;
      existing.totalPrice = existing.quantity * existing.price;
    } else {
      cartItemsList.push({ name, desc, price, unit, image, quantity: 1, totalPrice: price });
    }

    updateCart();
    updateSubtotal();
    openCart();
  }

  // === Attach "Add to Cart" Events ===
  function attachAddToCartEvents() {
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.removeEventListener('click', handleAddToCart);
      btn.addEventListener('click', handleAddToCart);
    });
  }

  // === Initial Setup ===
  loadCartUI();

  // === Cart Icon Click Events ===
  document.getElementById('cart-icon')?.addEventListener('click', () => {
    isCartIconClick = true;
    openCart();
  });

  document.getElementById('cart-svg-icon')?.addEventListener('click', () => {
    isCartIconClick = true;
    openCart();
  });
});

// Choose Multiple Units Functionality
document.addEventListener("DOMContentLoaded", function () {
  const sizeOptions = document.querySelectorAll('.size-option');
  const quantityInput = document.getElementById('quantity');
  const chooseMultipleButton = document.getElementById('choose-multiple-size');
  const multipleSizesContainer = document.getElementById('multiple-sizes-container');
  const selectedSizesList = document.getElementById('selected-sizes-list');
  const addToBagButton = document.getElementById('add-to-bag');

  let selectedSizes = [];
  let allowMultiple = false;

  const decreaseBtn = document.getElementById('decrease');
  const increaseBtn = document.getElementById('increase');

  if (!decreaseBtn || !increaseBtn) {
    console.error("Error: Quantity buttons are missing.");
    return;
  }

  decreaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      updateSelectedSizesList();
    }
  });

  increaseBtn.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
    updateSelectedSizesList();
  });

  quantityInput.addEventListener('input', (e) => {
    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) {
      e.target.value = 1;
    }
    updateSelectedSizesList();
  });

  chooseMultipleButton.addEventListener('click', () => {
    allowMultiple = true;
    multipleSizesContainer.style.display = 'block';

    // Highlight the "Choose Multiple Size" button
    chooseMultipleButton.classList.add('active-multi');
    chooseMultipleButton.classList.remove('selected');

    sizeOptions.forEach(option => {
      option.classList.remove('disabled');
      option.style.opacity = 1;
    });
  });

  sizeOptions.forEach(option => {
    option.addEventListener('click', () => {
      const size = option.textContent.trim();
      const quantity = parseInt(quantityInput.value) || 1;

      if (option.id === "choose-multiple-size") {
        option.classList.remove('selected');
        return;
      }

      if (!allowMultiple) {
        // Single size mode
        selectedSizes = [{ size, quantity }];
        sizeOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');

        // 🔒 Hide multiple size container
        multipleSizesContainer.style.display = 'none';
      } else {
        // Multiple size mode
        const existingSize = selectedSizes.find(item => item.size === size);
        if (existingSize) {
          existingSize.quantity = quantity;
        } else {
          selectedSizes.push({ size, quantity });
          option.classList.add('selected');
        }

        // ✅ Show container (just in case)
        multipleSizesContainer.style.display = 'block';
      }

      updateSelectedSizesList();
      quantityInput.value = 1;
    });
  });

  function updateSelectedSizesList() {
    selectedSizesList.innerHTML = '';

    if (selectedSizes.length > 0) {
      // Create heading row
      const header = document.createElement('li');
      header.innerHTML = `
      <div style="display: flex; justify-content: space-between; font-weight: bold; margin-bottom: 5px; font-size: 22px;">
        <span style="width: 50%;">Unit</span>
        <span style="width: 50%;">Quantity</span>
      </div>
    `;
      selectedSizesList.appendChild(header);

      // Add unit and quantity rows
      selectedSizes.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <span style="width: 50%;">${item.size}</span>
          <span style="width: 50%;">${item.quantity}</span>
        </div>
      `;
        selectedSizesList.appendChild(listItem);
      });
    }
  }


  addToBagButton.addEventListener('click', () => {
    console.log("Adding selected sizes to the bag:", selectedSizes);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  let cartItemsList = [], subtotal = 0;

  // === Load Cart UI Dynamically ===
  function loadCartUI() {
    fetch('shoppingCart.html')
      .then(res => res.text())
      .then(html => {
        document.getElementById('cart-container').innerHTML = html;

        // Attach Event Listeners after HTML is loaded
        document.getElementById('continueShopping')?.addEventListener('click', closeCart);
        document.getElementById('closeCart')?.addEventListener('click', closeCart);

        updateCart();
        updateSubtotal();
        attachAddToCartEvents();
      });
  }
  // === Open Cart Sidebar ===
  function openCart() {
    document.getElementById('carts').style.right = '0';
    document.getElementById('overlay').style.display = 'block';

    const emptyMsg = document.getElementById('cart-empty-message');
    const subtotalContainer = document.getElementById('subtotal-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItemsList.length === 0) {
      emptyMsg?.style.setProperty("display", "block");
      subtotalContainer?.style.setProperty("display", "none");
      checkoutBtn?.style.setProperty("display", "none");
    } else {
      emptyMsg?.style.setProperty("display", "none");
      subtotalContainer?.style.setProperty("display", "block");
      checkoutBtn?.style.setProperty("display", "block");
    }
  }

  // === Close Cart Sidebar ===
  function closeCart() {
    document.getElementById('carts').style.right = '-450px';
    document.getElementById('overlay').style.display = 'none';
  }

  // === Update Subtotal ===
  function updateSubtotal() {
    subtotal = cartItemsList.reduce((acc, item) => acc + item.totalPrice, 0);
    document.getElementById('subtotal').innerHTML = `₹${subtotal}`;
  }

  // === Render Cart Items ===
  function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (!cartItems) return;

    cartItems.innerHTML = '';

    cartItemsList.forEach(item => {
      const div = document.createElement('div');
      div.className = 'cart-item';
      div.innerHTML = `
        <img src="${item.image}" alt="Product Image" style="width: 120px; height: 130px; object-fit: cover;">
        <div class="details" style="font-size: 1.1rem;">
          <div style="font-size: 1.5rem; font-weight: 600;">${item.name}</div>
          <div style="font-size: 1.2rem; font-weight: 300;">${item.desc}</div>
          <div style="font-size: 1.1rem;">${item.unit}</div>
          <div class="unit-price" style="font-size: 1.1rem;">
            <span><strong>Qty:</strong> ${item.quantity}</span>
            <span class="subtotal-price" style="font-weight: bold;">₹${item.totalPrice}</span>
          </div>
        </div>`;
      cartItems.appendChild(div);
    });

    // Handle visibility
    const emptyMsg = document.getElementById('cart-empty-message');
    const subtotalContainer = document.getElementById('subtotal-container');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cartItemsList.length === 0) {
      emptyMsg?.style.setProperty("display", "block");
      subtotalContainer?.style.setProperty("display", "none");
      checkoutBtn?.style.setProperty("display", "none");
    } else {
      emptyMsg?.style.setProperty("display", "none");
      subtotalContainer?.style.setProperty("display", "block");
      checkoutBtn?.style.setProperty("display", "block");
    }
  }

  // === Handle Add to Cart from Detail Page ===
  function handleAddToCart(event) {
    event.preventDefault();

    const name = document.querySelector('.product-title')?.textContent?.trim() || 'Product';
    const desc = document.querySelector('.description-text')?.textContent?.trim() || '';
    const image = document.getElementById('main-image')?.getAttribute('src') || '';
    const unit = document.querySelector('.size-option.selected')?.getAttribute('data-size') || 'Default Unit';
    const quantity = parseInt(document.getElementById('quantity')?.value || '1', 10);
    const priceText = document.querySelector('.price-range')?.textContent || '₹0';
    const price = parseInt(priceText.replace(/[^\d]/g, ''), 10) || 0;

    if (!image || !name || price === 0) {
      alert("Missing product information.");
      return;
    }

    const existingItem = cartItemsList.find(item => item.name === name && item.unit === unit);
    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.price;
    } else {
      cartItemsList.push({
        name,
        desc,
        unit,
        image,
        quantity,
        price,
        totalPrice: quantity * price
      });
    }

    updateCart();
    updateSubtotal();
    openCart();
  }

  // === Attach Listeners ===
  function attachEvents() {
    document.getElementById('detailAddToCartBtn')?.addEventListener('click', handleAddToCart);
    document.getElementById('closeCart')?.addEventListener('click', closeCart);
    document.getElementById('overlay')?.addEventListener('click', closeCart);
    document.getElementById('cart-icon')?.addEventListener('click', openCart);
    document.getElementById('cart-svg-icon')?.addEventListener('click', openCart);
  }

  attachEvents();
});

document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll(".accordion");

  accordions.forEach((accordion) => {
    accordion.addEventListener("click", function () {
      // Toggle active class
      this.classList.toggle("active");

      // Arrow rotate
      const arrow = this.querySelector(".arrow");
      if (arrow) {
        arrow.classList.toggle("rotate");
      }

      // Toggle panel
      const panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  });

  // =============== 'More Details' button triggers first accordion ================
  const readMoreBtn = document.getElementById("readMoreBtn");

  if (readMoreBtn) {
    readMoreBtn.addEventListener("click", () => {
      const descriptionButton = document.querySelector(".accordion");

      const panel = descriptionButton.nextElementSibling;
      const isOpen = panel.style.display === "block";

      if (!isOpen) {
        descriptionButton.click(); // triggers open including arrow rotate
      }

      descriptionButton.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('reviewModal');
  const writeReviewBtn = document.getElementById('writeReviewBtn');
  const closeModal = document.getElementById('closeModal');
  const submitReview = document.getElementById('submitReview');
  const reviewList = document.getElementById('reviewList');
  const reviewMessage = document.getElementById('reviewMessage');
  const starRating = document.getElementById('starRating');
  let selectedRating = 0;

  // Load existing reviews
  loadReviews();

  // Open modal
  writeReviewBtn.onclick = () => {
    modal.style.display = 'flex';
    reviewMessage.value = '';
    selectedRating = 0;
    updateStars();
  };

  // Close modal
  closeModal.onclick = () => {
    modal.style.display = 'none';
  };

  // Star rating selection
  starRating.querySelectorAll('span').forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = parseInt(star.getAttribute('data-star'));
      updateStars();
    });
  });

  function updateStars() {
    starRating.querySelectorAll('span').forEach(star => {
      const val = parseInt(star.getAttribute('data-star'));
      star.classList.toggle('selected', val <= selectedRating);
    });
  }

  // Submit review
  submitReview.onclick = () => {
    const message = reviewMessage.value.trim();
    if (!message || selectedRating === 0) {
      alert("Please enter a review and select a rating.");
      return;
    }

    const newReview = {
      message,
      rating: selectedRating,
      timestamp: new Date().toISOString()
    };

    let reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.unshift(newReview); // Add to top
    localStorage.setItem('reviews', JSON.stringify(reviews));
    modal.style.display = 'none';
    displayReviews(reviews);
  };

  function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    displayReviews(reviews);
  }

  function displayReviews(reviews) {
    reviewList.innerHTML = '';
    reviews.forEach(r => {
      const div = document.createElement('div');
      div.className = 'review';
      div.style.marginBottom = '30px';
      div.style.borderBottom = '1px solid #ccc';
      div.style.paddingBottom = '20px';

      // Format dates
      const reviewDate = new Date(r.timestamp);
      const displayDate = reviewDate.toLocaleDateString('en-US'); // e.g. MM/DD/YYYY

      // Optional: fake purchase date 3 days before
      const purchaseDate = new Date(reviewDate);
      purchaseDate.setDate(purchaseDate.getDate() - 3);
      const purchaseDisplay = purchaseDate.toLocaleDateString('en-US');

      div.innerHTML = `
      <div style="display: flex; justify-content: space-between;">
        <strong>Anonymous</strong>
        <span style="font-size: 14px;">${displayDate}</span>
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 14px; color: #222;">${r.message}</span>
        <span style="font-size: 18px;">${'★'.repeat(r.rating)}${'☆'.repeat(5 - r.rating)}</span>
      </div>
      <div style="font-size: 12px; color: gray; text-align: right;">Purchase date: ${purchaseDisplay}</div>
      <div style="font-size: 13px; margin-top: 5px;">Was this review helpful? <a href="#">Yes</a> <a href="#">No</a></div>
    `;
      reviewList.appendChild(div);
    });
  }

});

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop(); // Get current filename
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("text-purple-600", "font-bold");
    } else {
      link.classList.remove("text-purple-600", "font-bold");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // All reviews
  const allReviews = [
    {
      name: "LISA W",
      reviewDate: "06/30/2025",
      message: "Beautiful perfume, lasts ages and feels like a luxury to wear 🧡",
      rating: "★★★★★",
      purchaseDate: "06/25/2025"
    },
    {
      name: "HAYLEY C",
      reviewDate: "06/29/2025",
      message: "Amazing fragrance, will buy again!",
      rating: "★★★★★",
      purchaseDate: "06/24/2025"
    },
    {
      name: "EMMA G",
      reviewDate: "06/28/2025",
      message: "Love this scent. It's subtle and elegant.",
      rating: "★★★★☆",
      purchaseDate: "06/22/2025"
    },
    {
      name: "SOPHIA R",
      reviewDate: "06/27/2025",
      message: "Great packaging, smells divine!",
      rating: "★★★★★",
      purchaseDate: "06/21/2025"
    },
    {
      name: "AVA K",
      reviewDate: "06/26/2025",
      message: "A little strong at first but mellows out beautifully.",
      rating: "★★★★☆",
      purchaseDate: "06/20/2025"
    },
    {
      name: "ISLA D",
      reviewDate: "06/25/2025",
      message: "My go-to perfume for special occasions.",
      rating: "★★★★★",
      purchaseDate: "06/19/2025"
    }
  ];

  // Initial counters and DOM references
  let visibleCount = 0;
  const reviewsPerPage = 3;
  const reviewContainer = document.getElementById("reviewContainer");
  const viewMoreLink = document.getElementById("viewMoreLink");

  // Function to render a batch of reviews
  function renderReviews() {
    const nextReviews = allReviews.slice(visibleCount, visibleCount + reviewsPerPage);
    nextReviews.forEach(review => {
      const reviewHTML = `
      <div class="review" style="margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 20px;">
        <div style="display: flex; justify-content: space-between;">
            <strong>${review.name}</strong>
            <span style="font-size: 14px;">${review.reviewDate}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 14px; color: #222;">${review.message}</span>
            <span style="font-size: 18px;">${review.rating}</span>
        </div>
        <div style="font-size: 12px; color: gray; text-align: right;">Purchase date: ${review.purchaseDate}</div>
        <div style="font-size: 13px; margin-top: 5px;">Was this review helpful? <a href="#">Yes</a> <a href="#">No</a></div>
      </div>
    `;
      reviewContainer.insertAdjacentHTML('beforeend', reviewHTML);
    });

    visibleCount += reviewsPerPage;

    if (visibleCount >= allReviews.length) {
      // All reviews are now shown
      viewMoreLink.disabled = true;
      viewMoreLink.textContent = "No more reviews to show.";
      viewMoreLink.style.color = "gray";
      viewMoreLink.style.cursor = "default";
      viewMoreLink.style.textDecoration = "none";
    }
  }

  if (visibleCount >= allReviews.length) {
    viewMoreLink.style.display = "none"; // Hide the button
    document.getElementById("noMoreMessage").style.display = "block"; // Show message centered
  }

  // Load first set of reviews
  renderReviews();

  // Setup click handler
  viewMoreLink.addEventListener("click", function (e) {
    e.preventDefault();
    renderReviews();
  });
});

const slider = document.getElementById('slider');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
const pagination = document.getElementById('pagination');

let currentIndex = 0;

function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
  pagination.textContent = `${currentIndex + 1} / 2`;

  // Toggle arrows
  leftArrow.style.display = currentIndex === 0 ? 'none' : 'block';
  rightArrow.style.display = currentIndex === 1 ? 'none' : 'block';
}

rightArrow.addEventListener('click', () => {
  if (currentIndex < 1) {
    currentIndex++;
    updateSlider();
  }
});

leftArrow.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateSlider();
  }
});

// Initialize
updateSlider();

// CYOF
// ---------------------- Initialization ----------------------

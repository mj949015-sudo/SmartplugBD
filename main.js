// SmartPlugBD Main JavaScript File

// Configuration
const CONFIG = {
    whatsappNumber: '01521774083',
    bkashNumber: '01521774083',
    nagadNumber: '01521774083',
    bankAccount: '477720800381727',
    currency: '৳',
    usdToBdtRate: 120, // Global rate + 1 (assuming global rate is 119)
    showDualCurrency: true,
    primaryCurrency: 'BDT' // BDT or USD
};

// Global Variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let recentSearches = JSON.parse(localStorage.getItem('recentSearches')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let selectedPaymentMethod = null;

// Sample Products Data (In real app, this would come from backend)
const sampleProducts = [
    {
        id: 1,
        name: "Samsung Galaxy S23",
        price: 85000,
        originalPrice: 95000,
        image: "https://via.placeholder.com/300x200/007bff/ffffff?text=Samsung+S23",
        category: "Electronics",
        rating: 4.5,
        inStock: true,
        featured: true,
        description: "Latest Samsung Galaxy smartphone with advanced features"
    },
    {
        id: 2,
        name: "Nike Air Max",
        price: 12000,
        originalPrice: 15000,
        image: "https://via.placeholder.com/300x200/28a745/ffffff?text=Nike+Air+Max",
        category: "Fashion",
        rating: 4.3,
        inStock: true,
        featured: false,
        description: "Comfortable and stylish Nike Air Max sneakers"
    },
    {
        id: 3,
        name: "MacBook Pro M2",
        price: 180000,
        originalPrice: 200000,
        image: "https://via.placeholder.com/300x200/6f42c1/ffffff?text=MacBook+Pro",
        category: "Electronics",
        rating: 4.8,
        inStock: true,
        featured: true,
        description: "Powerful MacBook Pro with M2 chip for professionals"
    },
    {
        id: 4,
        name: "Adidas T-Shirt",
        price: 2500,
        originalPrice: 3000,
        image: "https://via.placeholder.com/300x200/dc3545/ffffff?text=Adidas+Shirt",
        category: "Fashion",
        rating: 4.1,
        inStock: true,
        featured: false,
        description: "Premium quality Adidas cotton t-shirt"
    },
    {
        id: 5,
        name: "Smart Watch",
        price: 8500,
        originalPrice: 10000,
        image: "https://via.placeholder.com/300x200/fd7e14/ffffff?text=Smart+Watch",
        category: "Electronics",
        rating: 4.2,
        inStock: true,
        featured: true,
        description: "Feature-rich smartwatch with health monitoring"
    },
    {
        id: 6,
        name: "Home Decor Set",
        price: 5500,
        originalPrice: 7000,
        image: "https://via.placeholder.com/300x200/20c997/ffffff?text=Home+Decor",
        category: "Home & Garden",
        rating: 4.0,
        inStock: true,
        featured: false,
        description: "Beautiful home decoration items set"
    },
    {
        id: 7,
        name: "Gaming Headset",
        price: 4500,
        originalPrice: 5500,
        image: "https://via.placeholder.com/300x200/e83e8c/ffffff?text=Gaming+Headset",
        category: "Electronics",
        rating: 4.4,
        inStock: true,
        featured: false,
        description: "High-quality gaming headset with surround sound"
    },
    {
        id: 8,
        name: "Yoga Mat",
        price: 1800,
        originalPrice: 2200,
        image: "https://via.placeholder.com/300x200/6610f2/ffffff?text=Yoga+Mat",
        category: "Sports",
        rating: 4.3,
        inStock: true,
        featured: false,
        description: "Premium non-slip yoga mat for fitness enthusiasts"
    },
    {
        id: 9,
        name: "Cookbook Collection",
        price: 3200,
        originalPrice: 4000,
        image: "https://via.placeholder.com/300x200/fd7e14/ffffff?text=Cookbook",
        category: "Books",
        rating: 4.6,
        inStock: true,
        featured: true,
        description: "Collection of international cuisine cookbooks"
    }
];

// Currency Conversion Functions
function convertUsdToBdt(usdAmount) {
    return Math.round(usdAmount * CONFIG.usdToBdtRate);
}

function convertBdtToUsd(bdtAmount) {
    return Math.round((bdtAmount / CONFIG.usdToBdtRate) * 100) / 100;
}

function formatPrice(amount, currency = 'BDT') {
    if (currency === 'USD') {
        return `$${amount.toFixed(2)}`;
    } else {
        return `${CONFIG.currency}${amount.toLocaleString()}`;
    }
}

function formatDualPrice(bdtAmount) {
    if (!CONFIG.showDualCurrency) {
        return formatPrice(bdtAmount, 'BDT');
    }
    
    const usdAmount = convertBdtToUsd(bdtAmount);
    
    if (CONFIG.primaryCurrency === 'USD') {
        return `${formatPrice(usdAmount, 'USD')} / ${formatPrice(bdtAmount, 'BDT')}`;
    } else {
        return `${formatPrice(bdtAmount, 'BDT')} / ${formatPrice(usdAmount, 'USD')}`;
    }
}

function toggleCurrency() {
    CONFIG.primaryCurrency = CONFIG.primaryCurrency === 'BDT' ? 'USD' : 'BDT';
    localStorage.setItem('primaryCurrency', CONFIG.primaryCurrency);
    loadProducts();
    loadCartItems();
}

// Load admin settings for currency
function loadAdminCurrencySettings() {
    const adminSettings = JSON.parse(localStorage.getItem('adminSettings'));
    if (adminSettings) {
        CONFIG.currency = adminSettings.currencySymbol || '৳';
        CONFIG.usdToBdtRate = adminSettings.usdToBdtRate || 120;
        CONFIG.showDualCurrency = adminSettings.showDualCurrency !== false;
        CONFIG.primaryCurrency = adminSettings.primaryCurrency || 'BDT';
    }
    
    // Load user's saved currency preference (overrides admin default)
    const savedCurrency = localStorage.getItem('primaryCurrency');
    if (savedCurrency) {
        CONFIG.primaryCurrency = savedCurrency;
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadAdminCurrencySettings();
    initializeTheme();
    
    loadProducts();
    updateCartCount();
    loadRecentSearches();
    loadUserProfile();
    setupEventListeners();
    addCurrencyToggle();
});

// Setup Event Listeners
function setupEventListeners() {
    // Search functionality
    document.getElementById('searchInput').addEventListener('input', handleSearch);
    
    // Close search suggestions when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.search-container')) {
            hideSearchSuggestions();
        }
    });
}

// Product Loading and Display
function loadProducts(productsToShow = sampleProducts) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-lg-4 col-md-6 col-sm-6 mb-4';
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    const isInWishlist = wishlist.some(item => item.id === product.id);
    
    col.innerHTML = `
        <div class="card product-card h-100 position-relative">
            ${discount > 0 ? `<div class="discount-badge">${discount}% OFF</div>` : ''}
            <button class="wishlist-btn ${isInWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id})">
                <i class="fas fa-heart"></i>
            </button>
            <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
            <div class="card-body d-flex flex-column">
                <h6 class="card-title">${product.name}</h6>
                <p class="card-text text-muted small flex-grow-1">${product.description}</p>
                <div class="rating mb-2">
                    ${generateStarRating(product.rating)}
                    <span class="ms-1 small text-muted">(${product.rating})</span>
                </div>
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                        <div class="product-price">${formatDualPrice(product.price)}</div>
                        ${product.originalPrice > product.price ? 
                            `<div class="product-original-price small">${formatDualPrice(product.originalPrice)}</div>` : ''}
                    </div>
                </div>
                <div class="d-flex gap-2">
                    <button class="btn btn-primary btn-sm flex-grow-1" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus me-1"></i>Add to Cart
                    </button>
                    <button class="btn btn-success btn-sm" onclick="buyNow(${product.id})">
                        <i class="fas fa-shopping-bag me-1"></i>Buy Now
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let stars = '';
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star empty"></i>';
    }
    
    return stars;
}

// Search Functionality
function handleSearch(e) {
    const query = e.target.value.toLowerCase().trim();
    
    if (query.length === 0) {
        hideSearchSuggestions();
        loadProducts();
        return;
    }
    
    if (query.length >= 2) {
        showSearchSuggestions(query);
        searchProducts();
    }
}

function searchProducts() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    
    if (query === '') {
        loadProducts();
        return;
    }
    
    const filteredProducts = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    
    loadProducts(filteredProducts);
    
    // Add to recent searches
    if (query && !recentSearches.includes(query)) {
        recentSearches.unshift(query);
        if (recentSearches.length > 5) {
            recentSearches.pop();
        }
        localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
        loadRecentSearches();
    }
}

function showSearchSuggestions(query) {
    const suggestions = sampleProducts
        .filter(product => product.name.toLowerCase().includes(query))
        .slice(0, 5)
        .map(product => product.name);
    
    const suggestionsContainer = document.getElementById('searchSuggestions');
    
    if (suggestions.length > 0) {
        suggestionsContainer.innerHTML = suggestions
            .map(suggestion => `<div class="search-suggestion-item" onclick="selectSuggestion('${suggestion}')">${suggestion}</div>`)
            .join('');
        suggestionsContainer.style.display = 'block';
    } else {
        hideSearchSuggestions();
    }
}

function selectSuggestion(suggestion) {
    document.getElementById('searchInput').value = suggestion;
    hideSearchSuggestions();
    searchProducts();
}

function hideSearchSuggestions() {
    document.getElementById('searchSuggestions').style.display = 'none';
}

// Cart Functionality
function addToCart(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showAlert('Product added to cart!', 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCartItems();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

function toggleCart() {
    loadCartItems();
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function loadCartItems() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-muted text-center">Your cart is empty</p>';
        cartTotalElement.textContent = `${CONFIG.currency}0`;
        return;
    }
    
    let total = 0;
    cartItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        return `
            <div class="cart-item">
                <div class="row align-items-center">
                    <div class="col-2">
                        <img src="${item.image}" class="cart-item-image" alt="${item.name}">
                    </div>
                    <div class="col-4">
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">${formatDualPrice(item.price)}</small>
                    </div>
                    <div class="col-3">
                        <div class="quantity-controls">
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <div class="col-2">
                        <strong>${formatDualPrice(itemTotal)}</strong>
                    </div>
                    <div class="col-1">
                        <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    cartTotalElement.innerHTML = formatDualPrice(total);
}

// Wishlist Functionality
function toggleWishlist(productId) {
    const product = sampleProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingIndex = wishlist.findIndex(item => item.id === productId);
    
    if (existingIndex > -1) {
        wishlist.splice(existingIndex, 1);
        showAlert('Removed from wishlist', 'info');
    } else {
        wishlist.push(product);
        showAlert('Added to wishlist!', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    loadProducts(); // Reload to update wishlist buttons
}

// Buy Now Functionality
function buyNow(productId) {
    addToCart(productId);
    proceedToCheckout();
}

function proceedToCheckout() {
    if (cart.length === 0) {
        showAlert('Your cart is empty!', 'warning');
        return;
    }
    
    const cartModal = bootstrap.Modal.getInstance(document.getElementById('cartModal'));
    if (cartModal) cartModal.hide();
    
    const orderModal = new bootstrap.Modal(document.getElementById('orderModal'));
    orderModal.show();
}

// Payment Methods
function selectPayment(method) {
    selectedPaymentMethod = method;
    
    // Remove selected class from all payment methods
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
    
    // Add selected class to clicked method
    event.target.closest('.payment-method').classList.add('selected');
}

function confirmOrder() {
    const form = document.getElementById('orderForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    if (!selectedPaymentMethod) {
        showAlert('Please select a payment method', 'warning');
        return;
    }
    
    // Simulate order processing
    showAlert('Order placed successfully! We will contact you soon.', 'success');
    
    // Clear cart
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Close modal
    const orderModal = bootstrap.Modal.getInstance(document.getElementById('orderModal'));
    orderModal.hide();
    
    // Reset form
    form.reset();
    selectedPaymentMethod = null;
    document.querySelectorAll('.payment-method').forEach(el => {
        el.classList.remove('selected');
    });
}

// WhatsApp Integration
function openWhatsApp() {
    const message = encodeURIComponent('Hello! I am interested in your products on SmartPlugBD.');
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${message}`;
    window.open(url, '_blank');
}

// Recent Searches
function loadRecentSearches() {
    const recentSearchesContainer = document.getElementById('recentSearches');
    
    if (recentSearches.length === 0) {
        recentSearchesContainer.innerHTML = '<span class="list-group-item text-muted">No recent searches</span>';
        return;
    }
    
    recentSearchesContainer.innerHTML = recentSearches
        .map(search => `<a href="#" class="list-group-item list-group-item-action" onclick="searchFromRecent('${search}')">${search}</a>`)
        .join('');
}

function searchFromRecent(query) {
    document.getElementById('searchInput').value = query;
    searchProducts();
}

// User Profile
function loadUserProfile() {
    const userProfileContainer = document.getElementById('userProfile');
    
    if (currentUser) {
        userProfileContainer.innerHTML = `
            <div class="text-center">
                <i class="fas fa-user-circle fs-1 text-primary"></i>
                <div class="mt-2">
                    <strong>${currentUser.name}</strong>
                    <div class="small text-muted">${currentUser.email}</div>
                    <button class="btn btn-sm btn-outline-secondary mt-2" onclick="logout()">Logout</button>
                </div>
            </div>
        `;
    } else {
        userProfileContainer.innerHTML = `
            <div class="text-center">
                <i class="fas fa-user-circle fs-1 text-muted"></i>
                <div class="mt-2">
                    <button class="btn btn-sm btn-outline-primary" onclick="showLogin()">Login</button>
                </div>
            </div>
        `;
    }
}

function showLogin() {
    // Simple login simulation
    const name = prompt('Enter your name:');
    const email = prompt('Enter your email:');
    
    if (name && email) {
        currentUser = { name, email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loadUserProfile();
        showAlert('Logged in successfully!', 'success');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    loadUserProfile();
    showAlert('Logged out successfully!', 'info');
}

// Mobile Menu Functions
function toggleSidebar() {
    // For mobile - show categories in a modal or slide-in panel
    showAlert('Categories menu - to be implemented', 'info');
}

function toggleUserProfile() {
    // For mobile - show user profile options
    if (currentUser) {
        showAlert(`Welcome ${currentUser.name}!`, 'info');
    } else {
        showLogin();
    }
}

// Utility Functions
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-floating alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

// Category Filter
function filterByCategory(category) {
    const filteredProducts = sampleProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
    );
    loadProducts(filteredProducts);
}

// Add click handlers to category links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('#categoriesList a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.textContent.trim();
            filterByCategory(category);
        });
    });
});

// Dark Mode Functions
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggleIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggleIcon(newTheme);
    
    showAlert(`Switched to ${newTheme} mode`, 'info');
}

function updateThemeToggleIcon(theme) {
    const desktopToggle = document.querySelector('.theme-toggle i');
    const mobileToggle = document.querySelector('#mobileMenu .theme-toggle i');
    
    const icon = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    if (desktopToggle) desktopToggle.className = icon;
    if (mobileToggle) mobileToggle.className = icon;
}

// Add currency toggle button to navigation
function addCurrencyToggle() {
    const navbar = document.querySelector('.navbar .d-none.d-lg-flex');
    if (navbar) {
        // Add theme toggle first
        const themeToggle = document.createElement('div');
        themeToggle.className = 'me-3';
        themeToggle.innerHTML = `
            <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </button>
        `;
        navbar.insertBefore(themeToggle, navbar.firstChild);
        
        // Add currency toggle
        const currencyToggle = document.createElement('div');
        currencyToggle.className = 'me-3';
        currencyToggle.innerHTML = `
            <button class="btn btn-outline-primary btn-sm" onclick="toggleCurrency()" title="Toggle Currency">
                <i class="fas fa-exchange-alt me-1"></i>${CONFIG.primaryCurrency}
            </button>
        `;
        navbar.insertBefore(currencyToggle, navbar.firstChild);
    }
    
    // Add to mobile menu as well
    const mobileMenu = document.querySelector('#mobileMenu .d-flex');
    if (mobileMenu) {
        // Add theme toggle to mobile
        const mobileThemeToggle = document.createElement('div');
        mobileThemeToggle.className = 'text-center';
        mobileThemeToggle.innerHTML = `
            <button class="theme-toggle" onclick="toggleTheme()" title="Toggle Dark Mode">
                <i class="fas fa-moon"></i>
            </button>
            <div class="small">Theme</div>
        `;
        mobileMenu.appendChild(mobileThemeToggle);
        
        // Add currency toggle to mobile
        const mobileCurrencyToggle = document.createElement('div');
        mobileCurrencyToggle.className = 'text-center';
        mobileCurrencyToggle.innerHTML = `
            <i class="fas fa-exchange-alt fs-4 text-warning cursor-pointer" onclick="toggleCurrency()"></i>
            <div class="small">${CONFIG.primaryCurrency}</div>
        `;
        mobileMenu.appendChild(mobileCurrencyToggle);
    }
}

// Update currency toggle button text
function updateCurrencyToggleButton() {
    const desktopButton = document.querySelector('.navbar button[onclick="toggleCurrency()"]');
    if (desktopButton) {
        desktopButton.innerHTML = `<i class="fas fa-exchange-alt me-1"></i>${CONFIG.primaryCurrency}`;
    }
    
    const mobileButton = document.querySelector('#mobileMenu .text-center:last-child .small');
    if (mobileButton) {
        mobileButton.textContent = CONFIG.primaryCurrency;
    }
}

// Override toggleCurrency to update button
function toggleCurrency() {
    CONFIG.primaryCurrency = CONFIG.primaryCurrency === 'BDT' ? 'USD' : 'BDT';
    localStorage.setItem('primaryCurrency', CONFIG.primaryCurrency);
    updateCurrencyToggleButton();
    loadProducts();
    if (document.getElementById('cartModal').classList.contains('show')) {
        loadCartItems();
    }
    showAlert(`Currency switched to ${CONFIG.primaryCurrency}`, 'info');
}

// Initialize everything when page loads
window.addEventListener('load', function() {
    // Add fade-in animation to products
    setTimeout(() => {
        document.querySelectorAll('.product-card').forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }, 500);
});

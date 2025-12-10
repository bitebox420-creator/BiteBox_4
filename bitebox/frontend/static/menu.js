let menuItems = [];
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentFilter = 'all';

// Default images for each category
const categoryImages = {
    'breakfast': 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=400&h=300&fit=crop',
    'lunch': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    'snacks': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
    'beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    'healthy': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    'default': 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop'
};

function getImageForItem(item) {
    if (item.image_url) return item.image_url;
    return categoryImages[item.category?.toLowerCase()] || categoryImages['default'];
}

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    updateCartUI();
    setupFilters();
    setupSearch();
});

async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        // Filter only vegetarian items
        menuItems = (data.items || []).filter(item => item.is_vegetarian === true);
        renderMenu();
        renderCategories();
    } catch (error) {
        console.error('Error loading menu:', error);
        showToast('Failed to load menu', 'error');
    }
}

function renderCategories() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    const categories = ['all', ...new Set(menuItems.map(item => item.category))];

    container.innerHTML = categories.map(cat => `
        <button class="category-btn ${cat === 'all' ? 'active' : ''}" onclick="filterByCategory('${cat}')">
            <i class="fas fa-${getCategoryIcon(cat)}"></i> ${cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        'all': 'th-large',
        'breakfast': 'mug-hot',
        'lunch': 'utensils',
        'snacks': 'cookie',
        'beverages': 'coffee',
        'healthy': 'leaf'
    };
    return icons[category.toLowerCase()] || 'utensils';
}

function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.category-btn').classList.add('active');
    renderMenu();
}

function renderMenu() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    let filtered = currentFilter === 'all' 
        ? menuItems 
        : menuItems.filter(item => item.category === currentFilter);

    const searchTerm = document.getElementById('menuSearch')?.value.toLowerCase() || '';
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.description?.toLowerCase().includes(searchTerm)
        );
    }

    document.getElementById('resultsCount').textContent = filtered.length;

    grid.innerHTML = filtered.map(item => `
        <div class="menu-item">
            <div class="menu-item-image" style="background-image: url('${getImageForItem(item)}')">
                <div class="menu-item-tags">
                    ${item.is_vegetarian ? '<span class="tag veg">Veg</span>' : ''}
                    ${item.health_score >= 8 ? '<span class="tag healthy">Healthy</span>' : ''}
                </div>
                <div class="health-badge" style="background-color: ${getHealthColor(item.health_score)}">
                    ${item.health_score}/10
                </div>
            </div>
            <div class="menu-item-content">
                <h4>${item.name}</h4>
                <p>${item.description || 'Delicious and nutritious meal'}</p>
                <div class="menu-item-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${item.id})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getHealthColor(score) {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    return '#ef4444';
}

function setupSearch() {
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            renderMenu();
        });
    }
}

function setupFilters() {
    const sortSelect = document.getElementById('sortBy');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortMenu(e.target.value);
        });
    }
}

function sortMenu(sortBy) {
    switch(sortBy) {
        case 'price_low':
            menuItems.sort((a, b) => a.price - b.price);
            break;
        case 'price_high':
            menuItems.sort((a, b) => b.price - a.price);
            break;
        case 'health':
            menuItems.sort((a, b) => b.health_score - a.health_score);
            break;
        case 'name':
            menuItems.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    renderMenu();
}

function addToCart(itemId) {
    const item = menuItems.find(i => i.id === itemId);
    if (!item) return;

    const existingItem = cart.find(i => i.id === itemId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showToast(`${item.name} added to cart!`, 'success');
}

function updateCartUI() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    document.getElementById('cartCount').textContent = count;
    document.getElementById('cartTotal').textContent = `₹${total}`;

    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>₹${item.price} x ${item.quantity}</p>
                    </div>
                    <div class="cart-item-actions">
                        <button onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function updateQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== itemId);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function openCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('open');
        cartSidebar.style.display = 'block';
    }
}

function closeCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) {
        cartSidebar.classList.remove('open');
    }
}

function aiSearchMenu() {
    const query = document.getElementById('aiSearch').value;
    if (!query) return;

    showToast('AI search is a demo feature for this project', 'info');
}
let cart = [];
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    initTheme();
    setupNavigation();
});

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update button icon if it exists
    const darkModeBtn = document.querySelector('.btn-icon i.fa-moon, .btn-icon i.fa-sun');
    if (darkModeBtn) {
        if (newTheme === 'dark') {
            darkModeBtn.classList.replace('fa-moon', 'fa-sun');
        } else {
            darkModeBtn.classList.replace('fa-sun', 'fa-moon');
        }
    }
    
    showToast(newTheme === 'dark' ? '🌙 Dark mode enabled' : '☀️ Light mode enabled', 'success');
}

function toggleLanguage() {
    showToast('Language switching coming soon!', 'info');
}

function handleDemoRequest(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    showToast('Thank you! We will contact you within 24 hours to schedule your demo.', 'success');
    form.reset();
    
    setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2000);
}

function setupNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.dataset.section;
            if (section) {
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
                document.getElementById(section)?.classList.add('active');
            }
        });
    });
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.textContent = message;
        toast.className = `toast show ${type}`;
        setTimeout(() => toast.classList.remove('show'), 3000);
    }
}

async function logout() {
    try {
        await fetch('/api/auth/logout', { method: 'POST' });
    } catch (e) {}
    localStorage.removeItem('user');
    window.location.href = '/login';
}

function addToCart(item) {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    updateCartUI();
    showToast(`${item.name} added to cart!`, 'success');
}

function removeFromCart(itemId) {
    cart = cart.filter(i => i.id !== itemId);
    updateCartUI();
}

function updateCartQuantity(itemId, change) {
    const item = cart.find(i => i.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    if (cartTotal) cartTotal.textContent = `₹${totalPrice}`;
    
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
                        <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

function openCart() {
    const cartModal = document.getElementById('cartModal');
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartModal) cartModal.classList.add('show');
    if (cartSidebar) cartSidebar.classList.add('open');
    updateCartUI();
}

function closeCart() {
    const cartModal = document.getElementById('cartModal');
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartModal) cartModal.classList.remove('show');
    if (cartSidebar) cartSidebar.classList.remove('open');
}

async function placeOrder() {
    if (!currentUser) {
        showToast('Please login to place order', 'error');
        window.location.href = '/login';
        return;
    }
    
    if (cart.length === 0) {
        showToast('Your cart is empty', 'error');
        return;
    }
    
    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                items: cart.map(item => ({
                    menu_item_id: item.id,
                    quantity: item.quantity
                }))
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showToast(`Order placed! Earned ${data.health_points_earned} health points!`, 'success');
            cart = [];
            updateCartUI();
            closeCart();
        } else {
            showToast(data.error || 'Failed to place order', 'error');
        }
    } catch (error) {
        showToast('Connection error', 'error');
    }
}

function toggleSidebar() {
    document.querySelector('.sidebar')?.classList.toggle('open');
}

function showNotifications() {
    showToast('Notifications panel coming soon!', 'info');
}



function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.textContent = message;
    toast.className = `toast show ${type}`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}

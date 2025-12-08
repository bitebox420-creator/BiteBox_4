let menuItems = [];
let userStats = {};

document.addEventListener('DOMContentLoaded', () => {
    loadUserData();
    loadDashboardData();
    loadMenu();
    loadGamification();
    loadSubscriptions();
    setupNavigation();
});

async function loadUserData() {
    try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
            const user = await response.json();
            document.getElementById('userName').textContent = user.name;
            currentUser = user;
        } else {
            window.location.href = '/login';
        }
    } catch (error) {
        console.error('Failed to load user:', error);
    }
}

async function loadDashboardData() {
    try {
        const ordersRes = await fetch('/api/orders');
        const orders = await ordersRes.json();

        document.getElementById('totalOrders').textContent = orders.length;

        const today = new Date().toDateString();
        const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today);
        let todayCals = 0;
        todayOrders.forEach(order => {
            order.items?.forEach(item => {
                todayCals += 150;
            });
        });
        document.getElementById('todayCalories').textContent = todayCals;

        const recentList = document.getElementById('recentOrdersList');
        if (recentList) {
            const recent = orders.slice(0, 5);
            if (recent.length === 0) {
                recentList.innerHTML = '<p class="no-data">No orders yet</p>';
            } else {
                recentList.innerHTML = recent.map(order => `
                    <div class="order-item">
                        <div class="order-info">
                            <h4>Order #${order.id}</h4>
                            <p>${order.items?.length || 0} items - ₹${order.total_amount}</p>
                        </div>
                        <span class="order-status ${order.status}">${order.status}</span>
                    </div>
                `).join('');
            }
        }

        const ordersList = document.getElementById('ordersList');
        if (ordersList) {
            if (orders.length === 0) {
                ordersList.innerHTML = '<p class="no-data">No orders found</p>';
            } else {
                ordersList.innerHTML = orders.map(order => `
                    <div class="order-card">
                        <div class="order-header">
                            <h4>Order #${order.id}</h4>
                            <span class="order-status ${order.status}">${order.status}</span>
                        </div>
                        <div class="order-items">
                            ${order.items?.map(i => `<span>${i.name} x${i.quantity}</span>`).join(', ') || 'Items unavailable'}
                        </div>
                        <div class="order-footer">
                            <span class="order-date">${new Date(order.created_at).toLocaleDateString()}</span>
                            <span class="order-total">₹${order.total_amount}</span>
                        </div>
                        ${order.status === 'completed' ? `<button onclick="downloadInvoice(${order.id})" class="btn-invoice">Download Invoice</button>` : ''}
                    </div>
                `).join('');
            }
        }
    } catch (error) {
        console.error('Failed to load dashboard:', error);
    }
}

async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        menuItems = await response.json();
        renderMenuGrid();
        renderPopularItems();
    } catch (error) {
        console.error('Failed to load menu:', error);
    }
}

function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    grid.innerHTML = menuItems.map(item => `
        <div class="menu-item">
            <div class="menu-item-image" style="background-image: url('${item.image_url}')">
                <div class="menu-item-tags">
                    ${item.is_vegetarian ? '<span class="tag veg">Veg</span>' : ''}
                    ${item.health_score >= 8 ? '<span class="tag healthy">Healthy</span>' : ''}
                </div>
                <div class="health-badge">${item.health_score}</div>
            </div>
            <div class="menu-item-content">
                <h4>${item.name}</h4>
                <p>${item.description || ''}</p>
                <div class="menu-item-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPopularItems() {
    const container = document.getElementById('popularItems');
    if (!container) return;

    const popular = menuItems.filter(i => i.health_score >= 8).slice(0, 4);
    container.innerHTML = popular.map(item => `
        <div class="popular-item" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
            <img src="${item.image_url}" alt="${item.name}">
            <div class="popular-info">
                <h4>${item.name}</h4>
                <span>₹${item.price}</span>
            </div>
        </div>
    `).join('');
}

async function loadGamification() {
    try {
        const statsRes = await fetch('/api/gamification/stats');
        const stats = await statsRes.json();

        document.getElementById('healthPoints').textContent = stats.health_points || 0;
        document.getElementById('totalPoints').textContent = stats.health_points || 0;
        document.getElementById('healthScore').textContent = stats.health_points || 0;

        const leaderRes = await fetch('/api/gamification/leaderboard');
        const leaderboard = await leaderRes.json();

        const currentRank = leaderboard.findIndex(u => u.name === currentUser?.name) + 1;
        document.getElementById('leaderRank').textContent = currentRank ? `#${currentRank}` : 'N/A';

        const leaderList = document.getElementById('leaderboard');
        if (leaderList) {
            leaderList.innerHTML = leaderboard.map((user, idx) => `
                <div class="leader-item ${user.name === currentUser?.name ? 'current' : ''}">
                    <span class="rank">#${idx + 1}</span>
                    <span class="name">${user.name}</span>
                    <span class="points">${user.health_points} HP</span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load gamification:', error);
    }
}

async function loadSubscriptions() {
    try {
        const response = await fetch('/api/subscriptions');
        const data = await response.json();

        const container = document.getElementById('subscriptionPlans');
        if (!container) return;

        if (data.length === 0) {
            container.innerHTML = '<p>No active subscriptions</p>';
            return;
        }

        container.innerHTML = data.map(sub => `
            <div class="subscription-card">
                <h3>${sub.plan_name}</h3>
                <p>Start: ${new Date(sub.start_date).toLocaleDateString()}</p>
                ${sub.end_date ? `<p>End: ${new Date(sub.end_date).toLocaleDateString()}</p>` : ''}
                <span class="badge ${sub.is_active ? 'badge-success' : 'badge-secondary'}">
                    ${sub.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error loading subscriptions:', error);
    }
}

async function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const messagesContainer = document.getElementById('chatMessages');

    if (!input || !messagesContainer) return;

    const message = input.value.trim();
    if (!message) return;

    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'user-message';
    userMessageDiv.innerHTML = `
        <div class="message-bubble">
            <i class="fas fa-user"></i>
            <p>${message}</p>
        </div>
    `;
    messagesContainer.appendChild(userMessageDiv);

    // Clear input
    input.value = '';

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    // Show loading message
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'ai-message';
    loadingDiv.id = 'loading-message';
    loadingDiv.innerHTML = `
        <div class="message-bubble">
            <i class="fas fa-robot"></i>
            <p>Thinking...</p>
        </div>
    `;
    messagesContainer.appendChild(loadingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    try {
        const response = await fetch('/api/ai/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        // Remove loading message
        loadingDiv.remove();

        if (response.ok) {
            // Add AI response
            const aiMessageDiv = document.createElement('div');
            aiMessageDiv.className = 'ai-message';
            aiMessageDiv.innerHTML = `
                <div class="message-bubble">
                    <i class="fas fa-robot"></i>
                    <p>${data.response}</p>
                </div>
            `;
            messagesContainer.appendChild(aiMessageDiv);
        } else {
            throw new Error(data.error || 'Failed to get AI response');
        }
    } catch (error) {
        loadingDiv.remove();
        const errorDiv = document.createElement('div');
        errorDiv.className = 'ai-message';
        errorDiv.innerHTML = `
            <div class="message-bubble">
                <i class="fas fa-exclamation-triangle"></i>
                <p style="color: var(--danger);">Sorry, I encountered an error. Please try again.</p>
            </div>
        `;
        messagesContainer.appendChild(errorDiv);
        console.error('AI Chat Error:', error);
    }

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Allow Enter key to send message
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('aiChatInput');
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendAIMessage();
            }
        });
    }
});


async function subscribeToPlan(planId) {
    try {
        const response = await fetch('/api/subscriptions/plans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ plan_id: planId })
        });

        if (response.ok) {
            showToast('Subscription activated!', 'success');
        } else {
            const data = await response.json();
            showToast(data.error || 'Failed to subscribe', 'error');
        }
    } catch (error) {
        showToast('Connection error', 'error');
    }
}

async function calculateBMI(e) {
    e.preventDefault();

    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight) {
        showToast('Please enter height and weight', 'error');
        return;
    }

    try {
        const response = await fetch('/api/health/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ height, weight })
        });

        const data = await response.json();

        if (response.ok) {
            const bmi = data.bmi;
            let category = '';
            let color = '';

            if (bmi < 18.5) { category = 'Underweight'; color = '#f59e0b'; }
            else if (bmi < 25) { category = 'Normal'; color = '#10b981'; }
            else if (bmi < 30) { category = 'Overweight'; color = '#f59e0b'; }
            else { category = 'Obese'; color = '#ef4444'; }

            document.getElementById('bmiResult').innerHTML = `
                <div class="bmi-display" style="color: ${color}">
                    <h2>${bmi}</h2>
                    <p>${category}</p>
                </div>
            `;

            loadDietPlan();
        }
    } catch (error) {
        showToast('Failed to calculate BMI', 'error');
    }
}

async function loadDietPlan() {
    try {
        const response = await fetch('/api/health/diet-plan');
        const plan = await response.json();

        const container = document.getElementById('dietPlanContent');
        if (container && plan.plan) {
            container.innerHTML = `
                <div class="diet-summary">
                    <p>BMI: <strong>${plan.bmi}</strong> | Goal: <strong>${plan.goal}</strong></p>
                    <p>Daily: ${plan.daily_calories} kcal, ${plan.daily_protein}g protein</p>
                </div>
                <div class="diet-grid">
                    <div class="meal-card">
                        <h4><i class="fas fa-coffee"></i> Breakfast</h4>
                        ${plan.plan.breakfast.map(m => `<p>${m.name} (${m.calories} kcal)</p>`).join('')}
                    </div>
                    <div class="meal-card">
                        <h4><i class="fas fa-sun"></i> Lunch</h4>
                        ${plan.plan.lunch.map(m => `<p>${m.name} (${m.calories} kcal)</p>`).join('')}
                    </div>
                    <div class="meal-card">
                        <h4><i class="fas fa-cookie"></i> Snacks</h4>
                        ${plan.plan.snacks.map(m => `<p>${m.name} (${m.calories} kcal)</p>`).join('')}
                    </div>
                    <div class="meal-card">
                        <h4><i class="fas fa-moon"></i> Dinner</h4>
                        ${plan.plan.dinner.map(m => `<p>${m.name} (${m.calories} kcal)</p>`).join('')}
                    </div>
                </div>
            `;
        }
    } catch (error) {
        console.error('Failed to load diet plan:', error);
    }
}

async function saveHealthProfile() {
    const allergies = [...document.querySelectorAll('.allergy-options input:checked')].map(i => i.value);
    const preferences = [...document.querySelectorAll('.preference-options input:checked')].map(i => i.value);

    try {
        const response = await fetch('/api/health/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ allergies, dietary_preferences: preferences })
        });

        if (response.ok) {
            showToast('Health profile saved!', 'success');
        }
    } catch (error) {
        showToast('Failed to save profile', 'error');
    }
}

async function redeemPoints() {
    const points = parseInt(document.getElementById('totalPoints').textContent);

    if (points < 100) {
        showToast('Need at least 100 points to redeem', 'error');
        return;
    }

    try {
        const response = await fetch('/api/gamification/redeem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ points: 100 })
        });

        const data = await response.json();

        if (response.ok) {
            showToast(`Redeemed! You got ₹${data.discount} discount`, 'success');
            loadGamification();
        } else {
            showToast(data.error, 'error');
        }
    } catch (error) {
        showToast('Failed to redeem points', 'error');
    }
}

function downloadInvoice(orderId) {
    window.open(`/api/invoices/${orderId}`, '_blank');
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

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            if (filter === 'all') {
                renderMenuGrid();
            } else if (filter === 'vegetarian') {
                const filtered = menuItems.filter(i => i.is_vegetarian);
                renderFilteredMenu(filtered);
            } else if (filter === 'healthy') {
                const filtered = menuItems.filter(i => i.health_score >= 8);
                renderFilteredMenu(filtered);
            } else if (filter === 'protein') {
                const filtered = menuItems.filter(i => i.protein && i.protein > 5);
                renderFilteredMenu(filtered);
            }
        });
    });
}

function renderFilteredMenu(items) {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;

    grid.innerHTML = items.map(item => `
        <div class="menu-item">
            <div class="menu-item-image" style="background-image: url('${item.image_url}')">
                <div class="menu-item-tags">
                    ${item.is_vegetarian ? '<span class="tag veg">Veg</span>' : ''}
                    ${item.health_score >= 8 ? '<span class="tag healthy">Healthy</span>' : ''}
                </div>
                <div class="health-badge">${item.health_score}</div>
            </div>
            <div class="menu-item-content">
                <h4>${item.name}</h4>
                <p>${item.description || ''}</p>
                <div class="menu-item-footer">
                    <span class="price">₹${item.price}</span>
                    <button class="add-btn" onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}
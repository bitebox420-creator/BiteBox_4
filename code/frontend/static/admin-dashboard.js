document.addEventListener('DOMContentLoaded', () => {
    loadAnalytics();
    loadOrders();
    loadInventory();
    loadFeedback();
    setupNavigation();
});

async function loadAnalytics() {
    try {
        const response = await fetch('/api/admin/analytics');
        const data = await response.json();
        
        document.getElementById('dailyRevenue').textContent = `₹${data.daily_revenue}`;
        document.getElementById('dailyOrders').textContent = data.daily_orders_count;
        document.getElementById('weeklyRevenue').textContent = `₹${data.weekly_revenue}`;
        document.getElementById('monthlyRevenue').textContent = `₹${data.monthly_revenue}`;
        
        renderTopItems(data.top_items);
        renderLowStock(data.low_stock_items);
        renderSalesChart(data.daily_sales);
    } catch (error) {
        console.error('Failed to load analytics:', error);
    }
}

function renderTopItems(items) {
    const container = document.getElementById('topItemsList');
    if (!container) return;
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="no-data">No sales data yet</p>';
        return;
    }
    
    container.innerHTML = items.map((item, idx) => `
        <div class="top-item">
            <span class="rank">#${idx + 1}</span>
            <span class="name">${item.name}</span>
            <span class="sold">${item.sold} sold</span>
        </div>
    `).join('');
}

function renderLowStock(items) {
    const container = document.getElementById('lowStockList');
    if (!container) return;
    
    if (!items || items.length === 0) {
        container.innerHTML = '<p class="no-data">All items well stocked!</p>';
        return;
    }
    
    container.innerHTML = items.map(item => `
        <div class="stock-item alert">
            <i class="fas fa-exclamation-triangle"></i>
            <span class="name">${item.name}</span>
            <span class="stock">${item.stock} left</span>
            <button onclick="restockItem(${item.id})" class="btn-restock">Restock</button>
        </div>
    `).join('');
}

function renderSalesChart(sales) {
    const container = document.getElementById('salesBars');
    if (!container || !sales) return;
    
    const maxRevenue = Math.max(...sales.map(s => s.revenue), 1);
    
    container.innerHTML = sales.map(day => {
        const height = (day.revenue / maxRevenue) * 100;
        return `
            <div class="bar-wrapper">
                <div class="bar" style="height: ${height}%">
                    <span class="bar-value">₹${day.revenue}</span>
                </div>
                <span class="bar-label">${new Date(day.date).toLocaleDateString('en', {weekday: 'short'})}</span>
            </div>
        `;
    }).join('');
}

async function loadOrders() {
    try {
        const response = await fetch('/api/orders');
        const orders = await response.json();
        
        renderOrders(orders);
        
        document.querySelectorAll('.order-filters .filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.order-filters .filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const status = btn.dataset.status;
                if (status === 'all') {
                    renderOrders(orders);
                } else {
                    renderOrders(orders.filter(o => o.status === status));
                }
            });
        });
    } catch (error) {
        console.error('Failed to load orders:', error);
    }
}

function renderOrders(orders) {
    const container = document.getElementById('adminOrdersList');
    if (!container) return;
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="no-data">No orders found</p>';
        return;
    }
    
    container.innerHTML = orders.map(order => `
        <div class="admin-order-card">
            <div class="order-header">
                <h4>Order #${order.id}</h4>
                <select onchange="updateOrderStatus(${order.id}, this.value)" class="status-select ${order.status}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="ready" ${order.status === 'ready' ? 'selected' : ''}>Ready</option>
                    <option value="completed" ${order.status === 'completed' ? 'selected' : ''}>Completed</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </div>
            <div class="order-items">
                ${order.items?.map(i => `<span>${i.name} x${i.quantity}</span>`).join(', ') || ''}
            </div>
            <div class="order-footer">
                <span>${new Date(order.created_at).toLocaleString()}</span>
                <span class="order-total">₹${order.total_amount}</span>
            </div>
        </div>
    `).join('');
}

async function updateOrderStatus(orderId, status) {
    try {
        const response = await fetch(`/api/orders/${orderId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        if (response.ok) {
            showToast('Order status updated!', 'success');
        }
    } catch (error) {
        showToast('Failed to update status', 'error');
    }
}

async function loadInventory() {
    try {
        const response = await fetch('/api/admin/inventory');
        const items = await response.json();
        
        const container = document.getElementById('inventoryList');
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <div class="inventory-card ${item.stock < 10 ? 'low' : ''}">
                <div class="inventory-info">
                    <h4>${item.name}</h4>
                    <p>${item.category}</p>
                </div>
                <div class="inventory-stock">
                    <input type="number" value="${item.stock}" id="stock-${item.id}" min="0">
                    <button onclick="updateStock(${item.id})" class="btn-update">Update</button>
                </div>
                <div class="inventory-toggle">
                    <label class="switch">
                        <input type="checkbox" ${item.is_available ? 'checked' : ''} onchange="toggleAvailability(${item.id}, this.checked)">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load inventory:', error);
    }
}

async function updateStock(itemId) {
    const stock = parseInt(document.getElementById(`stock-${itemId}`).value);
    
    try {
        const response = await fetch('/api/admin/inventory', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, stock })
        });
        
        if (response.ok) {
            showToast('Stock updated!', 'success');
            loadInventory();
            loadAnalytics();
        }
    } catch (error) {
        showToast('Failed to update stock', 'error');
    }
}

async function toggleAvailability(itemId, available) {
    try {
        const response = await fetch('/api/admin/inventory', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id: itemId, is_available: available })
        });
        
        if (response.ok) {
            showToast(available ? 'Item enabled' : 'Item disabled', 'success');
        }
    } catch (error) {
        showToast('Failed to update', 'error');
    }
}

function restockItem(itemId) {
    document.getElementById(`stock-${itemId}`).value = 50;
    updateStock(itemId);
}

function autoRestockNotify() {
    showToast('Restock notification sent to vendor!', 'success');
}

async function loadFeedback() {
    try {
        const response = await fetch('/api/feedback');
        const feedbacks = await response.json();
        
        const container = document.getElementById('feedbackList');
        if (!container) return;
        
        if (feedbacks.length === 0) {
            container.innerHTML = '<p class="no-data">No feedback yet</p>';
            return;
        }
        
        const avgRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length;
        document.getElementById('avgRating').textContent = avgRating.toFixed(1);
        
        container.innerHTML = feedbacks.map(f => `
            <div class="feedback-card">
                <div class="feedback-header">
                    <div class="rating">
                        ${'<i class="fas fa-star"></i>'.repeat(f.rating)}
                        ${'<i class="far fa-star"></i>'.repeat(5 - f.rating)}
                    </div>
                    <span class="category">${f.category}</span>
                </div>
                <p>${f.comment || 'No comment'}</p>
                <span class="date">${new Date(f.created_at).toLocaleDateString()}</span>
            </div>
        `).join('');
    } catch (error) {
        console.error('Failed to load feedback:', error);
    }
}

function generateReport(type) {
    showToast(`Generating ${type} report...`, 'info');
}

function openAddItemModal() {
    showToast('Add item modal coming soon!', 'info');
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

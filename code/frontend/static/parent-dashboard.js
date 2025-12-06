let children = [];
let selectedChild = null;

document.addEventListener('DOMContentLoaded', () => {
    loadChildren();
    loadParentStats();
    loadRecentActivity();
    setupNavigation();
});

async function loadChildren() {
    try {
        const response = await fetch('/api/parent/children');
        children = await response.json();
        
        document.getElementById('childrenCount').textContent = children.length;
        
        populateChildSelectors();
        renderChildrenSummary();
        renderChildrenDetails();
    } catch (error) {
        console.error('Failed to load children:', error);
        document.getElementById('childrenSummary').innerHTML = '<p>No children linked to your account yet.</p>';
    }
}

function populateChildSelectors() {
    const selectors = ['nutritionChild', 'controlChild'];
    selectors.forEach(id => {
        const select = document.getElementById(id);
        if (select) {
            select.innerHTML = '<option value="">Select a child</option>' +
                children.map(c => `<option value="${c.id}">${c.name} (${c.class_name})</option>`).join('');
        }
    });
}

function renderChildrenSummary() {
    const container = document.getElementById('childrenSummary');
    if (!container) return;
    
    if (children.length === 0) {
        container.innerHTML = '<p class="no-data">No children linked yet</p>';
        return;
    }
    
    container.innerHTML = children.map(child => `
        <div class="child-card">
            <div class="child-avatar">
                <i class="fas fa-user-graduate"></i>
            </div>
            <div class="child-info">
                <h4>${child.name}</h4>
                <p>Class ${child.class_name} | ID: ${child.student_id}</p>
            </div>
        </div>
    `).join('');
}

function renderChildrenDetails() {
    const container = document.getElementById('childrenDetails');
    if (!container) return;
    
    if (children.length === 0) {
        container.innerHTML = '<p class="no-data">No children found</p>';
        return;
    }
    
    container.innerHTML = children.map(child => `
        <div class="child-detail-card">
            <div class="child-header">
                <div class="child-avatar large">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="child-info">
                    <h3>${child.name}</h3>
                    <p>Class ${child.class_name}</p>
                    <p>Student ID: ${child.student_id}</p>
                </div>
            </div>
            <div class="child-actions">
                <button onclick="viewNutrition(${child.id})" class="btn-secondary">
                    <i class="fas fa-chart-pie"></i> View Nutrition
                </button>
                <button onclick="manageControls(${child.id})" class="btn-secondary">
                    <i class="fas fa-shield-alt"></i> Parental Controls
                </button>
            </div>
        </div>
    `).join('');
}

async function loadNutritionReport() {
    const childId = document.getElementById('nutritionChild').value;
    if (!childId) return;
    
    try {
        const response = await fetch(`/api/parent/child/${childId}/nutrition`);
        const data = await response.json();
        
        document.getElementById('weeklyCalories').textContent = data.weekly_calories || 0;
        document.getElementById('weeklyProtein').textContent = `${data.weekly_protein || 0}g`;
        document.getElementById('weeklySpending').textContent = `₹${data.weekly_spending || 0}`;
        
        const breakdown = document.getElementById('categoryBreakdown');
        if (breakdown && data.category_breakdown) {
            breakdown.innerHTML = Object.entries(data.category_breakdown).map(([cat, count]) => `
                <div class="category-item">
                    <span>${cat}</span>
                    <span class="count">${count} items</span>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Failed to load nutrition:', error);
    }
}

async function loadParentStats() {
    try {
        const response = await fetch('/api/parent/stats');
        const data = await response.json();
        
        document.getElementById('childrenCount').textContent = data.children_count || 0;
        document.getElementById('monthlySpent').textContent = `₹${data.monthly_spent || 0}`;
        document.getElementById('monthlySpending').textContent = `₹${data.monthly_spent || 0}`;
        document.getElementById('totalMeals').textContent = data.total_meals || 0;
        document.getElementById('healthyPercent').textContent = `${data.healthy_percent || 0}%`;
    } catch (error) {
        console.error('Failed to load parent stats:', error);
    }
}

async function loadRecentActivity() {
    try {
        const response = await fetch('/api/parent/activity');
        const activities = await response.json();
        
        const container = document.getElementById('recentActivity');
        if (!container) return;
        
        if (!activities || activities.length === 0) {
            container.innerHTML = '<p class="no-data">No recent activity</p>';
            return;
        }
        
        container.innerHTML = activities.map(activity => {
            const timeAgo = getTimeAgo(new Date(activity.time));
            const statusClass = activity.status === 'completed' ? 'success' : 
                               activity.status === 'pending' ? 'warning' : 'info';
            
            return `
                <div class="activity-item">
                    <div class="activity-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="activity-details">
                        <p class="activity-title"><strong>${activity.child_name}</strong></p>
                        <p class="activity-desc">${activity.description}</p>
                        <span class="activity-meta">
                            <span class="amount">₹${activity.amount}</span>
                            <span class="status ${statusClass}">${activity.status}</span>
                            <span class="time">${timeAgo}</span>
                        </span>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Failed to load recent activity:', error);
        const container = document.getElementById('recentActivity');
        if (container) {
            container.innerHTML = '<p class="no-data">Failed to load activity</p>';
        }
    }
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
}

async function loadParentalControls() {
    const childId = document.getElementById('controlChild').value;
    if (!childId) return;
    
    try {
        const response = await fetch(`/api/parent/child/${childId}/controls`);
        const controls = await response.json();
        
        document.getElementById('dailyLimit').value = controls.daily_limit || '';
        document.getElementById('weeklyLimit').value = controls.spending_limit || '';
        document.getElementById('requireApproval').checked = controls.require_approval || false;
        
        const blockJunkFood = document.getElementById('blockJunkFood');
        const blockSugaryDrinks = document.getElementById('blockSugaryDrinks');
        if (blockJunkFood) blockJunkFood.checked = controls.block_junk_food || false;
        if (blockSugaryDrinks) blockSugaryDrinks.checked = controls.block_sugary_drinks || false;
        
        const allowedCategories = controls.allowed_categories || [];
        document.querySelectorAll('.category-options input').forEach(checkbox => {
            checkbox.checked = allowedCategories.includes(checkbox.value);
        });
    } catch (error) {
        console.error('Failed to load controls:', error);
    }
}

async function saveParentalControls() {
    const childId = document.getElementById('controlChild').value;
    if (!childId) {
        showToast('Please select a child first', 'error');
        return;
    }
    
    const blockJunkFood = document.getElementById('blockJunkFood');
    const blockSugaryDrinks = document.getElementById('blockSugaryDrinks');
    
    const blockedItems = [];
    if (blockJunkFood && blockJunkFood.checked) blockedItems.push('junk_food');
    if (blockSugaryDrinks && blockSugaryDrinks.checked) blockedItems.push('sugary_drinks');
    
    const controls = {
        daily_limit: parseFloat(document.getElementById('dailyLimit').value) || null,
        spending_limit: parseFloat(document.getElementById('weeklyLimit').value) || null,
        require_approval: document.getElementById('requireApproval').checked,
        allowed_categories: [...document.querySelectorAll('.category-options input:checked')].map(i => i.value),
        blocked_items: blockedItems,
        block_junk_food: blockJunkFood ? blockJunkFood.checked : false,
        block_sugary_drinks: blockSugaryDrinks ? blockSugaryDrinks.checked : false
    };
    
    try {
        const response = await fetch(`/api/parent/child/${childId}/controls`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(controls)
        });
        
        if (response.ok) {
            showToast('Parental controls saved!', 'success');
        }
    } catch (error) {
        showToast('Failed to save controls', 'error');
    }
}

function viewNutrition(childId) {
    document.getElementById('nutritionChild').value = childId;
    loadNutritionReport();
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="nutrition"]').classList.add('active');
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('nutrition').classList.add('active');
}

function manageControls(childId) {
    document.getElementById('controlChild').value = childId;
    loadParentalControls();
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-section="controls"]').classList.add('active');
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById('controls').classList.add('active');
}

function downloadMonthlySummary() {
    window.open('/api/invoices/monthly/pdf', '_blank');
    showToast('Generating monthly summary...', 'info');
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

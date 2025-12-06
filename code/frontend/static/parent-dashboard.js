let children = [];
let selectedChild = null;

document.addEventListener('DOMContentLoaded', () => {
    loadChildren();
    loadMonthlySummary();
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

async function loadMonthlySummary() {
    try {
        const response = await fetch('/api/invoices/monthly');
        const data = await response.json();
        
        document.getElementById('monthlySpent').textContent = `₹${data.total_spent}`;
        document.getElementById('monthlySpending').textContent = `₹${data.total_spent}`;
        document.getElementById('totalMeals').textContent = data.total_orders;
    } catch (error) {
        console.error('Failed to load monthly summary:', error);
    }
}

async function loadParentalControls() {
    const childId = document.getElementById('controlChild').value;
    if (!childId) return;
    
    try {
        const response = await fetch(`/api/parent/child/${childId}/controls`);
        const controls = await response.json();
        
        if (controls.daily_limit) {
            document.getElementById('dailyLimit').value = controls.daily_limit;
        }
        if (controls.spending_limit) {
            document.getElementById('weeklyLimit').value = controls.spending_limit;
        }
        document.getElementById('requireApproval').checked = controls.require_approval || false;
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
    
    const controls = {
        daily_limit: parseFloat(document.getElementById('dailyLimit').value) || null,
        spending_limit: parseFloat(document.getElementById('weeklyLimit').value) || null,
        require_approval: document.getElementById('requireApproval').checked,
        allowed_categories: [...document.querySelectorAll('.category-options input:checked')].map(i => i.value)
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

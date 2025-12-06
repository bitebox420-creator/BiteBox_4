let menuItems = [];
let selectedItem = null;

document.addEventListener('DOMContentLoaded', () => {
    loadMenu();
    setupFilters();
});

async function loadMenu() {
    try {
        const response = await fetch('/api/menu');
        menuItems = await response.json();
        loadCategories();
        renderMenu(menuItems);
    } catch (error) {
        console.error('Failed to load menu:', error);
    }
}

async function loadCategories() {
    try {
        const response = await fetch('/api/menu/categories');
        const categories = await response.json();
        
        const container = document.getElementById('categoryFilters');
        if (container) {
            container.innerHTML = `
                <button class="category-btn active" data-category="all">
                    <i class="fas fa-th-large"></i> All Items
                </button>
                ${categories.map(cat => `
                    <button class="category-btn" data-category="${cat}">
                        <i class="fas fa-${getCategoryIcon(cat)}"></i> ${cat}
                    </button>
                `).join('')}
            `;
            
            container.querySelectorAll('.category-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    filterByCategory(btn.dataset.category);
                });
            });
        }
    } catch (error) {
        console.error('Failed to load categories:', error);
    }
}

function getCategoryIcon(category) {
    const icons = {
        'Fruits': 'apple-alt',
        'Salads': 'seedling',
        'Meals': 'utensils',
        'Breakfast': 'coffee',
        'Beverages': 'glass-water',
        'Snacks': 'cookie',
        'Proteins': 'drumstick-bite'
    };
    return icons[category] || 'utensils';
}

function renderMenu(items) {
    const grid = document.getElementById('menuGrid');
    const count = document.getElementById('resultsCount');
    
    if (count) count.textContent = items.length;
    
    if (grid) {
        if (items.length === 0) {
            grid.innerHTML = '<p class="no-results">No items found</p>';
            return;
        }
        
        grid.innerHTML = items.map(item => `
            <div class="menu-item" onclick="openItemModal(${item.id})">
                <div class="menu-item-image" style="background-image: url('${item.image_url}')">
                    <div class="menu-item-tags">
                        ${item.is_vegetarian ? '<span class="tag veg">Veg</span>' : ''}
                        ${item.is_vegan ? '<span class="tag vegan">Vegan</span>' : ''}
                        ${item.health_score >= 8 ? '<span class="tag healthy">Healthy</span>' : ''}
                    </div>
                    <div class="health-badge" style="color: ${getHealthColor(item.health_score)}">${item.health_score}</div>
                </div>
                <div class="menu-item-content">
                    <h4>${item.name}</h4>
                    <p>${item.description || ''}</p>
                    <div class="menu-item-footer">
                        <span class="price">₹${item.price}</span>
                        <button class="add-btn" onclick="event.stopPropagation(); addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                            <i class="fas fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
}

function getHealthColor(score) {
    if (score >= 8) return '#10b981';
    if (score >= 6) return '#f59e0b';
    return '#ef4444';
}

function filterByCategory(category) {
    if (category === 'all') {
        renderMenu(menuItems);
    } else {
        renderMenu(menuItems.filter(item => item.category === category));
    }
}

function setupFilters() {
    const searchInput = document.getElementById('menuSearch');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            renderMenu(menuItems.filter(item => 
                item.name.toLowerCase().includes(query) || 
                (item.description && item.description.toLowerCase().includes(query))
            ));
        });
    }
    
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    if (priceRange) {
        priceRange.addEventListener('input', (e) => {
            const max = parseInt(e.target.value);
            if (priceValue) priceValue.textContent = max;
            renderMenu(menuItems.filter(item => item.price <= max));
        });
    }
    
    const sortBy = document.getElementById('sortBy');
    if (sortBy) {
        sortBy.addEventListener('change', (e) => {
            let sorted = [...menuItems];
            switch (e.target.value) {
                case 'price_low':
                    sorted.sort((a, b) => a.price - b.price);
                    break;
                case 'price_high':
                    sorted.sort((a, b) => b.price - a.price);
                    break;
                case 'health':
                    sorted.sort((a, b) => b.health_score - a.health_score);
                    break;
                case 'calories':
                    sorted.sort((a, b) => a.calories - b.calories);
                    break;
                default:
                    sorted.sort((a, b) => a.name.localeCompare(b.name));
            }
            renderMenu(sorted);
        });
    }
    
    ['filterVeg', 'filterVegan', 'filterGlutenFree'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', applyDietaryFilters);
        }
    });
}

function applyDietaryFilters() {
    const veg = document.getElementById('filterVeg')?.checked;
    const vegan = document.getElementById('filterVegan')?.checked;
    const gf = document.getElementById('filterGlutenFree')?.checked;
    
    let filtered = menuItems;
    if (veg) filtered = filtered.filter(i => i.is_vegetarian);
    if (vegan) filtered = filtered.filter(i => i.is_vegan);
    if (gf) filtered = filtered.filter(i => i.is_gluten_free);
    
    renderMenu(filtered);
}

async function aiSearchMenu() {
    const query = document.getElementById('aiSearch')?.value;
    if (!query) return;
    
    let filtered = menuItems;
    const q = query.toLowerCase();
    
    if (q.includes('high protein') || q.includes('protein')) {
        filtered = filtered.filter(i => i.protein && i.protein > 5);
    }
    if (q.includes('low calorie') || q.includes('low cal')) {
        filtered = filtered.filter(i => i.calories && i.calories < 200);
    }
    if (q.includes('under')) {
        const priceMatch = q.match(/under\s*₹?\s*(\d+)/);
        if (priceMatch) {
            filtered = filtered.filter(i => i.price <= parseInt(priceMatch[1]));
        }
    }
    if (q.includes('veg')) {
        filtered = filtered.filter(i => i.is_vegetarian);
    }
    if (q.includes('healthy')) {
        filtered = filtered.filter(i => i.health_score >= 8);
    }
    
    renderMenu(filtered);
    showToast(`Found ${filtered.length} items matching your search`, 'info');
}

function openItemModal(itemId) {
    selectedItem = menuItems.find(i => i.id === itemId);
    if (!selectedItem) return;
    
    const modal = document.getElementById('itemModal');
    document.getElementById('modalItemImage').src = selectedItem.image_url;
    document.getElementById('modalItemName').textContent = selectedItem.name;
    document.getElementById('modalItemDescription').textContent = selectedItem.description || '';
    document.getElementById('modalCalories').textContent = `${selectedItem.calories} kcal`;
    document.getElementById('modalProtein').textContent = `${selectedItem.protein || 0}g`;
    document.getElementById('modalCarbs').textContent = `${selectedItem.carbs || 0}g`;
    document.getElementById('modalFats').textContent = `${selectedItem.fats || 0}g`;
    document.getElementById('modalHealthScore').textContent = selectedItem.health_score;
    document.getElementById('modalHealthBar').style.width = `${selectedItem.health_score * 10}%`;
    document.getElementById('modalHealthBar').style.background = getHealthColor(selectedItem.health_score);
    document.getElementById('modalPrice').textContent = `₹${selectedItem.price}`;
    
    let tags = '';
    if (selectedItem.is_vegetarian) tags += '<span class="tag veg">Vegetarian</span>';
    if (selectedItem.is_vegan) tags += '<span class="tag vegan">Vegan</span>';
    if (selectedItem.is_gluten_free) tags += '<span class="tag">Gluten-Free</span>';
    document.getElementById('modalTags').innerHTML = tags;
    
    document.getElementById('itemQty').value = 1;
    modal.classList.add('show');
}

function closeItemModal() {
    document.getElementById('itemModal')?.classList.remove('show');
}

function increaseQty() {
    const input = document.getElementById('itemQty');
    input.value = parseInt(input.value) + 1;
}

function decreaseQty() {
    const input = document.getElementById('itemQty');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

function addToCartFromModal() {
    if (selectedItem) {
        const qty = parseInt(document.getElementById('itemQty').value);
        for (let i = 0; i < qty; i++) {
            addToCart(selectedItem);
        }
        closeItemModal();
    }
}

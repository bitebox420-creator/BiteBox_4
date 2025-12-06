// --- DOM Elements ---
let menuDisplayDiv, itemInputField, messageDisplay, checkButton;

// --- Global Function Exposure (Immediate) ---
function makeGloballyAccessible() {
    // Tab navigation functions
    window.switchTab = switchTab;
    window.sendMiniChatMessage = sendMiniChatMessage;
    // Main functions
    window.showRandomHealthyFood = showRandomHealthyFood;
    window.toggleFavorites = toggleFavorites;
    window.showNutritionTips = showNutritionTips;
    window.toggleTips = toggleTips;
    window.toggleFabMenu = toggleFabMenu;
    window.openOrderCart = openOrderCart;
    window.closeOrderModal = closeOrderModal;
    window.placeOrder = placeOrder;
    window.updateCartQuantity = updateCartQuantity;
    window.addToCart = addToCart;
    window.toggleFavorite = toggleFavorite;
    window.toggleDarkMode = toggleDarkMode;

    // Login functions
    window.openLoginModal = openLoginModal;
    window.closeLoginModal = closeLoginModal;
    window.authenticateStudent = authenticateStudent;
    window.logout = logout;
    window.openCreateAccountModal = openCreateAccountModal;
    window.closeCreateAccountModal = closeCreateAccountModal;
    window.createNewAccount = createNewAccount;
    window.continueWithGoogle = continueWithGoogle;

    // BMI functions
    window.openBmiCalculator = openBmiCalculator;
    window.closeBmiModal = closeBmiModal;
    window.calculateBMI = calculateBMI;
    window.loadSampleData = loadSampleData;

    // Menu functions
    window.switchMenuTab = switchMenuTab;
    window.handleMenuItemClick = handleMenuItemClick;
    window.addJunkToCart = addJunkToCart;

    // Customer care functions
    window.openCustomerCare = openCustomerCare;
    window.closeCustomerCare = closeCustomerCare;
    window.reportIssue = reportIssue;
    window.requestFeature = requestFeature;
    window.contactSupport = contactSupport;

    // Feedback functions
    window.submitFeedback = submitFeedback;
    window.setupStarRating = setupStarRating;
    window.updateStarDisplay = updateStarDisplay;
    window.updateStarHover = updateStarHover;

    // New features
    window.openAIChat = openAIChat;
    window.openNotifications = openNotifications;
    window.openCalendar = openCalendar;
    window.trackNutrition = trackNutrition;
    window.shareFavorites = shareFavorites;
    window.suggestFoodByMood = suggestFoodByMood;
    window.startVoiceOrder = startVoiceOrder;
    window.openARPreview = openARPreview;
    window.logEcoAction = logEcoAction;
    window.openMysteryMealBox = openMysteryMealBox;
    window.openMysteryBox = openMysteryBox;
    window.rotateFood = rotateFood;
    window.toggleMobileMenu = toggleMobileMenu;

    // Health features
    window.openDietaryPreferences = openDietaryPreferences;
    window.openHealthDashboard = openHealthDashboard;
    window.openMealPlanner = openMealPlanner;
    window.setHealthGoal = setHealthGoal;
    window.trackMealNutrition = trackMealNutrition;

    // Added functions for new FAB items
    window.openOrderTracker = openOrderTracker;
    window.openAdvancedSearch = openAdvancedSearch;
    window.openLoyaltyProgram = openLoyaltyProgram;
    window.openSocialFeed = openSocialFeed;
    window.openPreOrderSystem = openPreOrderSystem;

    // Killer App Features to FAB
    window.openClassDelivery = openClassDelivery;
    window.openMealSubscriptions = openMealSubscriptions;
    window.openSquadOrders = openSquadOrders;
    window.openCampusWallet = openCampusWallet;
    window.openMysteryMealBox = openMysteryMealBox;
    window.openNutritionProfile = openNutritionProfile;
    window.openSmartLockerPickup = openSmartLockerPickup;
    window.openGamificationRewards = openGamificationRewards;
    window.openFaceIdLogin = openFaceIdLogin;

    // Missing function declarations
    window.openFaceId = openFaceId;
    window.openHeartbeat = openHeartbeat;
    window.openSquadOrdering = openSquadOrdering;
    window.closeFaceId = closeFaceId;
    window.closeHeartbeat = closeHeartbeat;
    window.closeSquadModal = closeSquadModal;
}

// --- Enhanced Food Database with New Features ---
// Remove any duplicate declarations - keeping only HEALTHY_FOOD_DATABASE
const HEALTHY_FOOD_DATABASE = {
    "🍎 Fresh Fruits": [
        { name: "🍎 Red Apple", description: "Crisp and sweet, excellent source of fiber and vitamin C", calories: 95, healthScore: 9, price: 15, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=300&fit=crop" },
        { name: "🍏 Green Apple", description: "Tart and refreshing, loaded with antioxidants", calories: 90, healthScore: 9, price: 15, image: "https://images.unsplash.com/photo-1567306226416-2e8f0efdc88ce?w=400&h=300&fit=crop" },
        { name: "🍌 Banana", description: "Energy-boosting, rich in potassium and natural sugars", calories: 105, healthScore: 8, price: 10, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=300&fit=crop" },
        { name: "🍊 Orange", description: "Packed with Vitamin C, refreshing citrus fruit", calories: 62, healthScore: 9, price: 12, image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400&h=300&fit=crop" },
        { name: "🥝 Kiwi Fruit", description: "Tropical superfruit with vitamin K and digestive enzymes", calories: 42, healthScore: 10, price: 20, image: "https://images.unsplash.com/photo-1585059895524-72359e06433a?w=400&h=300&fit=crop" },

        { name: "🍇 Fresh Grapes", description: "Sweet cluster grapes, rich in resveratrol", calories: 62, healthScore: 8, price: 25, image: "https://images.unsplash.com/photo-1537640538966-7cf6a04bca6?w=400&h=300&fit=crop" },

        { name: "🍓 Strawberry Bowl", description: "Fresh strawberries loaded with vitamin C and fiber", calories: 45, healthScore: 9, price: 28, image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=300&fit=crop" },
        { name: "🍑 Pomegranate", description: "Antioxidant-rich superfruit with anti-aging properties", calories: 134, healthScore: 10, price: 40, image: "https://images.unsplash.com/photo-1544806218-7e1d11b7ac17?w=400&h=300&fit=crop" },

        { name: "🍉 Watermelon", description: "Hydrating summer fruit with lycopene", calories: 30, healthScore: 8, price: 20, image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?w=400&h=300&fit=crop" },


    ],
    "🥗 Fresh Vegetables Salad": [
        { name: "🥕 Carrot Sticks", description: "Crunchy and good for eye health, rich in beta-carotene", calories: 25, healthScore: 9, price: 15, image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=300&fit=crop" },
        { name: "🥒 Cucumber Slices", description: "Hydrating and refreshing, perfect for hot days", calories: 8, healthScore: 8, price: 12, image: "https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400&h=300&fit=crop" },

        { name: "🥬 Fresh Spinach", description: "Iron-rich leafy greens with folate and nutrients", calories: 7, healthScore: 10, price: 18, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop" },

        { name: "🥗 Mixed Green Salad", description: "Fresh mixed greens with cucumber and tomatoes", calories: 30, healthScore: 10, price: 35, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },

    ],
    "🌾 Whole Grains & Cereals": [
        { name: "🥪 Whole Wheat Sandwich", description: "Fresh vegetables and hummus on nutritious whole grain bread", calories: 220, healthScore: 8, price: 45, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop" },
        { name: "🥣 Oatmeal Bowl", description: "Warm steel-cut oats topped with fresh fruits and nuts", calories: 150, healthScore: 9, price: 35, image: "https://images.unsplash.com/photo-1517673132405-a56a6b18caf?w=400&h=300&fit=crop" },
        { name: "🍚 Quinoa Power Bowl", description: "Complete protein grain with colorful mixed vegetables", calories: 220, healthScore: 9, price: 65, image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop" },
        { name: "🍞 Multigrain Toast", description: "Toasted multigrain bread with seeds and nuts", calories: 165, healthScore: 8, price: 25, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop" },
        { name: "🥜 Granola Bowl", description: "Homemade granola with yogurt and honey", calories: 180, healthScore: 8, price: 40, image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop" },
        { name: "🌾 Brown Rice Bowl", description: "Nutty brown rice with steamed vegetables", calories: 195, healthScore: 8, price: 35, image: "https://images.unsplash.com/photo-1586201375761-8e865001e31c?w=400&h=300&fit=crop" },
        { name: "🥙 Whole Wheat Wrap", description: "Mediterranean wrap with hummus and fresh vegetables", calories: 210, healthScore: 8, price: 50, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop" },
        { name: "🍝 Whole Grain Pasta", description: "Nutritious pasta with vegetable sauce", calories: 240, healthScore: 7, price: 55, image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop" }
    ],
    "🥛 Healthy Beverages": [
        { name: "🥥 Coconut Water", description: "Natural electrolyte drink from young coconuts", calories: 45, healthScore: 7, price: 30, image: "https://images.unsplash.com/photo-1585121267405-24a4ee8a5cde?w=400&h=300&fit=crop" },
        { name: "🥛 Almond Milk", description: "Creamy plant-based milk with natural vanilla", calories: 40, healthScore: 8, price: 25, image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop" },
        { name: "☕ Herbal Tea", description: "Caffeine-free herbal blend with chamomile", calories: 0, healthScore: 9, price: 20, image: "https://images.unsplash.com/photo-1594631661960-1f82ef0ca1114?w=400&h=300&fit=crop" },
        { name: "🍋 Lemon Water", description: "Refreshing water infused with fresh lemon", calories: 7, healthScore: 8, price: 10, image: "https://images.unsplash.com/photo-1541963463532-d682d92c34d19?w=400&h=300&fit=crop" },
        { name: "💚 Detox Water", description: "Cucumber, mint, and lime infused water", calories: 5, healthScore: 9, price: 15, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" },
        { name: "🥤 Fresh Orange Juice", description: "Freshly squeezed orange juice with pulp", calories: 110, healthScore: 8, price: 35, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=300&fit=crop" },
        { name: "🍎 Apple Juice", description: "Pure apple juice without added sugar", calories: 95, healthScore: 7, price: 30, image: "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop" },
        { name: "🥒 Cucumber Mint Water", description: "Refreshing cucumber water with fresh mint", calories: 8, healthScore: 9, price: 18, image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop" },
        { name: "🍃 Green Tea", description: "Antioxidant-rich green tea", calories: 2, healthScore: 9, price: 15, image: "https://images.unsplash.com/photo-1627435601361-ec2f5b1d0e5?w=400&h=300&fit=crop" },
        { name: "🥤 Fresh Lemonade", description: "Homemade lemonade with mint", calories: 85, healthScore: 7, price: 25, image: "https://images.unsplash.com/photo-152337168370702-3d64883564?w=400&h=300&fit=crop" }
    ],
    "🥜 Protein & Nuts": [
        { name: "🥜 Mixed Nuts", description: "Almonds, walnuts, and cashews mix for brain health", calories: 160, healthScore: 8, price: 35, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" },
        { name: "🌰 Roasted Seeds", description: "Sunflower and pumpkin seeds for healthy fats", calories: 140, healthScore: 8, price: 30, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop" },
        { name: "🥛 Greek Yogurt", description: "Probiotic-rich Greek yogurt with live cultures", calories: 130, healthScore: 9, price: 35, image: "https://images.unsplash.com/photo-1488477304112-4944851de03d?w=400&h=300&fit=crop" }
    ],
    "🍲 Nutritious Meals": [
        { name: "🍲 Vegetable Soup", description: "Hearty mixed vegetable soup with herbs", calories: 90, healthScore: 9, price: 40, image: "https://images.unsplash.com/photo-1547592180-8554?w=400&h=300&fit=crop" },
        { name: "🥘 Dal Curry", description: "Traditional Indian lentil curry with spices", calories: 180, healthScore: 9, price: 50, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop" },
        { name: "🍜 Miso Soup", description: "Traditional Japanese soup with seaweed and tofu", calories: 84, healthScore: 8, price: 35, image: "https://images.unsplash.com/photo-1606491956689-2e866880c84?w=400&h=300&fit=crop" },
        { name: "🥗 Buddha Bowl", description: "Colorful bowl with quinoa, vegetables, and tahini", calories: 250, healthScore: 10, price: 70, image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" },
        { name: "🌮 Veggie Tacos", description: "Corn tortillas filled with black beans and vegetables", calories: 210, healthScore: 8, price: 55, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop" }
    ]
};

// --- App State ---
let appState = {
    currentFilter: 'all',
    itemsChecked: 0,
    healthyChoices: 0,
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
    cart: JSON.parse(localStorage.getItem('cart') || '[]'),
    userHealthScore: 0,
    showTips: false,
    fabMenuOpen: false,
    darkMode: JSON.parse(localStorage.getItem('darkMode') || 'false')
};

// --- Dark Mode Toggle ---
function toggleDarkMode() {
    appState.darkMode = !appState.darkMode;
    localStorage.setItem('darkMode', JSON.stringify(appState.darkMode));

    document.body.classList.toggle('dark-mode', appState.darkMode);

    // Update dark mode button icon
    const darkModeBtn = document.querySelector('.dark-mode-btn');
    if (darkModeBtn) {
        darkModeBtn.innerHTML = appState.darkMode ?
            '<i class="fas fa-sun"></i><span>Light Mode</span>' :
            '<i class="fas fa-moon"></i><span>Dark Mode</span>';
    }

    showToast(appState.darkMode ? '🌙 Dark mode enabled' : '☀️ Light mode enabled');
}

// --- Initialize Dark Mode ---
function initializeDarkMode() {
    try {
        if (appState.darkMode && document.body) {
            document.body.classList.add('dark-mode');
        }
    } catch (error) {
        console.warn('Error initializing dark mode:', error);
    }
}

// --- Bottom Navigation Functions ---
let floatingMenuOpen = false;
let currentMode = {
    study: false,
    eco: false,
    focus: false,
    gaming: false
};

function toggleFloatingMenu() {
    floatingMenuOpen = !floatingMenuOpen;
    const floatMenu = document.getElementById('float-menu');
    const mainFab = document.querySelector('.main-fab');

    if (floatMenu && mainFab) {
        if (floatingMenuOpen) {
            floatMenu.classList.add('active');
            mainFab.style.transform = 'rotate(45deg)';
        } else {
            floatMenu.classList.remove('active');
            mainFab.style.transform = 'rotate(0deg)';
        }
    }
}

// Mode Toggle Functions
function toggleStudyMode() {
    currentMode.study = !currentMode.study;
    const btn = document.getElementById('study-mode-btn');

    if (currentMode.study) {
        document.body.classList.add('study-mode');
        btn.classList.add('active');
        showToast('📚 Study Mode activated - Minimalist interface enabled');
    } else {
        document.body.classList.remove('study-mode');
        btn.classList.remove('active');
        showToast('📚 Study Mode deactivated');
    }
}

function toggleEcoMode() {
    currentMode.eco = !currentMode.eco;
    const btn = document.getElementById('eco-mode-btn');

    if (currentMode.eco) {
        document.body.classList.add('eco-mode');
        btn.classList.add('active');
        showToast('🌱 Eco Mode activated - Sustainable choices highlighted');
    } else {
        document.body.classList.remove('eco-mode');
        btn.classList.remove('active');
        showToast('🌱 Eco Mode deactivated');
    }
}

function toggleFocusMode() {
    currentMode.focus = !currentMode.focus;
    const btn = document.getElementById('focus-mode-btn');

    if (currentMode.focus) {
        document.body.classList.add('focus-mode');
        btn.classList.add('active');
        showToast('🎯 Focus Mode activated - Distractions minimized');
    } else {
        document.body.classList.remove('focus-mode');
        btn.classList.remove('active');
        showToast('🎯 Focus Mode deactivated');
    }
}

function toggleGamingMode() {
    currentMode.gaming = !currentMode.gaming;
    const gamingPanel = document.getElementById('gaming-panel');

    if (currentMode.gaming) {
        if (gamingPanel) gamingPanel.style.display = 'block';
        document.body.classList.add('gaming-mode');
        showToast('🎮 Gaming Mode activated - Battle Pass and XP tracking enabled!');
        startGamingFeatures();
    } else {
        if (gamingPanel) gamingPanel.style.display = 'none';
        document.body.classList.remove('gaming-mode');
        showToast('🎮 Gaming Mode deactivated');
    }
}

function startGamingFeatures() {
    // Initialize gaming features
    updateBattlePass();
    showRandomBadge();
}

function updateBattlePass() {
    const xpFill = document.querySelector('.xp-fill');
    const powerFill = document.querySelector('.power-fill');

    if (xpFill) {
        const currentXP = Math.floor(Math.random() * 2000) + 1000;
        const percentage = (currentXP / 2000) * 100;
        xpFill.style.width = percentage + '%';
    }

    if (powerFill) {
        const currentPower = Math.floor(Math.random() * 100) + 50;
        powerFill.style.width = currentPower + '%';
    }
}

function showRandomBadge() {
    const badges = [
        { name: 'Health Champion', icon: '🏆', description: 'Reached 100 health score!' },
        { name: 'Nutrition Expert', icon: '🌟', description: 'Analyzed 50 food items!' },
        { name: 'Eco Warrior', icon: '🌱', description: 'Chose sustainable options!' },
        { name: 'Squad Leader', icon: '👥', description: 'Led 5 group orders!' }
    ];

    const randomBadge = badges[Math.floor(Math.random() * badges.length)];

    setTimeout(() => {
        const notification = document.getElementById('badgeNotification');
        if (notification) {
            notification.querySelector('.badge-content h4').textContent = randomBadge.name + ' Unlocked!';
            notification.querySelector('.badge-content p').textContent = randomBadge.description;
            notification.querySelector('.badge-icon').textContent = randomBadge.icon;
            notification.style.display = 'block';

            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }
    }, 2000);
}

// Feature Functions
function openQuickOrder() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>⚡ <span class="rainbow-text">Quick Order</span></h3>
                <span class="close-modal" onclick="closeQuickOrder()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="quick-order-container">
                    <h4 class="gradient-text">🚀 Lightning Fast Ordering</h4>
                    <div class="quick-options">
                        <button class="quick-option-btn rainbow-btn" onclick="quickOrderItem('🍎 Apple', 15)">
                            🍎 Apple - ₹15
                        </button>
                        <button class="quick-option-btn gradient-btn" onclick="quickOrderItem('🍌 Banana', 10)">
                            🍌 Banana - ₹10
                        </button>
                        <button class="quick-option-btn colorful-btn" onclick="quickOrderItem('🥛 Greek Yogurt', 35)">
                            🥛 Greek Yogurt - ₹35
                        </button>
                        <button class="quick-option-btn rainbow-btn" onclick="quickOrderItem('🥗 Mixed Salad', 35)">
                            🥗 Mixed Salad - ₹35
                        </button>
                    </div>
                    <p class="colorful-text">⚡ Items added instantly to cart!</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeQuickOrder = () => modal.remove();
}

function quickOrderItem(name, price) {
    addToCart(name, price);
    showToast(`⚡ ${name} added instantly!`);
}

function openEmergencyOrder() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🚨 <span class="rainbow-text">Emergency Order</span></h3>
                <span class="close-modal" onclick="closeEmergencyOrder()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="emergency-container">
                    <h4 class="gradient-text">🆘 Super Fast Emergency Food</h4>
                    <p class="colorful-text">For urgent hunger situations - Instant preparation!</p>
                    <div class="emergency-options">
                        <button class="emergency-btn" onclick="orderEmergencyItem('🍌 Energy Banana', 10)">
                            🍌 Energy Banana<br><small>Ready in 30 seconds</small>
                        </button>
                        <button class="emergency-btn" onclick="orderEmergencyItem('🥛 Quick Milk', 20)">
                            🥛 Quick Milk<br><small>Instant energy</small>
                        </button>
                        <button class="emergency-btn" onclick="orderEmergencyItem('🍪 Energy Biscuits', 25)">
                            🍪 Energy Biscuits<br><small>Quick sugar boost</small>
                        </button>
                    </div>
                    <p class="warning-text">⚠️ Emergency orders get highest priority!</p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeEmergencyOrder = () => modal.remove();
}

function orderEmergencyItem(name, price) {
    addToCart(name, price);
    showToast(`🚨 EMERGENCY ORDER: ${name} - Priority processing!`);
    closeEmergencyOrder();
}

function openBirthdaySpecial() {
    const modal = document.getElementById('birthdayModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function openSettings() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>⚙️ <span class="rainbow-text">App Settings</span></h3>
                <span class="close-modal" onclick="closeSettings()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="settings-container">
                    <div class="settings-section">
                        <h4 class="gradient-text">🎨 Appearance</h4>
                        <div class="setting-item">
                            <span class="colorful-text">Dark Mode</span>
                            <button class="toggle-btn" onclick="toggleDarkMode()" id="dark-toggle">
                                ${appState.darkMode ? '🌙 Enabled' : '☀️ Disabled'}
                            </button>
                        </div>
                        <div class="setting-item">
                            <span class="colorful-text">Gaming Mode</span>
                            <button class="toggle-btn" onclick="toggleGamingMode()" id="gaming-toggle">
                                ${currentMode.gaming ? '🎮 Enabled' : '🎯 Disabled'}
                            </button>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4 class="gradient-text">🔔 Notifications</h4>
                        <div class="setting-item">
                            <span class="colorful-text">Order Updates</span>
                            <button class="toggle-btn" onclick="toggleNotifications('orders')">🔔 Enabled</button>
                        </div>
                        <div class="setting-item">
                            <span class="colorful-text">Health Reminders</span>
                            <button class="toggle-btn" onclick="toggleNotifications('health')">❤️ Enabled</button>
                        </div>
                    </div>

                    <div class="settings-section">
                        <h4 class="gradient-text">📱 App Info</h4>
                        <div class="info-item">
                            <span class="colorful-text">Version:</span>
                            <span class="gradient-text">P.B.L v2.0</span>
                        </div>
                        <div class="info-item">
                            <span class="colorful-text">School:</span>
                            <span class="gradient-text">Silverline Prestige</span>
                        </div>
                        <div class="info-item">
                            <span class="colorful-text">Developer:</span>
                            <span class="gradient-text">Viraj Chaudhary</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeSettings = () => modal.remove();
}

function toggleNotifications(type) {
    showToast(`🔔 ${type} notifications toggled!`);
}

// Enhanced switchTab function for new menu tab
const originalSwitchTab = switchTab;
function switchTab(tabName) {
    // Handle new menu tab
    if (tabName === 'menu') {
        // Remove active class from all tabs and panels
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
        });

        // Add active class to selected tab and panel
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Create menu panel if it doesn't exist
        let menuPanel = document.getElementById(`${tabName}-panel`);
        if (!menuPanel) {
            menuPanel = document.createElement('div');
            menuPanel.className = 'tab-panel';
            menuPanel.id = `${tabName}-panel`;
            menuPanel.innerHTML = `
                <div class="menu-panel-content">
                    <h2 class="gradient-text">🍽️ Complete Menu</h2>
                    <div class="menu-categories">
                        <div class="menu-category-card" onclick="filterMenu('🍎 Fresh Fruits')">
                            <i class="fas fa-apple-alt"></i>
                            <h4>Fresh Fruits</h4>
                            <p>Seasonal & Healthy</p>
                        </div>
                        <div class="menu-category-card" onclick="filterMenu('🥗 Fresh Vegetables')">
                            <i class="fas fa-carrot"></i>
                            <h4>Fresh Vegetables</h4>
                            <p>Farm Fresh Daily</p>
                        </div>
                        <div class="menu-category-card" onclick="filterMenu('🌾 Whole Grains & Cereals')">
                            <i class="fas fa-bread-slice"></i>
                            <h4>Whole Grains</h4>
                            <p>Energy & Nutrition</p>
                        </div>
                        <div class="menu-category-card" onclick="filterMenu('🥛 Healthy Beverages')">
                            <i class="fas fa-glass-water"></i>
                            <h4>Beverages</h4>
                            <p>Refreshing & Natural</p>
                        </div>
                        <div class="menu-category-card" onclick="filterMenu('🥜 Protein & Nuts')">
                            <i class="fas fa-seedling"></i>
                            <h4>Proteins & Nuts</h4>
                            <p>Strength Building</p>
                        </div>
                        <div class="menu-category-card" onclick="filterMenu('🍲 Nutritious Meals')">
                            <i class="fas fa-utensils"></i>
                            <h4>Complete Meals</h4>
                            <p>Balanced Nutrition</p>
                        </div>
                    </div>
                </div>
            `;
            document.getElementById('tab-content').appendChild(menuPanel);
        }
        menuPanel.classList.add('active');

        currentTab = tabName;
        return;
    }

    // Use original function for other tabs
    originalSwitchTab(tabName);
}

function filterMenu(category) {
    // Switch to home tab and filter
    switchTab('home');
    appState.currentFilter = category;
    updateFilterButtons();
    drawMenu();
    showToast(`🔍 Filtered to: ${category}`);
}

// Enhanced initialization with error handling
function initializeApp() {
    try {
        makeGloballyAccessible();
        initializeDarkMode();

        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initializeDOMElements();
            });
        } else {
            initializeDOMElements();
        }

        console.log('App initialized with comprehensive bottom navigation');
    } catch (error) {
        console.error('Error during app initialization:', error);
        showToast('⚠️ Some features may not work properly. Please refresh the page.');
    }
}

function initializeDOMElements() {
    try {
        // Initialize DOM elements safely
        menuDisplayDiv = document.getElementById('menu-display');
        itemInputField = document.getElementById('itemInput');
        messageDisplay = document.getElementById('message-display');
        checkButton = document.getElementById('checkButton');

        if (menuDisplayDiv) drawMenu();
        if (document.body) {
            document.body.style.paddingBottom = '140px';
        }

        // Initialize health profile if functions exist
        if (typeof loadHealthProfile === 'function') {
            loadHealthProfile();
        }
        if (typeof setupNutritionTracker === 'function') {
            setupNutritionTracker();
        }

        updateStats();
        createFilterButtons();

    } catch (error) {
        console.warn('Some DOM elements not found:', error);
    }
}

// --- Modern Tab Navigation System ---
let currentTab = 'home';

function switchTab(tabName) {
    // Remove active class from all tabs and panels
    const tabItems = document.querySelectorAll('.tab-item, .nav-tab');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabItems.forEach(tab => {
        if (tab && tab.classList) {
            tab.classList.remove('active');
        }
    });

    tabPanels.forEach(panel => {
        if (panel && panel.classList) {
            panel.classList.remove('active');
        }
    });

    // Add active class to selected tab and panel
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-panel`).classList.add('active');

    currentTab = tabName;

    // Update content based on tab
    if (tabName === 'cart') {
        updateCartPanelDisplay();
    } else if (tabName === 'health') {
        updateHealthPanelDisplay();
    }
}

function updateCartPanelDisplay() {
    const cartPanelItems = document.getElementById('cart-panel-items');
    const cartBadge = document.getElementById('cart-badge');

    if (appState.cart.length === 0) {
        cartPanelItems.innerHTML = '<p class="empty-cart gradient-text">Your cart is empty. Add some healthy items! 🛒</p>';
        cartBadge.textContent = '0';
        cartBadge.style.display = 'none';
    } else {
        let cartHTML = '';
        appState.cart.forEach(item => {
            cartHTML += `
                <div class="cart-panel-item">
                    <span class="colorful-text">${item.name}</span>
                    <span class="gradient-text">x${item.quantity} - ₹${item.price * item.quantity}</span>
                </div>
            `;
        });
        cartPanelItems.innerHTML = cartHTML;
        cartBadge.textContent = appState.cart.length;
        cartBadge.style.display = 'flex';
    }
}

function updateHealthPanelDisplay() {
    const healthScoreDisplay = document.getElementById('health-score-display');
    const caloriesToday = document.getElementById('calories-today');

    if (healthScoreDisplay) {
        healthScoreDisplay.textContent = Math.min(100, Math.max(0, appState.userHealthScore));
    }

    if (caloriesToday && userHealthProfile.todaysIntake) {
        caloriesToday.textContent = Math.round(userHealthProfile.todaysIntake.calories || 0);
    }
}

function sendMiniChatMessage() {
    const input = document.getElementById('mini-chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('mini-chat-messages');

    // Add user message
    chatMessages.innerHTML += `
        <div class="user-message-mini">
            <span class="colorful-text">${message}</span>
        </div>
    `;

    // Simple AI responses for mini chat
    setTimeout(() => {
        const responses = [
            "🥗 Try our quinoa bowl for complete protein!",
            "🍎 Apples are great for sustained energy!",
            "💧 Don't forget to stay hydrated!",
            "🌟 Great choice! That's very nutritious!",
            "🥜 Nuts are perfect for healthy fats!"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        chatMessages.innerHTML += `
            <div class="ai-message-mini">
                <span class="gradient-text">${randomResponse}</span>
            </div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// --- New Features ---

// AI Chat Assistant
function openAIChat() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'aiChatModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-robot"></i> <span class="rainbow-text">AI Nutrition Assistant</span></h3>
                <span class="close-modal" onclick="closeAIChat()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="chat-container">
                    <div class="chat-messages" id="chat-messages">
                        <div class="ai-message">
                            <div class="message-bubble ai">
                                <span class="gradient-text">🌟 Hi! I'm your AI nutrition assistant! Ask me about healthy eating, recipes, or nutrition facts!</span>
                            </div>
                        </div>
                    </div>
                    <div class="chat-input-container">
                        <input type="text" id="chat-input" placeholder="Ask me about nutrition..." class="colorful-placeholder">
                        <button onclick="sendChatMessage()" class="rainbow-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeAIChat = () => modal.remove();
    window.sendChatMessage = sendChatMessage;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;

    const chatMessages = document.getElementById('chat-messages');

    // Add user message
    chatMessages.innerHTML += `
        <div class="user-message">
            <div class="message-bubble user">
                <span class="colorful-text">${message}</span>
            </div>
        </div>
    `;

    // Simulate AI response
    setTimeout(() => {
        const responses = [
            "🥗 Great question! I recommend eating 5-7 servings of fruits and vegetables daily for optimal health!",
            "🌟 Did you know that colorful foods provide different nutrients? Try to eat a rainbow of fruits and vegetables!",
            "💪 Protein is essential for growth! Try our quinoa bowl or lentil soup for plant-based protein!",
            "💧 Stay hydrated! Aim for 8 glasses of water daily, or try our fresh coconut water!",
            "🍎 Apples are amazing! They're high in fiber and help keep you full between meals!"
        ];

        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        chatMessages.innerHTML += `
            <div class="ai-message">
                <div class="message-bubble ai">
                    <span class="gradient-text">${randomResponse}</span>
                </div>
            </div>
        `;

        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);

    input.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Smart Notifications
function openNotifications() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'notificationsModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>🔔 <span class="rainbow-text">Smart Notifications</span></h3>
                <span class="close-modal" onclick="closeNotifications()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="notification-item new">
                    <i class="fas fa-star gradient-text"></i>
                    <div>
                        <h4 class="colorful-text">🎉 Health Goal Achieved!</h4>
                        <p class="gradient-text">You've reached 80 health points! Keep it up!</p>
                        <small>2 minutes ago</small>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fas fa-utensils colorful-text"></i>
                    <div>
                        <h4 class="colorful-text">🍎 Daily Special Available</h4>
                        <p class="gradient-text">Fresh quinoa power bowl with 20% off today!</p>
                        <small>1 hour ago</small>
                    </div>
                </div>
                <div class="notification-item">
                    <i class="fas fa-heart rainbow-text"></i>
                    <div>
                        <h4 class="colorful-text">💚 Nutrition Tip</h4>
                        <p class="gradient-text">Try adding more colorful vegetables to your meals!</p>
                        <small>3 hours ago</small>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeNotifications = () => modal.remove();
}

// Meal Calendar
function openCalendar() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'calendarModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>📅 <span class="rainbow-text">Meal Planning Calendar</span></h3>
                <span class="close-modal" onclick="closeCalendar()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="calendar-container">
                    <div class="calendar-header">
                        <h4 class="gradient-text">🗓️ This Week's Healthy Meal Plan</h4>
                    </div>
                    <div class="calendar-grid">
                        <div class="calendar-day">
                            <h5 class="colorful-text">Monday</h5>
                            <div class="meal-item">🍎 Apple & Oatmeal</div>
                            <div class="meal-item">🥗 Quinoa Bowl</div>
                        </div>
                        <div class="calendar-day">
                            <h5 class="colorful-text">Tuesday</h5>
                            <div class="meal-item">🍌 Banana Smoothie</div>
                            <div class="meal-item">🥪 Veggie Sandwich</div>
                        </div>
                        <div class="calendar-day">
                            <h5 class="colorful-text">Wednesday</h5>
                            <div class="meal-item">🫐 Berry Bowl</div>
                            <div class="meal-item">🥦 Broccoli & Rice</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeCalendar = () => modal.remove();
}

// Enhanced Health Dashboard
function openHealthDashboard() {
    loadHealthProfile();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'healthDashboardModal';
    modal.innerHTML = `
        <div class="modal-content large-modal">
            <div class="modal-header">
                <h3>🏥 <span class="rainbow-text">Complete Health Dashboard</span></h3>
                <span class="close-modal" onclick="closeHealthDashboard()">&times;</span>
            </div>
            <div class="modal-body">
                ${generateHealthDashboardContent()}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeHealthDashboard = () => modal.remove();
}

function generateHealthDashboardContent() {
    const target = userHealthProfile.dailyCalorieTarget || 2000;
    const current = userHealthProfile.todaysIntake.calories || 0;
    const calPercentage = Math.round((current / target) * 100);

    const proteinTarget = Math.round(target * 0.15 / 4); // 15% of calories from protein
    const currentProtein = userHealthProfile.todaysIntake.protein || 0;
    const proteinPercentage = Math.round((currentProtein / proteinTarget) * 100);

    return `
        <div class="health-dashboard">
            <!-- BMI & Profile Section -->
            <div class="dashboard-section">
                <h4 class="gradient-text">👤 Your Health Profile</h4>
                <div class="profile-cards">
                    <div class="profile-card">
                        <div class="profile-metric">
                            <span class="metric-value rainbow-text">${userHealthProfile.bmi?.toFixed(1) || 'N/A'}</span>
                            <span class="metric-label">BMI</span>
                        </div>
                    </div>
                    <div class="profile-card">
                        <div class="profile-metric">
                            <span class="metric-value colorful-text">${userHealthProfile.healthGoal?.replace('_', ' ').toUpperCase() || 'NOT SET'}</span>
                            <span class="metric-label">Health Goal</span>
                        </div>
                    </div>
                    <div class="profile-card">
                        <div class="profile-metric">
                            <span class="metric-value gradient-text">${target}</span>
                            <span class="metric-label">Daily Target (cal)</span>
                        </div>
                    </div>
                </div>
                <button class="btn-secondary" onclick="openBmiCalculator(); closeHealthDashboard();">
                    <i class="fas fa-calculator"></i> Update Health Profile
                </button>
            </div>

            <!-- Today's Nutrition -->
            <div class="dashboard-section">
                <h4 class="gradient-text">📊 Today's Nutrition Progress</h4>
                <div class="nutrition-progress-grid">
                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="colorful-text">🔥 Calories</span>
                            <span class="gradient-text">${current} / ${target}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(calPercentage, 100)}%; background: ${calPercentage > 110 ? '#ef4444' : calPercentage > 90 ? '#10b981' : '#f59e0b'}"></div>
                        </div>
                        <span class="progress-text">${calPercentage}%</span>
                    </div>

                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="colorful-text">🥩 Protein</span>
                            <span class="gradient-text">${currentProtein.toFixed(1)}g / ${proteinTarget}g</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${Math.min(proteinPercentage, 100)}%; background: linear-gradient(90deg, #8b5cf6, #a855f7)"></div>
                        </div>
                        <span class="progress-text">${proteinPercentage}%</span>
                    </div>

                    <div class="progress-item">
                        <div class="progress-header">
                            <span class="colorful-text">💧 Hydration Goal</span>
                            <span class="gradient-text">6 / 8 glasses</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: 75%; background: linear-gradient(90deg, #0ea5e9, #06b6d4)"></div>
                        </div>
                        <span class="progress-text">75%</span>
                    </div>
                </div>
            </div>

            <!-- Today's Meals -->
            <div class="dashboard-section">
                <h4 class="gradient-text">🍽️ Today's Meals</h4>
                <div class="meals-timeline">
                    ${generateMealsTimeline()}
                </div>
                ${userHealthProfile.todaysIntake.meals.length === 0 ? '<p class="empty-state colorful-text">No meals tracked today. Add items to cart to start tracking!</p>' : ''}
            </div>

            <!-- Health Recommendations -->
            <div class="dashboard-section">
                <h4 class="gradient-text">💡 Smart Recommendations</h4>
                <div class="recommendations-list">
                    ${generateSmartRecommendations()}
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="dashboard-actions">
                <button class="action-btn rainbow-btn" onclick="openDietaryPreferences(); closeHealthDashboard();">
                    <i class="fas fa-leaf"></i> Dietary Preferences
                </button>
                <button class="action-btn gradient-btn" onclick="openMealPlanner(); closeHealthDashboard();">
                    <i class="fas fa-calendar-alt"></i> Meal Planner
                </button>
                <button class="action-btn colorful-btn" onclick="resetDailyTracking();">
                    <i class="fas fa-refresh"></i> Reset Day
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeHealthDashboard = () => modal.remove();
}

function generateMealsTimeline() {
    if (!userHealthProfile.todaysIntake.meals || userHealthProfile.todaysIntake.meals.length === 0) {
        return '<div class="empty-timeline colorful-text">Start your day by adding healthy meals to your cart!</div>';
    }

    return userHealthProfile.todaysIntake.meals.map(meal => {
        const time = new Date(meal.timestamp).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit'
        });

        return `
            <div class="meal-item">
                <div class="meal-time gradient-text">${time}</div>
                <div class="meal-details">
                    <div class="meal-name colorful-text">${meal.name}</div>
                    <div class="meal-nutrition rainbow-text">${meal.calories} cal • ${meal.protein.toFixed(1)}g protein</div>
                </div>
            </div>
        `;
    }).join('');
}

function generateSmartRecommendations() {
    const recommendations = [];
    const currentCalories = userHealthProfile.todaysIntake.calories || 0;
    const target = userHealthProfile.dailyCalorieTarget || 2000;
    const remaining = target - currentCalories;

    if (remaining > 500) {
        recommendations.push('🍎 You have plenty of calories left! Try a nutritious quinoa bowl or smoothie.');
    } else if (remaining > 200) {
        recommendations.push('🥗 Perfect time for a light, healthy snack like fruits or nuts.');
    } else if (remaining > 0) {
        recommendations.push('💧 Almost at your goal! Focus on hydration and light activities.');
    } else {
        recommendations.push('✅ You\'ve reached your calorie target! Focus on hydration and light activities.');
    }

    if (userHealthProfile.healthGoal === 'weight_loss') {
        recommendations.push('🔥 For weight loss: Choose high-protein, low-calorie options from our menu.');
    } else if (userHealthProfile.healthGoal === 'muscle_gain') {
        recommendations.push('💪 For muscle gain: Don\'t forget protein-rich options like nuts and yogurt.');
    }

    if (userHealthProfile.todaysIntake.meals.length === 0) {
        recommendations.push('🌅 Start your day right with a healthy breakfast from our menu!');
    }

    return recommendations.map(rec => `<div class="recommendation-item colorful-text">• ${rec}</div>`).join('');
}

function resetDailyTracking() {
    if (confirm('🔄 Reset today\'s nutrition tracking? This cannot be undone.')) {
        userHealthProfile.todaysIntake = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            meals: []
        };
        saveHealthProfile();
        showToast('✅ Daily tracking reset successfully!');
        closeHealthDashboard();
    }
}

// Enhanced Meal Planner
function openMealPlanner() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'mealPlannerModal';
    modal.innerHTML = `
        <div class="modal-content large-modal">
            <div class="modal-header">
                <h3>📅 <span class="rainbow-text">Smart Meal Planner</span></h3>
                <span class="close-modal" onclick="closeMealPlanner()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="meal-planner">
                    <div class="planner-header">
                        <h4 class="gradient-text">🎯 Goal-Based Meal Planning</h4>
                        <p class="colorful-text">Get personalized meal suggestions based on your health goals</p>
                    </div>

                    <div class="meal-plan-grid">
                        <div class="meal-plan-section">
                            <h5 class="gradient-text">🌅 Breakfast Suggestions</h5>
                            ${generateMealSuggestions('breakfast')}
                        </div>

                        <div class="meal-plan-section">
                            <h5 class="gradient-text">🌞 Lunch Suggestions</h5>
                            ${generateMealSuggestions('lunch')}
                        </div>

                        <div class="meal-plan-section">
                            <h5 class="gradient-text">🌙 Snack Suggestions</h5>
                            ${generateMealSuggestions('snacks')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeMealPlanner = () => modal.remove();
}

function generateMealSuggestions(mealType) {
    const suggestions = {
        breakfast: [
            { name: '🥣 Oatmeal Bowl', reason: 'High fiber, sustained energy', cal: 150 },
            { name: '🍌 Banana', reason: 'Quick energy, potassium', cal: 105 },
            { name: '🥛 Greek Yogurt', reason: 'Protein-rich, probiotics', cal: 130 }
        ],
        lunch: [
            { name: '🍚 Quinoa Power Bowl', reason: 'Complete protein, balanced', cal: 220 },
            { name: '🥪 Whole Wheat Sandwich', reason: 'Complex carbs, filling', cal: 220 },
            { name: '🥗 Mixed Green Salad', reason: 'Low calorie, nutrient dense', cal: 30 }
        ],
        snacks: [
            { name: '🍎 Red Apple', reason: 'Natural sugars, fiber', cal: 95 },
            { name: '🥜 Mixed Nuts', reason: 'Healthy fats, protein', cal: 160 },
            { name: '🥥 Coconut Water', reason: 'Natural electrolytes', cal: 45 }
        ]
    };

    return suggestions[mealType].map(item => `
        <div class="meal-suggestion">
            <div class="suggestion-header">
                <span class="colorful-text">${item.name}</span>
                <span class="calorie-badge rainbow-bg">${item.cal} cal</span>
            </div>
            <p class="suggestion-reason gradient-text">${item.reason}</p>
            <button class="add-to-plan-btn" onclick="addToMealPlan('${item.name}', '${mealType}')">
                <i class="fas fa-plus"></i> Add to Plan
            </button>
        </div>
    `).join('');
}

function addToMealPlan(itemName, mealType) {
    showToast(`📝 ${itemName} added to your ${mealType} plan!`);

    // Save meal plan to localStorage
    const mealPlans = JSON.parse(localStorage.getItem('userMealPlans') || '{}');
    const today = new Date().toDateString();

    if (!mealPlans[today]) {
        mealPlans[today] = { breakfast: [], lunch: [], snacks: [] };
    }

    if (!mealPlans[today][mealType].includes(itemName)) {
        mealPlans[today][mealType].push(itemName);
    }

    localStorage.setItem('userMealPlans', JSON.stringify(mealPlans));
}

// Nutrition Tracker (Enhanced)
function trackNutrition() {
    openHealthDashboard();
}

// Share Favorites
function shareFavorites() {
    if (appState.favorites.length === 0) {
        showToast("🤔 Add some favorites first to share!");
        return;
    }

    const favoritesList = appState.favorites.join(', ');
    const shareText = `🌟 Check out my healthy food favorites from Silverline Prestige School Smart Canteen: ${favoritesList}! 🍎🥗 #HealthyEating #SmartCanteen`;

    if (navigator.share) {
        navigator.share({
            title: '🍎 My Healthy Favorites',
            text: shareText
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            showToast("📋 Favorites list copied to clipboard! Share with friends!");
        });
    }
}

// --- Missing Function Implementations ---
function openFaceId() {
    const modal = document.getElementById('faceIdModal');
    if (modal) {
        modal.style.display = 'block';
        startFaceRecognition();
    }
}

function closeFaceId() {
    const modal = document.getElementById('faceIdModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function startFaceRecognition() {
    // Simulate face recognition process
    setTimeout(() => {
        const recognized = document.querySelector('.face-recognized');
        const scanning = document.querySelector('.scan-progress');
        if (recognized && scanning) {
            scanning.style.display = 'none';
            recognized.style.display = 'block';
        }
    }, 3000);
}

function openHeartbeat() {
    const modal = document.getElementById('heartbeatModal');
    if (modal) {
        modal.style.display = 'block';
        simulateHeartbeat();
    }
}

function closeHeartbeat() {
    const modal = document.getElementById('heartbeatModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function simulateHeartbeat() {
    // Simulate heartbeat monitoring
    const bpmDisplay = document.querySelector('.bpm-number');
    if (bpmDisplay) {
        setInterval(() => {
            const bpm = 65 + Math.random() * 20;
            bpmDisplay.textContent = Math.round(bpm);
        }, 2000);
    }
}

function openSquadOrdering() {
    const modal = document.getElementById('squadModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeSquadModal() {
    const modal = document.getElementById('squadModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function orderSquadPack(packType) {
    showToast(`🎉 ${packType} squad pack ordered! Enjoy with friends!`);
    closeSquadModal();
}

// --- Enhanced Order Management Functions ---
function openOrderTracker() {
    const modal = document.getElementById('orderTrackingModal');
    if (modal) {
        modal.style.display = 'block';
        simulateOrderProgress();
        startRealTimeTracking();
    }
    toggleFabMenu();
}

function closeOrderTracking() {
    const modal = document.getElementById('orderTrackingModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Real-time Order Tracking
function startRealTimeTracking() {
    const trackingSteps = [
        { step: 'confirmed', message: 'Order confirmed and sent to kitchen', time: 2000 },
        { step: 'preparing', message: 'Chef is preparing your delicious meal', time: 8000 },
        { step: 'ready', message: 'Your order is ready for pickup!', time: 15000 },
        { step: 'completed', message: 'Order completed. Thank you!', time: 20000 }
    ];

    trackingSteps.forEach((tracking, index) => {
        setTimeout(() => {
            updateTrackingStatus(tracking.step, tracking.message);
            if (tracking.step === 'ready') {
                showToast("🔔 Your order is ready for pickup! Token: A-" + Math.floor(Math.random() * 100));
                // Send notification sound (if browser supports)
                if ('Notification' in window && Notification.permission === 'granted') {
                    new Notification('Order Ready!', {
                        body: 'Your order is ready for pickup at the canteen.',
                        icon: 'https://images.unsplash.com/photo-1567306226416-2e8f0efdc88c?w=64&h=64&fit=crop'
                    });
                }
            }
        }, tracking.time);
    });
}

function updateTrackingStatus(step, message) {
    const statusItems = document.querySelectorAll('.status-item');
    statusItems.forEach(item => {
        item.classList.remove('active');
        if (item.classList.contains(step)) {
            item.classList.add('active', 'completed');
            // Update message
            const messageElement = item.querySelector('.status-content p');
            if (messageElement) {
                messageElement.textContent = message;
            }
        }
    });
}

function simulateOrderProgress() {
    // This function is kept for backward compatibility but startRealTimeTracking is preferred.
    // The actual progress is managed by startRealTimeTracking now.
}

function updateOrderStatus(current, next) {
    // This function is kept for backward compatibility but updateTrackingStatus is preferred.
    const currentElement = document.querySelector(`.status-item.${current}`);
    const nextElement = document.querySelector(`.status-item.pending`);

    if (currentElement) {
        currentElement.classList.remove('active');
        currentElement.classList.add('completed');
    }

    if (nextElement) {
        nextElement.classList.remove('pending');
        nextElement.classList.add('active');
    }
}

function openAdvancedSearch() {
    const modal = document.getElementById('advancedSearchModal');
    if (modal) {
        modal.style.display = 'block';
    }
    toggleFabMenu();
}

function closeAdvancedSearch() {
    const modal = document.getElementById('advancedSearchModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function applyFilters() {
    const checkboxes = document.querySelectorAll('#advancedSearchModal input[type="checkbox"]:checked');
    const filters = Array.from(checkboxes).map(cb => cb.value);

    showToast(`🔍 Applied ${filters.length} filters: ${filters.join(', ')}`);

    // Filter menu items based on selection
    filterMenuByAdvancedFilters(filters);
    closeAdvancedSearch();
}

function clearFilters() {
    const checkboxes = document.querySelectorAll('#advancedSearchModal input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    const slider = document.querySelector('.price-slider');
    if (slider) slider.value = 50;

    showToast("🗑️ All filters cleared");
}

function filterMenuByAdvancedFilters(filters) {
    // Implementation for filtering menu items
    if (filters.includes('vegetarian')) {
        appState.currentFilter = '🥗 Fresh Vegetables';
    } else if (filters.includes('low-calorie')) {
        // Show only items under 100 calories
        showToast("🔥 Showing low-calorie options");
    }
    drawMenu();
}

function openPreOrderSystem() {
    const modal = document.getElementById('preOrderModal');
    if (modal) {
        modal.style.display = 'block';
        setupPreOrderListeners();
    }
    toggleFabMenu();
}

function closePreOrderSystem() {
    const modal = document.getElementById('preOrderModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function setupPreOrderListeners() {
    const pickupRadios = document.querySelectorAll('input[name="pickup"]');
    const tableSelection = document.getElementById('table-selection');

    pickupRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'dinein') {
                tableSelection.style.display = 'block';
            } else {
                tableSelection.style.display = 'none';
            }
        });
    });
}

let selectedTimeSlot = null;
let selectedTable = null;

function selectTimeSlot(time) {
    selectedTimeSlot = time;

    // Update UI
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });

    event.target.classList.add('selected');
    showToast(`⏰ Selected pickup time: ${time}`);
}

function selectTable(tableId) {
    if (event.target.classList.contains('occupied')) {
        showToast("❌ This table is occupied. Please select another.");
        return;
    }

    selectedTable = tableId;

    // Update UI
    document.querySelectorAll('.table-option').forEach(table => {
        table.classList.remove('selected');
    });

    event.target.classList.add('selected');
    showToast(`🪑 Selected table: ${tableId}`);
}

function confirmPreOrder() {
    if (!selectedTimeSlot) {
        showToast("⏰ Please select a pickup time");
        return;
    }

    const pickupType = document.querySelector('input[name="pickup"]:checked').value;

    if (pickupType === 'dinein' && !selectedTable) {
        showToast("🪑 Please select a table for dine-in");
        return;
    }

    const preOrderDetails = {
        timeSlot: selectedTimeSlot,
        pickupType: pickupType,
        table: selectedTable,
        items: appState.cart,
        student: currentStudent
    };

    // Save pre-order
    const preOrders = JSON.parse(localStorage.getItem('preOrders') || '[]');
    preOrders.push({
        ...preOrderDetails,
        id: `PRE-${Date.now()}`,
        status: 'scheduled',
        createdAt: new Date().toISOString()
    });
    localStorage.setItem('preOrders', JSON.stringify(preOrders));

    showToast(`✅ Pre-order confirmed for ${selectedTimeSlot}! ${pickupType === 'dinein' ? `Table ${selectedTable}` : 'Takeaway'}`);

    closePreOrderSystem();

    // Clear cart after pre-order
    appState.cart = [];
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    updateCartDisplay();
}

function openLoyaltyProgram() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'loyaltyModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-crown"></i> <span class="rainbow-text">Loyalty & Rewards Program</span></h3>
                <span class="close-modal" onclick="closeLoyaltyProgram()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="loyalty-container">
                    <div class="loyalty-stats">
                        <div class="points-display">
                            <h4 class="gradient-text">Your Points</h4>
                            <div class="points-circle">
                                <span class="points-value rainbow-text">1,250</span>
                                <span class="points-label colorful-text">Points</span>
                            </div>
                        </div>
                        <div class="tier-info">
                            <h4 class="gradient-text">Current Tier</h4>
                            <div class="tier-badge gold">
                                <i class="fas fa-crown"></i>
                                <span>Gold Member</span>
                            </div>
                            <p class="colorful-text">750 points to Platinum</p>
                        </div>
                    </div>
                    <div class="rewards-available">
                        <h4 class="gradient-text">🎁 Available Rewards</h4>
                        <div class="reward-item">
                            <i class="fas fa-coffee"></i>
                            <div class="reward-info">
                                <h5 class="colorful-text">Free Smoothie</h5>
                                <p class="gradient-text">500 points</p>
                            </div>
                            <button class="redeem-btn rainbow-btn">Redeem</button>
                        </div>
                        <div class="reward-item">
                            <i class="fas fa-utensils"></i>
                            <div class="reward-info">
                                <h5 class="colorful-text">Free Healthy Meal</h5>
                                <p class="gradient-text">1,000 points</p>
                            </div>
                            <button class="redeem-btn rainbow-btn">Redeem</button>
                        </div>
                        <div class="reward-item">
                            <i class="fas fa-percent"></i>
                            <div class="reward-info">
                                <h5 class="colorful-text">20% Off Next Order</h5>
                                <p class="gradient-text">300 points</p>
                            </div>
                            <button class="redeem-btn rainbow-btn">Redeem</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeLoyaltyProgram = () => modal.remove();
    toggleFabMenu();
}

function openSocialFeed() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'socialModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-users"></i> <span class="rainbow-text">Community Feed</span></h3>
                <span class="close-modal" onclick="closeSocialFeed()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="social-feed">
                    <div class="post-item">
                        <div class="post-header">
                            <div class="user-info">
                                <i class="fas fa-user-circle"></i>
                                <span class="colorful-text">Arjun S. (Class 10A)</span>
                            </div>
                            <span class="post-time gradient-text">2 hours ago</span>
                        </div>
                        <div class="post-content">
                            <p class="colorful-text">Just tried the Quinoa Power Bowl! 🌟 Amazing taste and super healthy. Highly recommended!</p>
                            <div class="post-image">
                                <img src="https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop" alt="Quinoa Bowl">
                            </div>
                        </div>
                        <div class="post-actions">
                            <button class="like-btn"><i class="fas fa-heart"></i> 24</button>
                            <button class="comment-btn"><i class="fas fa-comment"></i> 8</button>
                            <button class="share-btn"><i class="fas fa-share"></i> Share</button>
                        </div>
                    </div>
                    <div class="post-item">
                        <div class="post-header">
                            <div class="user-info">
                                <i class="fas fa-user-circle"></i>
                                <span class="colorful-text">Priya M. (Class 9B)</span>
                            </div>
                            <span class="post-time gradient-text">1 day ago</span>
                        </div>
                        <div class="post-content">
                            <p class="colorful-text">Achieved my health goal of 100 points! 🎉 Thanks to this amazing canteen app for making healthy eating fun!</p>
                        </div>
                        <div class="post-actions">
                            <button class="like-btn"><i class="fas fa-heart"></i> 45</button>
                            <button class="comment-btn"><i class="fas fa-comment"></i> 12</button>
                            <button class="share-btn"><i class="fas fa-share"></i> Share</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    window.closeSocialFeed = () => modal.remove();
    toggleFabMenu();
}

// --- EmailJS Configuration (Updated) ---
const EMAIL_CONFIG = {
    serviceID: 'service_ymajfgd',
    templateID: 'template_z9w8xbp',
    publicKey: 'NnqKtLNYKz7ZL_Xt9'
};

const NOTIFICATION_EMAIL = 'S.18.266@slps.one';

// --- Enhanced Message Display with Colorful Text ---
function displayMessage(message, type) {
    messageDisplay.innerHTML = `<span class="rainbow-text">${message}</span>`;
    messageDisplay.classList.remove('message-prompt', 'message-healthy', 'message-unhealthy');
    messageDisplay.classList.add(`message-${type}`);

    // Add animation
    messageDisplay.style.transform = 'scale(0.8)';
    messageDisplay.style.opacity = '0';

    setTimeout(() => {
        messageDisplay.style.transform = 'scale(1)';
        messageDisplay.style.opacity = '1';
    }, 100);
}

// --- Enhanced Menu Drawing with Colorful Elements ---
function drawMenu() {
    menuDisplayDiv.innerHTML = '';

    let categoriesToShow = {};

    if (appState.currentFilter === 'all') {
        categoriesToShow = HEALTHY_FOOD_DATABASE;
    } else if (appState.currentFilter === 'favorites') {
        if (appState.favorites.length === 0) {
            menuDisplayDiv.innerHTML = '<div class="no-favorites"><i class="fas fa-heart-broken rainbow-text"></i><p class="gradient-text">No favorites yet! Click the heart icon on any food item to add it to your favorites.</p></div>';
            return;
        }

        for (const category in HEALTHY_FOOD_DATABASE) {
            const items = HEALTHY_FOOD_DATABASE[category].filter(item => appState.favorites.includes(item.name));
            if (items.length > 0) {
                categoriesToShow[category] = items;
            }
        }
    } else {
        categoriesToShow[appState.currentFilter] = HEALTHY_FOOD_DATABASE[appState.currentFilter];
    }

    for (const category in categoriesToShow) {
        if (categoriesToShow.hasOwnProperty(category)) {
            const categoryDiv = document.createElement('div');
            categoryDiv.classList.add('menu-category');
            categoryDiv.setAttribute('data-category', category);

            const categoryHeader = document.createElement('h3');
            categoryHeader.innerHTML = `<span class="gradient-text">${category}</span>`;
            categoryDiv.appendChild(categoryHeader);

            const itemList = document.createElement('ul');
            categoriesToShow[category].forEach(item => {
                const listItem = document.createElement('li');
                listItem.style.cursor = 'pointer';
                listItem.addEventListener('click', () => handleMenuItemClick(item.name));

                listItem.innerHTML = `
                    <div class="item-header">
                        <div class="item-image">
                            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://via.placeholder.com/400x300?text=🍎+Food+Image'">
                        </div>
                        <div class="item-info">
                            <span class="menu-item-name gradient-text">${item.name}</span>
                            <div class="item-actions">
                                <span class="health-score-badge rainbow-bg"><i class="fas fa-star"></i> ${item.healthScore}/10</span>
                                <span class="price-tag colorful-text">₹${item.price}</span>
                                <button class="favorite-btn rainbow-btn" onclick="event.stopPropagation(); toggleFavorite('${item.name}')">
                                    ${appState.favorites.includes(item.name) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
                                </button>
                                <button class="buy-btn gradient-btn" onclick="event.stopPropagation(); addToCart('${item.name}', ${item.price})" title="Add ${item.name} to cart">
                                    <i class="fas fa-shopping-cart"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="menu-item-details">
                        <p class="colorful-text"><i class="fas fa-info-circle"></i> ${item.description}</p>
                        <p class="gradient-text"><i class="fas fa-fire"></i> ${item.calories} calories</p>
                    </div>
                `;
                itemList.appendChild(listItem);
            });
            categoryDiv.appendChild(itemList);
            menuDisplayDiv.appendChild(categoryDiv);
        }
    }
}

// --- Enhanced Email Functionality ---
function sendOrderNotification(orderDetails) {
    console.log("Sending order notification to:", NOTIFICATION_EMAIL);

    const itemsList = orderDetails.items.map(item =>
        `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');

    const studentInfo = currentStudent ?
        {
            name: currentStudent.name,
            id: currentStudent.id,
            class: currentStudent.class
        } :
        {
            name: "Guest User",
            id: "GUEST",
            class: "Unknown"
        };

    const emailParams = {
        to_email: NOTIFICATION_EMAIL,
        school_name: "Silverline Prestige School, Ghaziabad",
        student_name: studentInfo.name,
        student_id: studentInfo.id,
        student_class: studentInfo.class, // Added student class
        order_items: itemsList,
        total_amount: orderDetails.total,
        order_date: new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        health_score: orderDetails.healthScore,
        order_id: `ORDER-${Date.now()}`,
        payment_method: "School Account",
        pickup_time: "Next available slot"
    };

    // Modern email sending with better error handling
    if (typeof emailjs !== 'undefined') {
        showToast("📧 Sending order notification...");

        emailjs.send('service_ymajfgd', 'template_z9w8xbp', emailParams).then(
            function(response) {
                console.log('Order notification sent successfully!', response.status, response.text);
                showToast(`✅ Order confirmed! Notification sent to canteen staff.`);

                // Show success message with order details
                displayMessage(
                    `🎉 Order placed successfully! Order ID: ${emailParams.order_id}. ` +
                    `Canteen staff has been notified. Your food will be ready for pickup shortly.`,
                    "healthy"
                );
            },
            function(error) {
                console.log('EmailJS error:', error);
                showToast("⚠️ Order placed but notification failed. Please contact canteen staff directly.");
                sendFallbackNotification(orderDetails);
            }
        );
    } else {
        console.log("EmailJS not available, using fallback");
        sendFallbackNotification(orderDetails);
    }
}

function sendFallbackNotification(orderDetails) {
    const itemsList = orderDetails.items.map(item =>
        `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('%0A');

    const subject = encodeURIComponent('New Order - Silverline Prestige School Canteen');
    const body = encodeURIComponent(
        `New order from Silverline Prestige School Smart Canteen (P.B.L Program)\n\n` +
        `School: Silverline Prestige School, Ghaziabad\n` +
        `Student Type: Boys\n` +
        `Order Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n\n` +
        `Order Items:\n${orderDetails.items.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n')}\n\n` +
        `Total Amount: ₹${orderDetails.total}\n` +
        `Health Score: ${orderDetails.healthScore}\n\n` +
        `Please prepare this order for pickup.`
    );

    const mailtoLink = `mailto:${NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;

    const link = document.createElement('a');
    link.href = mailtoLink;
    link.click();

    showToast("📧 Mail client opened. Order notification ready to send!");
}

// --- Enhanced Toast with Colors ---
function showToast(message) {
    const toast = document.getElementById('email-toast');
    const toastContent = toast.querySelector('.toast-content span');
    toastContent.innerHTML = `<span class="rainbow-text">${message}</span>`;

    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// --- Enhanced Functions (keeping existing functionality) ---
function toggleFabMenu() {
    appState.fabMenuOpen = !appState.fabMenuOpen;
    const fabOptions = document.getElementById('fab-options');
    const fabMain = document.querySelector('.fab-main');

    // Handle missing elements gracefully
    if (fabOptions) {
        if (appState.fabMenuOpen) {
            fabOptions.classList.add('active');
        } else {
            fabOptions.classList.remove('active');
        }
    } else {
        console.warn('fab-options element not found');
    }

    if (fabMain) {
        if (appState.fabMenuOpen) {
            fabMain.style.transform = 'rotate(45deg)';
        } else {
            fabMain.style.transform = 'rotate(0deg)';
        }
    } else {
        console.warn('fab-main element not found');
    }
}

function addToCart(itemName, price) {
    const existingItem = appState.cart.find(item => item.name === itemName);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        appState.cart.push({
            name: itemName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(appState.cart));
    showToast(`🛒 ${itemName} added to cart!`);
    updateCartDisplay();
    updateCartPanelDisplay();

    // Track nutrition when item is added to cart
    const foodData = findFoodItemByName(itemName);
    if (foodData) {
        // Estimate macros based on food type (simplified)
        const estimatedMacros = estimateMacronutrients(foodData);
        trackMealNutrition(itemName, foodData.calories, estimatedMacros);

        // Check for allergies
        checkAllergyWarnings(foodData);
    }
}

function estimateMacronutrients(foodItem) {
    // Simplified macro estimation based on food type and calories
    let protein = 0, carbs = 0, fats = 0;

    const name = foodItem.name.toLowerCase();
    const calories = foodItem.calories;

    if (name.includes('yogurt') || name.includes('paneer') || name.includes('nuts')) {
        protein = calories * 0.2 / 4; // 20% protein
        carbs = calories * 0.3 / 4;   // 30% carbs
        fats = calories * 0.5 / 9;    // 50% fats
    } else if (name.includes('fruit') || name.includes('apple') || name.includes('banana')) {
        protein = calories * 0.05 / 4; // 5% protein
        carbs = calories * 0.9 / 4;    // 90% carbs
        fats = calories * 0.05 / 9;    // 5% fats
    } else if (name.includes('bread') || name.includes('rice') || name.includes('quinoa')) {
        protein = calories * 0.15 / 4; // 15% protein
        carbs = calories * 0.75 / 4;   // 75% carbs
        fats = calories * 0.1 / 9;     // 10% fats
    } else {
        // Default balanced macro split
        protein = calories * 0.2 / 4;
        carbs = calories * 0.5 / 4;
        fats = calories * 0.3 / 9;
    }

    return {
        protein: Math.round(protein * 10) / 10,
        carbs: Math.round(carbs * 10) / 10,
        fats: Math.round(fats * 10) / 10
    };
}

function checkAllergyWarnings(foodItem) {
    if (!userHealthProfile.allergyInfo || userHealthProfile.allergyInfo.length === 0) return;

    const itemName = foodItem.name.toLowerCase();
    const itemDesc = foodItem.description.toLowerCase();

    const allergyMatches = [];

    userHealthProfile.allergyInfo.forEach(allergy => {
        if (allergy === 'nuts' && (itemName.includes('nut') || itemName.includes('almond') || itemDesc.includes('nut'))) {
            allergyMatches.push('nuts');
        } else if (allergy === 'dairy' && (itemName.includes('milk') || itemName.includes('yogurt') || itemName.includes('paneer'))) {
            allergyMatches.push('dairy');
        } else if (allergy === 'spicy' && (itemDesc.includes('spicy') || itemDesc.includes('chili') || itemDesc.includes('hot'))) {
            allergyMatches.push('spicy');
        }
    });

    if (allergyMatches.length > 0) {
        const warningMessage = `⚠️ WARNING: ${foodItem.name} may contain ${allergyMatches.join(', ')} which you marked as restricted. Continue anyway?`;

        if (!confirm(warningMessage)) {
            // Remove from cart if user cancels
            appState.cart = appState.cart.filter(item => item.name !== foodItem.name);
            localStorage.setItem('cart', JSON.stringify(appState.cart));
            updateCartDisplay();
            showToast("❌ Item removed from cart due to allergy concern");
        }
    }
}

function openOrderCart() {
    const modal = document.getElementById('orderModal');
    updateCartDisplay();
    modal.style.display = 'block';
    toggleFabMenu();
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    modal.style.display = 'none';
}

function updateCartDisplay() {
    const cartItemsDiv = document.getElementById('cart-items');
    const totalAmountSpan = document.getElementById('total-amount');

    if (appState.cart.length === 0) {
        cartItemsDiv.innerHTML = '<p class="empty-cart gradient-text">Your cart is empty. Add some healthy items! 🛒</p>';
        totalAmountSpan.textContent = '0';
        return;
    }

    let cartHTML = '';
    let total = 0;

    appState.cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartHTML += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #e2e8f0; margin-bottom: 10px; border-radius: 10px; background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));">
                <div>
                    <strong class="colorful-text">${item.name}</strong><br>
                    <span class="gradient-text">₹${item.price} × ${item.quantity}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateCartQuantity(${index}, -1)" class="gradient-btn" style="width: 30px; height: 30px; border-radius: 50%;">-</button>
                    <span class="rainbow-text" style="font-weight: bold; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${index}, 1)" class="gradient-btn" style="width: 30px; height: 30px; border-radius: 50%;">+</button>
                    <span class="colorful-text" style="font-weight: bold; margin-left: 15px;">₹${itemTotal}</span>
                </div>
            </div>
        `;
    });

    cartItemsDiv.innerHTML = cartHTML;
    totalAmountSpan.innerHTML = `<span class="rainbow-text">${total}</span>`;
}

function updateCartQuantity(index, change) {
    appState.cart[index].quantity += change;

    if (appState.cart[index].quantity <= 0) {
        appState.cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(appState.cart));
    updateCartDisplay();
}

function placeOrder() {
    if (!currentStudent) {
        showToast("🔒 Please login to place an order!");
        openLoginModal();
        return;
    }

    if (appState.cart.length === 0) {
        showToast("🛒 Your cart is empty!");
        return;
    }

    const total = appState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = `ORDER-${Date.now()}`;

    const orderData = {
        order_id: orderId,
        student_name: currentStudent.name,
        student_id: currentStudent.id,
        student_class: currentStudent.class,
        order_items: appState.cart.map(item => `${item.name} x${item.quantity} - ₹${item.price * item.quantity}`).join('\n'),
        total_amount: `₹${total}`,
        order_date: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        school: "Silverline Prestige School, Ghaziabad",
        project: "Smart Canteen P.B.L System"
    };

    // Send to Formspree
    fetch('https://formspree.io/f/xqadorlk', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
    }).then(response => {
        if (response.ok) {
            showOrderConfirmation(orderId, total);
            showToast("🎉 Order placed! Canteen notified via Formspree!");
        } else {
            showToast("⚠️ Order submitted but notification may be delayed");
        }
    }).catch(() => {
        showToast("⚠️ Order submitted but notification may be delayed");
    });

    appState.cart = [];
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    closeOrderModal();
    updateCartDisplay();
}

// --- Animate Numbers ---
function animateNumber(element, start, end, duration = 1000) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.innerHTML = `<span class="rainbow-text">${Math.floor(end)}</span>`;
            clearInterval(timer);
        } else {
            element.innerHTML = `<span class="rainbow-text">${Math.floor(current)}</span>`;
        }
    }, 16);
}

function updateStats() {
    const itemsElement = document.getElementById('items-checked');
    const healthyElement = document.getElementById('healthy-choices');
    const favoritesElement = document.getElementById('favorites-count');
    const scoreElement = document.getElementById('health-score-text');
    const scoreFill = document.getElementById('score-fill');

    if (itemsElement) animateNumber(itemsElement, parseInt(itemsElement.textContent) || 0, appState.itemsChecked);
    if (healthyElement) animateNumber(healthyElement, parseInt(healthyElement.textContent) || 0, appState.healthyChoices);
    if (favoritesElement) animateNumber(favoritesElement, parseInt(favoritesElement.textContent) || 0, appState.favorites.length);

    const healthScore = Math.min(100, Math.max(0, appState.userHealthScore));
    if (scoreElement) scoreElement.innerHTML = `<span class="gradient-text">Health Score: ${healthScore}</span>`;
    if (scoreFill) {
        scoreFill.style.width = `${healthScore}%`;
        scoreFill.style.background = healthScore > 70 ?
            'linear-gradient(90deg, #10b981, #3b82f6)' :
            healthScore > 40 ?
            'linear-gradient(90deg, #f59e0b, #ef4444)' :
            'linear-gradient(90deg, #ef4444, #dc2626)';
    }

    // Check for achievement milestones
    checkAchievements(healthScore);
}

function checkAchievements(healthScore) {
    const achievementShown = localStorage.getItem('achievement_100_shown');

    if (healthScore >= 100 && !achievementShown) {
        showAchievementNotification();
        localStorage.setItem('achievement_100_shown', 'true');
    }
}

function showAchievementNotification() {
    const notification = document.getElementById('achievement-notification');
    if (notification) {
        notification.style.display = 'block';

        // Auto-hide after 10 seconds
        setTimeout(() => {
            closeAchievement();
        }, 10000);
    }
}

function closeAchievement() {
    const notification = document.getElementById('achievement-notification');
    if (notification) {
        notification.style.display = 'none';
    }
}

window.closeAchievement = closeAchievement;

function toggleFavorite(itemName) {
    const index = appState.favorites.indexOf(itemName);
    if (index > -1) {
        appState.favorites.splice(index, 1);
    } else {
        appState.favorites.push(itemName);
    }
    localStorage.setItem('favorites', JSON.stringify(appState.favorites));
    updateStats();
    drawMenu();
}

function showRandomHealthyFood() {
    // Use HEALTHY_FOOD_DATABASE directly as HEALTHY_FOOD_MENU is not defined
    const categories = Object.keys(HEALTHY_FOOD_DATABASE);
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const items = HEALTHY_FOOD_DATABASE[randomCategory];
    const randomItem = items[Math.floor(Math.random() * items.length)];

    itemInputField.value = randomItem.name;
    handleCheckItem();
}

function toggleFavorites() {
    const currentFilter = appState.currentFilter;
    if (currentFilter === 'favorites') {
        appState.currentFilter = 'all';
    } else {
        appState.currentFilter = 'favorites';
    }
    drawMenu();
    updateFilterButtons();
    toggleFabMenu();
}

function showNutritionTips() {
    const tips = [
        "🥗 Fill half your plate with colorful vegetables and fruits",
        "🌾 Choose whole grains over refined grains for better nutrition",
        "🥛 Include plant-based protein sources in every meal",
        "💧 Stay hydrated with water throughout the day",
        "🥜 Include healthy fats like nuts and avocado in your diet",
        "🍎 Snack on fruits instead of processed foods",
        "🥬 Eat a rainbow of colorful vegetables daily",
        "🌱 Try more plant-based meals for better health"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    displayMessage(`💡 Nutrition Tip: ${randomTip}`, "healthy");
    toggleFabMenu();
}

function toggleTips() {
    appState.showTips = !appState.showTips;
    const tipsPanel = document.getElementById('tips-panel');
    if (tipsPanel) {
        if (appState.showTips) {
            tipsPanel.classList.add('active');
        } else {
            tipsPanel.classList.remove('active');
        }
    }
    toggleFabMenu();
}

function createFilterButtons() {
    const filterContainer = document.getElementById('filter-buttons');
    if (!filterContainer) return;

    const categories = ['all', 'favorites', ...Object.keys(HEALTHY_FOOD_DATABASE)];

    filterContainer.innerHTML = '';
    categories.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('filter-btn');
        if (category === appState.currentFilter) button.classList.add('active');

        button.setAttribute('data-category', category);
        button.innerHTML = `<i class="fas fa-${getIconForCategory(category)}"></i> <span class="colorful-text">${formatCategoryName(category)}</span>`;

        button.addEventListener('click', () => {
            appState.currentFilter = category;
            updateFilterButtons();
            drawMenu();
        });

        filterContainer.appendChild(button);
    });
}

function updateFilterButtons() {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-category') === appState.currentFilter) {
            btn.classList.add('active');
        }
    });
}

function getIconForCategory(category) {
    const icons = {
        'all': 'list',
        'favorites': 'heart',
        '🍎 Fresh Fruits': 'apple-alt',
        '🥗 Fresh Vegetables': 'carrot',
        '🌾 Whole Grains & Cereals': 'bread-slice',
        '🥛 Healthy Beverages': 'glass-water',
        '🥜 Protein & Nuts': 'seedling',
        '🍲 Nutritious Meals': 'utensils'
    };
    return icons[category] || 'utensils';
}

function formatCategoryName(category) {
    if (category === 'all') return 'All Items';
    if (category === 'favorites') return 'My Favorites';
    return category;
}

function handleMenuItemClick(itemName) {
    itemInputField.value = itemName;
    itemInputField.focus();
    displayMessage(`"${itemName}" has been added to the input field. Click "Analyze" to get detailed information!`, "prompt");
}

function checkFoodItem(itemName) {
    const normalizedItemName = itemName.toLowerCase();
    for (const category in HEALTHY_FOOD_DATABASE) {
        if (HEALTHY_FOOD_DATABASE.hasOwnProperty(category)) {
            const items = HEALTHY_FOOD_DATABASE[category];
            for (let i = 0; i < items.length; i++) {
                if (items[i].name.toLowerCase().includes(normalizedItemName.replace(/[🍎🍌🍊🫐🥕🥒🥦🍅🥪🥣🍚🍵🥥🥤🍃]/g, '').trim())) {
                    return {
                        type: 'healthy',
                        item: items[i],
                        category: category
                    };
                }
            }
        }
    }
    return { type: 'unknown', item: null, category: null };
}

function handleCheckItem() {
    const itemInput = itemInputField.value.trim();
    if (itemInput === "") {
        displayMessage('🔍 Please enter a food item or click on one from the menu above.', "unhealthy");
        return;
    }

    const result = checkFoodItem(itemInput);
    appState.itemsChecked++;

    if (result.type === 'healthy') {
        appState.healthyChoices++;
        appState.userHealthScore += result.item.healthScore;

        if (appState.userHealthScore >= 100 && !localStorage.getItem('achieved100Health')) {
            showToast("🎉 Congratulations! You've reached a perfect 100 health score! Keep up the great work!");
            localStorage.setItem('achieved100Health', 'true');
        }

        const healthIcon = result.item.healthScore >= 8 ? '🌟' : '👍';
        displayMessage(
            `${healthIcon} <strong>'${itemInput}'</strong> is a HEALTHY choice! ` +
            `Health Score: ${result.item.healthScore}/10 | Calories: ${result.item.calories} | ` +
            `Price: ₹${result.item.price} | Category: ${result.category}. Great selection for your well-being!`,
            "healthy"
        );
    } else {
        displayMessage(
            `🤔 <strong>'${itemInput}'</strong> is not on our healthy menu. We focus on nutritious, colorful options! ` +
            `Please choose from the items listed above for the best health benefits.`,
            "unhealthy"
        );
    }

    updateStats();
    itemInputField.value = '';
}

// --- Login System ---
let currentStudent = null;

function openLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'none';
}

function authenticateStudent() {
    const studentId = document.getElementById('studentId').value;
    const studentClass = document.getElementById('studentClass').value;
    const password = document.getElementById('studentPassword').value;

    if (!studentId || !studentClass || !password) {
        showToast("🔒 Please fill in all fields");
        return;
    }

    // Basic validation: Student ID starts with S.18. and password is at least 6 characters
    if (studentId.startsWith('S.18.') && password.length >= 6) {
        currentStudent = {
            id: studentId,
            class: studentClass, // Use the entered class
            name: `Student ${studentId.split('.')[2]}`
        };

        document.getElementById('login-prompt').style.display = 'none';
        document.getElementById('user-welcome').style.display = 'block';

        document.getElementById('student-name').innerHTML = `<span class="gradient-text">${currentStudent.name}</span>`;
        document.getElementById('student-class-display').innerHTML = `<span class="colorful-text">${currentStudent.class}</span>`;
        document.getElementById('student-id-display').innerHTML = `<span class="rainbow-text">${currentStudent.id}</span>`;

        closeLoginModal();
        showToast(`🎉 Welcome back, ${currentStudent.name}!`);

        document.querySelectorAll('.buy-btn').forEach(btn => {
            btn.disabled = false;
        });
    } else {
        showToast("❌ Invalid credentials. Please try again.");
    }
}

function logout() {
    currentStudent = null;
    document.getElementById('login-prompt').style.display = 'block';
    document.getElementById('user-welcome').style.display = 'none';

    appState.cart = [];
    localStorage.setItem('cart', JSON.stringify(appState.cart));
    updateCartDisplay();

    showToast("👋 Logged out successfully");
}

// --- Enhanced Health Features ---

// Health Goals System
let userHealthProfile = {
    bmi: null,
    healthGoal: null,
    dailyCalorieTarget: null,
    allergyInfo: [],
    dietaryPreferences: [],
    todaysIntake: {
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        meals: []
    }
};

// Load health profile from localStorage
function loadHealthProfile() {
    const saved = localStorage.getItem('userHealthProfile');
    if (saved) {
        userHealthProfile = { ...userHealthProfile, ...JSON.parse(saved) };
    }
}

// Save health profile to localStorage
function saveHealthProfile() {
    localStorage.setItem('userHealthProfile', JSON.stringify(userHealthProfile));
}

// --- BMI Calculator Enhanced ---
function openBmiCalculator() {
    const modal = document.getElementById('bmiModal');
    modal.style.display = 'block';
    loadHealthProfile();
}

function closeBmiModal() {
    const modal = document.getElementById('bmiModal');
    modal.style.display = 'none';
}

function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value || 'male';
    const activityLevel = document.getElementById('activityLevel').value || 'moderate';

    if (!height || !weight || !age) {
        document.getElementById('bmi-results').innerHTML =
            '<div class="error gradient-text">Please fill in all fields</div>';
        return;
    }

    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    // Calculate BMR and daily calorie needs
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very_active': 1.9
    };

    const dailyCalories = Math.round(bmr * activityMultipliers[activityLevel]);

    let category, color, recommendation, healthGoalSuggestion;

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#3b82f6";
        recommendation = "Consider adding more nutritious foods to your diet. Our canteen offers protein-rich options!";
        healthGoalSuggestion = "weight_gain";
    } else if (bmi < 25) {
        category = "Normal weight";
        color = "#10b981";
        recommendation = "Great! You're in a healthy weight range. Keep enjoying our balanced menu options.";
        healthGoalSuggestion = "maintain_weight";
    } else if (bmi < 30) {
        category = "Overweight";
        color = "#f59e0b";
        recommendation = "Focus on our fresh fruits, vegetables, and whole grain options.";
        healthGoalSuggestion = "weight_loss";
    } else {
        category = "Obese";
        color = "#ef4444";
        recommendation = "Consider consulting with our school nutritionist. Focus on our healthiest menu items.";
        healthGoalSuggestion = "weight_loss";
    }

    // Update user health profile
    userHealthProfile.bmi = bmi;
    userHealthProfile.healthGoal = healthGoalSuggestion;
    userHealthProfile.dailyCalorieTarget = dailyCalories;
    saveHealthProfile();

    document.getElementById('bmi-results').innerHTML = `
        <div class="bmi-result">
            <h4 class="gradient-text">🏥 Complete Health Analysis</h4>

            <div class="health-metrics-grid">
                <div class="metric-card">
                    <div class="metric-value rainbow-text" style="color: ${color};">${bmi.toFixed(1)}</div>
                    <div class="metric-label">BMI</div>
                    <div class="metric-category colorful-text" style="color: ${color};">${category}</div>
                </div>

                <div class="metric-card">
                    <div class="metric-value gradient-text">${Math.round(bmr)}</div>
                    <div class="metric-label">BMR</div>
                    <div class="metric-category">Calories/day</div>
                </div>

                <div class="metric-card">
                    <div class="metric-value rainbow-text">${dailyCalories}</div>
                    <div class="metric-label">Daily Need</div>
                    <div class="metric-category">Total Calories</div>
                </div>
            </div>

            <div class="health-recommendation">
                <strong class="gradient-text">📋 Recommendation:</strong>
                <p class="colorful-text">${recommendation}</p>

                <div class="smart-suggestions">
                    <h5 class="gradient-text">🍽️ Smart Canteen Suggestions:</h5>
                    ${getSmartMealSuggestions(healthGoalSuggestion, bmi)}
                </div>
            </div>

            <div class="health-goals-setup">
                <h5 class="gradient-text">🎯 Set Your Health Goal:</h5>
                <div class="goal-buttons">
                    <button class="goal-btn ${healthGoalSuggestion === 'weight_loss' ? 'active' : ''}"
                            onclick="setHealthGoal('weight_loss')">🔥 Weight Loss</button>
                    <button class="goal-btn ${healthGoalSuggestion === 'maintain_weight' ? 'active' : ''}"
                            onclick="setHealthGoal('maintain_weight')">⚖️ Maintain</button>
                    <button class="goal-btn ${healthGoalSuggestion === 'weight_gain' ? 'active' : ''}"
                            onclick="setHealthGoal('weight_gain')">💪 Weight Gain</button>
                    <button class="goal-btn" onclick="setHealthGoal('muscle_gain')">🏋️ Muscle Gain</button>
                </div>
            </div>
        </div>
    `;

    if (bmi >= 18.5 && bmi < 25) {
        appState.userHealthScore += 15;
        showToast("🎉 Bonus +15 health points for healthy BMI!");
    }

    updateStats();
    setupNutritionTracker();
}

function getSmartMealSuggestions(goal, bmi) {
    const suggestions = {
        'weight_loss': [
            '🥗 Mixed Green Salad (30 cal) - High fiber, low calories',
            '🍎 Fresh Apple (95 cal) - Natural sugars, fiber',
            '🥛 Greek Yogurt (130 cal) - Protein-rich, probiotics',
            '💧 Detox Water (5 cal) - Hydration, metabolism boost'
        ],
        'maintain_weight': [
            '🍚 Quinoa Power Bowl (220 cal) - Balanced macros',
            '🥪 Whole Wheat Sandwich (220 cal) - Complex carbs',
            '🥜 Mixed Nuts (160 cal) - Healthy fats, protein',
            '🥥 Coconut Water (45 cal) - Electrolytes, hydration'
        ],
        'weight_gain': [
            '🥜 Granola Bowl (180 cal) - Calorie-dense, nutritious',
            '🍌 Banana (105 cal) - Quick energy, potassium',
            '🥛 Almond Milk (40 cal) - Extra nutrition',
            '🍯 Oatmeal with Honey (200+ cal) - Sustained energy'
        ],
        'muscle_gain': [
            '🥛 Greek Yogurt (130 cal) - 15g protein',
            '🥜 Mixed Nuts (160 cal) - Protein + healthy fats',
            '🍳 Protein-rich meals - Building blocks for muscle',
            '🍌 Post-workout banana - Quick recovery fuel'
        ]
    };

    return suggestions[goal] ? suggestions[goal].map(item => `<div class="suggestion-item colorful-text">• ${item}</div>`).join('') : '';
}

function setHealthGoal(goal) {
    userHealthProfile.healthGoal = goal;
    saveHealthProfile();

    // Update button states
    document.querySelectorAll('.goal-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const goalMessages = {
        'weight_loss': '🔥 Weight loss goal set! Focus on low-calorie, high-nutrition items.',
        'maintain_weight': '⚖️ Maintenance goal set! Balanced eating for sustained energy.',
        'weight_gain': '💪 Weight gain goal set! Choose nutrient-dense, calorie-rich options.',
        'muscle_gain': '🏋️ Muscle gain goal set! Prioritize protein-rich foods and stay hydrated.'
    };

    showToast(goalMessages[goal]);
    updateSmartRecommendations();
}

// --- Daily Nutrition Tracker ---
function setupNutritionTracker() {
    // Initialize today's tracking if it's a new day
    const today = new Date().toDateString();
    const lastTracked = localStorage.getItem('lastTrackedDate');

    if (lastTracked !== today) {
        userHealthProfile.todaysIntake = {
            calories: 0,
            protein: 0,
            carbs: 0,
            fats: 0,
            meals: []
        };
        localStorage.setItem('lastTrackedDate', today);
        saveHealthProfile();
    }
}

function trackMealNutrition(mealName, calories, macros = {}) {
    const meal = {
        name: mealName,
        calories: calories,
        protein: macros.protein || 0,
        carbs: macros.carbs || 0,
        fats: macros.fats || 0,
        timestamp: new Date().toISOString()
    };

    userHealthProfile.todaysIntake.meals.push(meal);
    userHealthProfile.todaysIntake.calories += calories;
    userHealthProfile.todaysIntake.protein += macros.protein || 0;
    userHealthProfile.todaysIntake.carbs += macros.carbs || 0;
    userHealthProfile.todaysIntake.fats += macros.fats || 0;

    saveHealthProfile();
    updateNutritionDisplay();

    // Check if they've reached their daily goal
    if (userHealthProfile.dailyCalorieTarget) {
        const percentage = (userHealthProfile.todaysIntake.calories / userHealthProfile.dailyCalorieTarget) * 100;
        if (percentage >= 80 && percentage <= 120) {
            showToast("🎯 Great! You're within your daily calorie target range!");
            appState.userHealthScore += 5;
            updateStats();
        }
    }
}

function updateNutritionDisplay() {
    const nutritionPanel = document.getElementById('nutrition-panel');
    if (!nutritionPanel) return;

    const target = userHealthProfile.dailyCalorieTarget || 2000;
    const current = userHealthProfile.todaysIntake.calories;
    const percentage = Math.round((current / target) * 100);

    nutritionPanel.innerHTML = `
        <div class="nutrition-summary">
            <h4 class="gradient-text">📊 Today's Nutrition</h4>
            <div class="calorie-progress">
                <div class="progress-circle">
                    <span class="rainbow-text">${current}</span>
                    <small>/ ${target} cal</small>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${Math.min(percentage, 100)}%"></div>
                </div>
            </div>
            <div class="macro-breakdown">
                <div class="macro-item">
                    <span class="colorful-text">🥩 Protein:</span>
                    <span class="gradient-text">${userHealthProfile.todaysIntake.protein.toFixed(1)}g</span>
                </div>
                <div class="macro-item">
                    <span class="colorful-text">🍞 Carbs:</span>
                    <span class="gradient-text">${userHealthProfile.todaysIntake.carbs.toFixed(1)}g</span>
                </div>
                <div class="macro-item">
                    <span class="colorful-text">🥑 Fats:</span>
                    <span class="gradient-text">${userHealthProfile.todaysIntake.fats.toFixed(1)}g</span>
                </div>
            </div>
        </div>
    `;
}

function updateSmartRecommendations() {
    const menuItems = document.querySelectorAll('.menu-category li');

    menuItems.forEach(item => {
        const itemName = item.querySelector('.menu-item-name').textContent;
        const foodData = findFoodItemByName(itemName);

        if (foodData && userHealthProfile.healthGoal) {
            const isRecommended = isItemRecommendedForGoal(foodData, userHealthProfile.healthGoal);

            if (isRecommended) {
                item.classList.add('recommended-item');
                const badge = document.createElement('span');
                badge.className = 'recommendation-badge';
                badge.innerHTML = '🎯 Recommended';
                item.querySelector('.item-actions').appendChild(badge);
            }
        }
    });
}

function isItemRecommendedForGoal(item, goal) {
    switch (goal) {
        case 'weight_loss':
            return item.calories < 200 && item.healthScore >= 7;
        case 'maintain_weight':
            return item.healthScore >= 6;
        case 'weight_gain':
            return item.calories > 150 && item.healthScore >= 5;
        case 'muscle_gain':
            return item.healthScore >= 7 && (item.description.includes('protein') || item.name.includes('nuts') || item.name.includes('yogurt'));
        default:
            return false;
    }
}

function findFoodItemByName(name) {
    for (const category in HEALTHY_FOOD_DATABASE) {
        const item = HEALTHY_FOOD_DATABASE[category].find(food => food.name === name);
        if (item) return item;
    }
    return null;
}

// --- Enhanced Allergy & Dietary Preferences ---
function openDietaryPreferences() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'dietaryModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-leaf"></i> <span class="rainbow-text">Dietary Preferences & Allergies</span></h3>
                <span class="close-modal" onclick="closeDietaryModal()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="dietary-setup">
                    <h4 class="gradient-text">🍽️ Dietary Preferences</h4>
                    <div class="preference-grid">
                        <label class="preference-item">
                            <input type="checkbox" value="vegetarian"> 🌱 Vegetarian
                        </label>
                        <label class="preference-item">
                            <input type="checkbox" value="vegan"> 🌿 Vegan
                        </label>
                        <label class="preference-item">
                            <input type="checkbox" value="gluten-free"> 🌾 Gluten-Free
                        </label>
                        <label class="preference-item">
                            <input type="checkbox" value="low-carb"> 🥩 Low-Carb
                        </label>
                        <label class="preference-item">
                            <input type="checkbox" value="high-protein"> 💪 High-Protein
                        </label>
                    </div>

                    <h4 class="gradient-text">⚠️ Allergies & Restrictions</h4>
                    <div class="allergy-grid">
                        <label class="allergy-item">
                            <input type="checkbox" value="nuts"> 🥜 Nuts
                        </label>
                        <label class="allergy-item">
                            <input type="checkbox" value="dairy"> 🥛 Dairy
                        </label>
                        <label class="allergy-item">
                            <input type="checkbox" value="eggs"> 🥚 Eggs
                        </label>
                        <label class="allergy-item">
                            <input type="checkbox" value="soy"> 🫘 Soy
                        </label>
                        <label class="allergy-item">
                            <input type="checkbox" value="spicy"> 🌶️ Spicy Food
                        </label>
                    </div>

                    <button class="btn-primary rainbow-btn" onclick="saveDietaryPreferences()">
                        <i class="fas fa-save"></i> Save Preferences
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    // Load existing preferences
    loadSavedPreferences();

    window.closeDietaryModal = () => modal.remove();
}

function loadSavedPreferences() {
    userHealthProfile.dietaryPreferences.forEach(pref => {
        const checkbox = document.querySelector(`input[value="${pref}"]`);
        if (checkbox) checkbox.checked = true;
    });

    userHealthProfile.allergyInfo.forEach(allergy => {
        const checkbox = document.querySelector(`input[value="${allergy}"]`);
        if (checkbox) checkbox.checked = true;
    });
}

function saveDietaryPreferences() {
    const preferences = Array.from(document.querySelectorAll('.preference-item input:checked')).map(cb => cb.value);
    const allergies = Array.from(document.querySelectorAll('.allergy-item input:checked')).map(cb => cb.value);

    userHealthProfile.dietaryPreferences = preferences;
    userHealthProfile.allergyInfo = allergies;
    saveHealthProfile();

    showToast(`✅ Saved ${preferences.length} dietary preferences and ${allergies.length} allergy restrictions!`);
    closeDietaryModal();

    // Update menu display to reflect preferences
    drawMenu();
}

// Load sample data for testing
function loadSampleData() {
    document.getElementById('height').value = 165;
    document.getElementById('weight').value = 58;
    document.getElementById('age').value = 16;
    const genderSelect = document.getElementById('gender');
    const activitySelect = document.getElementById('activityLevel');

    if (genderSelect) genderSelect.value = 'female';
    if (activitySelect) activitySelect.value = 'moderate';

    showToast("📝 Sample data loaded! Click 'Analyze My Health' to see results.");
}

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', function() {
    // Initialize DOM elements
    menuDisplayDiv = document.getElementById('menu-display');
    itemInputField = document.getElementById('itemInput');
    messageDisplay = document.getElementById('message-display');
    checkButton = document.getElementById('checkButton');

    // Initialize app
    initializeApp();

    // Add event listeners
    if (checkButton) {
        checkButton.addEventListener('click', handleCheckItem);
    }

    if (itemInputField) {
        itemInputField.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleCheckItem();
            }
        });
    }

    // Initialize menu display
    if (menuDisplayDiv) {
        createFilterButtons();
        drawMenu();
    }

    // Initialize stats
    updateStats();
});

// --- Menu Tabs System ---
let currentMenuTab = 'healthy';

function switchMenuTab(tab) {
    currentMenuTab = tab;

    document.querySelectorAll('.menu-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    const healthyMenu = document.getElementById('menu-display');
    const junkMenu = document.getElementById('junk-menu-display');

    if (tab === 'healthy') {
        healthyMenu.style.display = 'block';
        junkMenu.style.display = 'none';
        drawMenu();
    } else {
        healthyMenu.style.display = 'none';
        junkMenu.style.display = 'block';
        drawJunkMenu();
    }
}

// --- Junk Food Menu (50+ Items) ---
const JUNK_FOOD_MENU = {
    "🍕 Hot Foods & Street Food": [
        { name: "🍕 Mini Pizza", description: "Small personal pizza with cheese and vegetables", calories: 285, healthScore: 3, price: 50, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop" },
        { name: "🌶️ Chilli Potato", description: "Spicy fried potato cubes with sauce", calories: 320, healthScore: 2, price: 50, image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop" },
        { name: "🍜 Chowmein Small", description: "Stir-fried noodles with vegetables", calories: 180, healthScore: 3, price: 20, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
        { name: "🍜 Chowmein Medium", description: "Medium portion stir-fried noodles", calories: 250, healthScore: 3, price: 30, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
        { name: "🍜 Chowmein Large", description: "Large portion stir-fried noodles", calories: 320, healthScore: 3, price: 40, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
        { name: "🍜 Chowmein XL", description: "Extra large portion stir-fried noodles", calories: 390, healthScore: 3, price: 50, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
        { name: "🌭 Hot Dog", description: "Grilled sausage in bun with sauces", calories: 290, healthScore: 2, price: 50, image: "https://images.unsplash.com/photo-1612392166886-ee7c39bf7c82?w=400&h=300&fit=crop" },
        { name: "🍔 Burger", description: "Vegetarian burger with patty and vegetables", calories: 350, healthScore: 2, price: 50, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop" },
        { name: "🌯 Paneer Roll", description: "Soft roll with spiced paneer filling", calories: 280, healthScore: 3, price: 50, image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop" },
        { name: "🥪 Sandwich", description: "Grilled vegetable sandwich", calories: 220, healthScore: 3, price: 45, image: "https://images.unsplash.com/photo-1539252554453-80ab65ce3586?w=400&h=300&fit=crop" },
        { name: "🟤 Patty", description: "Crispy fried vegetable patty", calories: 180, healthScore: 2, price: 35, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=300&fit=crop" },
        { name: "🍟 French Fries", description: "Crispy golden potato fries", calories: 365, healthScore: 2, price: 50, image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=400&h=300&fit=crop" }
    ],
    "🥔 Chips & Packaged Snacks": [
        { name: "🥔 Chips Small", description: "Small packet of salted potato chips", calories: 150, healthScore: 2, price: 10, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop" },
        { name: "🥔 Chips Medium", description: "Medium packet of flavored chips", calories: 220, healthScore: 2, price: 20, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop" },
        { name: "🥔 Chips Large", description: "Large packet of premium chips", calories: 320, healthScore: 2, price: 30, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=300&fit=crop" },
        { name: "🧃 Coca-Cola (Can)", description: "Classic carbonated soft drink", calories: 140, healthScore: 1, price: 25, image: "https://images.unsplash.com/photo-1622160040569-0e044446205dd?w=400&h=300&fit=crop" },
        { name: "🥤 Coca-Cola (Bottle)", description: "Classic carbonated soft drink", calories: 200, healthScore: 1, price: 35, image: "https://images.unsplash.com/photo-1577703721081-3059818e116a?w=400&h=300&fit=crop" },
        { name: "🧃 Sprite (Can)", description: "Lemon-lime flavored soft drink", calories: 130, healthScore: 1, price: 25, image: "https://images.unsplash.com/photo-16081010210-07955554450?w=400&h=300&fit=crop" },
        { name: "🥤 Fanta (Bottle)", description: "Orange flavored soft drink", calories: 190, healthScore: 1, price: 35, image: "https://images.unsplash.com/photo-1621280415260-04b02254726e?w=400&h=300&fit=crop" },
        { name: "🧃 Pepsi (Can)", description: "Classic carbonated soft drink", calories: 130, healthScore: 1, price: 25, image: "https://images.unsplash.com/photo-1553741776-4510784b254f?w=400&h=300&fit=crop" },
        { name: "🧃 Pepsi (Bottle)", description: "Classic carbonated soft drink", calories: 190, healthScore: 1, price: 35, image: "https://images.unsplash.com/photo-1553741776-4510784b254f?w=400&h=300&fit=crop" },
        { name: "🌶️ Kurkure", description: "Crunchy corn puffs with spices", calories: 140, healthScore: 2, price: 15, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" },
        { name: "🔺 Bingo Mad Angles", description: "Triangular masala flavored snacks", calories: 150, healthScore: 2, price: 25, image: "https://images.unsplash.com/photo-1628191010210-a59de33ce2cc?w=400&h=300&fit=crop" },
        { name: "🥜 Haldiram's Bhujia", description: "Traditional namkeen with spices", calories: 180, healthScore: 2, price: 30, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" }
    ],
    "🍪 Biscuits & Cookies": [
        { name: "🍪 Parle-G Biscuits", description: "Classic glucose biscuits", calories: 80, healthScore: 3, price: 8, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop" },
        { name: "🍪 Hide & Seek Cookies", description: "Chocolate chip cookies", calories: 120, healthScore: 2, price: 15, image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop" },
        { name: "⚫ Oreo Biscuits", description: "Cream filled chocolate cookies", calories: 140, healthScore: 2, price: 15, image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop" }
    ],
    "🍫 Chocolates & Candies": [
        { name: "🍫 KitKat", description: "Crispy wafer chocolate bar", calories: 110, healthScore: 1, price: 15, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop" },
        { name: "🍫 Perk", description: "Crunchy chocolate wafer", calories: 95, healthScore: 1, price: 8, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop" },
        { name: "🥜 Munch", description: "Crunchy peanut chocolate", calories: 85, healthScore: 1, price: 8, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop" },
        { name: "🥜 Snickers Mini", description: "Peanut caramel chocolate bar", calories: 180, healthScore: 1, price: 35, image: "https://images.unsplash.com/photo-1511381939415-e44015466834?w=400&h=300&fit=crop" }
    ],
    "🍜 Instant Foods": [
        { name: "🍜 Maggi Noodles", description: "2-minute masala instant noodles", calories: 280, healthScore: 2, price: 17, image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400&h=300&fit=crop" },
        { name: "🍿 Act II Popcorn", description: "Microwave butter popcorn", calories: 250, healthScore: 3, price: 20, image: "https://images.unsplash.com/photo-1578662996442-4844084a0c96?w=400&h=300&fit=crop" }
    ],
    "🍰 Cakes & Sweets": [
        { name: "🍰 Little Debbie Cake", description: "Soft sponge cake with cream", calories: 320, healthScore: 1, price: 30, image: "https://images.unsplash.com/photo-1578985545062787?w=400&h=300&fit=crop" },
        { name: "🥜 Almond Chikki", description: "Traditional almond jaggery bar", calories: 150, healthScore: 3, price: 12, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" },
        { name: "🥜 Peanut Chikki", description: "Crunchy peanut jaggery bar", calories: 140, healthScore: 3, price: 10, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" }
    ],
    "🌾 Healthy Alternatives": [
        { name: "🫘 Roasted Makhana Small", description: "Fox nuts with light seasoning", calories: 120, healthScore: 7, price: 40, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" },
        { name: "🫘 Roasted Makhana Large", description: "Premium fox nuts with herbs", calories: 200, healthScore: 7, price: 80, image: "https://images.unsplash.com/photo-1599599810694-57a2ca8276a8?w=400&h=300&fit=crop" }
    ]
};

function drawJunkMenu() {
    const junkMenuDiv = document.getElementById('junk-menu-display');
    junkMenuDiv.innerHTML = '';

    const warningBanner = document.createElement('div');
    warningBanner.className = 'junk-warning';
    warningBanner.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span class="rainbow-text">⚠️ These items are available in limited quantities and should be consumed occasionally as part of a balanced diet.</span>
    `;
    junkMenuDiv.appendChild(warningBanner);

    for (const category in JUNK_FOOD_MENU) {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category', 'junk-category');

        const categoryHeader = document.createElement('h3');
        categoryHeader.innerHTML = `<span class="gradient-text">${category}</span>`;
        categoryDiv.appendChild(categoryHeader);

        const itemList = document.createElement('ul');
        JUNK_FOOD_MENU[category].forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add('junk-item');
            listItem.style.cursor = 'pointer';
            listItem.addEventListener('click', () => handleMenuItemClick(item.name));

            listItem.innerHTML = `
                <div class="item-header">
                    <div class="item-image">
                        <img src="${item.image}" alt="${item.name}">
                    </div>
                    <div class="item-info">
                        <span class="menu-item-name gradient-text">${item.name}</span>
                        <div class="item-actions">
                            <span class="health-score-badge warning rainbow-bg"><i class="fas fa-exclamation-triangle"></i> ${item.healthScore}/10</span>
                            <span class="price-tag colorful-text">₹${item.price}</span>
                            <button class="buy-btn gradient-btn" onclick="event.stopPropagation(); addJunkToCart('${item.name}', ${item.price})">
                                <i class="fas fa-shopping-cart"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="menu-item-details">
                    <p class="colorful-text"><i class="fas fa-info-circle"></i> ${item.description}</p>
                    <p class="gradient-text"><i class="fas fa-fire"></i> ${item.calories} calories</p>
                </div>
            `;
            itemList.appendChild(listItem);
        });
        categoryDiv.appendChild(itemList);
        junkMenuDiv.appendChild(categoryDiv);
    }
}

function addJunkToCart(itemName, price) {
    if (!currentStudent) {
        showToast("🔒 Please login to make purchases");
        openLoginModal();
        return;
    }

    if (confirm(`⚠️ "${itemName}" is a junk food item. Are you sure you want to add it to your cart?`)) {
        addToCart(itemName, price);
        appState.userHealthScore -= 2;
        showToast(`${itemName} added to cart (Health score -2 penalty)`);
        updateStats();
    }
}

// --- Customer Care System ---
function openCustomerCare() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'customerCareModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-headset"></i> <span class="rainbow-text">Customer Care - School Hackers P.B.L</span></h3>
                <span class="close-modal" onclick="closeCustomerCare()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="customer-care-info">
                    <h4 class="gradient-text">🎓 School Hackers P.B.L Group</h4>
                    <p class="colorful-text"><strong>Project:</strong> Smart Canteen System</p>
                    <p class="colorful-text"><strong>School:</strong> Silverline Prestige School, Ghaziabad</p>
                    <hr>
                    <h4 class="gradient-text">📞 Support Contact</h4>
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <strong class="colorful-text">Email:</strong> <span class="rainbow-text">s.18.266@slps.one</span>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <strong class="colorful-text">Support Hours:</strong> <span class="gradient-text">8:00 AM - 4:00 PM (School Hours)</span>
                    </div>
                    <hr>
                    <h4 class="gradient-text">🚀 Quick Actions</h4>
                    <button class="btn-primary rainbow-btn" onclick="reportIssue()">
                        <i class="fas fa-bug"></i> Report Issue
                    </button>
                    <button class="btn-primary gradient-btn" onclick="requestFeature()">
                        <i class="fas fa-lightbulb"></i> Request Feature
                    </button>
                    <button class="btn-primary colorful-btn" onclick="contactSupport()">
                        <i class="fas fa-envelope"></i> Email Support
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function closeCustomerCare() {
    const modal = document.getElementById('customerCareModal');
    if (modal) {
        modal.remove();
    }
}

function reportIssue() {
    const subject = encodeURIComponent('Issue Report - Smart Canteen App');
    const body = encodeURIComponent(`Dear School Hackers P.B.L Team,

I would like to report an issue with the Smart Canteen App:

Issue Description: [Please describe the issue]
Student ID: ${currentStudent ? currentStudent.id : 'Not logged in'}
Student Class: ${currentStudent ? currentStudent.class : 'Not logged in'}

Thank you for your support!`);

    window.open(`mailto:s.18.266@slps.one?subject=${subject}&body=${body}`);
    closeCustomerCare();
}

function requestFeature() {
    const subject = encodeURIComponent('Feature Request - Smart Canteen App');
    const body = encodeURIComponent(`Dear School Hackers P.B.L Team,

I would like to request a new feature:

Feature Description: [Please describe the feature]
Student ID: ${currentStudent ? currentStudent.id : 'Not logged in'}
Student Class: ${currentStudent ? currentStudent.class : 'Not logged in'}

Thank you!`);

    window.open(`mailto:s.18.266@slps.one?subject=${subject}&body=${body}`);
    closeCustomerCare();
}

function contactSupport() {
    const subject = encodeURIComponent('Support Request - Smart Canteen App');
    const body = encodeURIComponent(`Dear School Hackers P.B.L Team,

I need support with:

Query: [Please describe your question]
Student ID: ${currentStudent ? currentStudent.id : 'Not logged in'}
Student Class: ${currentStudent ? currentStudent.class : 'Not logged in'}

Thank you!`);

    window.open(`mailto:s.18.266@slps.one?subject=${subject}&body=${body}`);
    closeCustomerCare();
}

// --- Account System ---
function openCreateAccountModal() {
    const modal = document.getElementById('createAccountModal');
    modal.style.display = 'block';
}

function closeCreateAccountModal() {
    const modal = document.getElementById('createAccountModal');
    modal.style.display = 'none';
}

function createNewAccount() {
    const name = document.getElementById('newStudentName').value;
    const email = document.getElementById('newStudentEmail').value;
    const studentClass = document.getElementById('newStudentClass').value;
    const password = document.getElementById('newStudentPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (!name || !email || !studentClass || !password || !confirmPassword) {
        showToast("📝 Please fill in all fields");
        return;
    }

    if (password !== confirmPassword) {
        showToast("🔑 Passwords do not match");
        return;
    }

    if (password.length < 6) {
        showToast("🔒 Password must be at least 6 characters long");
        return;
    }

    const studentId = `S.24.${Math.floor(Math.random() * 999).toString().padStart(3, '0')}`;

    localStorage.setItem('newAccount', JSON.stringify({
        id: studentId,
        name: name,
        email: email,
        class: studentClass,
        created: new Date().toISOString()
    }));

    closeCreateAccountModal();
    showToast(`🎉 Account created successfully! Your Student ID is: ${studentId}`);

    currentStudent = {
        id: studentId,
        class: studentClass,
        name: name
    };

    document.getElementById('login-prompt').style.display = 'none';
    document.getElementById('user-welcome').style.display = 'block';

    document.getElementById('student-name').innerHTML = `<span class="gradient-text">${currentStudent.name}</span>`;
    document.getElementById('student-class-display').innerHTML = `<span class="colorful-text">${currentStudent.class}</span>`;
    document.getElementById('student-id-display').innerHTML = `<span class="rainbow-text">${currentStudent.id}</span>`;
}

function continueWithGoogle() {
    showToast("🌐 Google authentication would be implemented here. For now, please use Student Login or Create Account.");

    setTimeout(() => {
        const confirmed = confirm("Demo: Continue with Google Account?\n\nThis will create a demo Google user account.");
        if (confirmed) {
            currentStudent = {
                id: `G.${Date.now()}`,
                class: "Google User",
                name: "Google Student"
            };

            document.getElementById('login-prompt').style.display = 'none';
            document.getElementById('user-welcome').style.display = 'block';

            document.getElementById('student-name').innerHTML = `<span class="gradient-text">${currentStudent.name}</span>`;
            document.getElementById('student-class-display').innerHTML = `<span class="colorful-text">${currentStudent.class}</span>`;
            document.getElementById('student-id-display').innerHTML = `<span class="rainbow-text">${currentStudent.id}</span>`;

            showToast("🎉 Successfully logged in with Google (Demo)!");
        }
    }, 500);
}

// --- Feedback System ---
let currentRating = 0;

function setupStarRating() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => {
            currentRating = index + 1;
            updateStarDisplay();
        });

        star.addEventListener('mouseover', () => {
            updateStarHover(index + 1);
        });
    });

    const starContainer = document.querySelector('.star-rating');
    if (starContainer) {
        starContainer.addEventListener('mouseleave', () => {
            updateStarDisplay();
        });
    }
}

function updateStarDisplay() {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < currentRating);
    });
}

function updateStarHover(hoverRating) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.color = index < hoverRating ? '#fbbf24' : '#e2e8f0';
    });
}

function submitFeedback() {
    const feedbackText = document.getElementById('feedback-text').value;

    if (currentRating === 0) {
        showToast("⭐ Please select a rating");
        return;
    }

    if (!feedbackText.trim()) {
        showToast("📝 Please enter your feedback");
        return;
    }

    const feedback = {
        rating: currentRating,
        text: feedbackText,
        timestamp: new Date().toISOString(),
        student: currentStudent ? currentStudent.name : 'Anonymous',
        studentId: currentStudent ? currentStudent.id : null,
        studentClass: currentStudent ? currentStudent.class : 'N/A', // Add student class
        verified: currentStudent ? true : false
    };

    // Save to localStorage
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.unshift(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks.slice(0, 50))); // Keep last 50 reviews

    // Reset form
    currentRating = 0;
    updateStarDisplay();
    document.getElementById('feedback-text').value = '';

    // Update display with new feedback
    displayRealFeedback();

    showToast("🌟 Thank you for your feedback! It helps us improve the canteen experience.");

    if (currentStudent) {
        appState.userHealthScore += 5;
        updateStats();
        showToast("🎉 Bonus +5 health points for sharing valuable feedback!");
    }

    // Simulate sending feedback to school administration
    setTimeout(() => {
        showToast("📧 Your feedback has been sent to school administration for review.");
    }, 2000);
}

// --- Login Tab Switching ---
function switchLoginTab(tab) {
    // Remove active class from all tabs and content
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.login-tab-content').forEach(c => c.classList.remove('active'));

    // Add active class to selected tab and content
    event.target.classList.add('active');
    document.getElementById(tab === 'quick' ? 'quick-login' : 'detailed-login').classList.add('active');
}

// --- Real Feedback System ---
function displayRealFeedback() {
    const realFeedbacks = [
        {
            name: "Arjun Singh (Class 10A)",
            rating: "★★★★★",
            text: "The quinoa power bowl is absolutely amazing! Love how the app makes healthy eating so convenient. The nutrition tracker helps me stay on track with my goals.",
            verified: true,
            date: "2 days ago"
        },
        {
            name: "Priya Sharma (Class 9B)",
            rating: "★★★★☆",
            text: "Great variety of healthy foods! The smoothies are my favorite. Would love to see more seasonal fruit options. The BMI calculator is really helpful too!",
            verified: true,
            date: "5 days ago"
        },
        {
            name: "Rahul Kumar (Class 8C)",
            rating: "★★★★★",
            text: "This app made ordering food so much easier! No more waiting in long queues. Pre-ordering feature saves so much time during lunch break.",
            verified: true,
            date: "1 week ago"
        },
        {
            name: "Sneha Patel (Class 7A)",
            rating: "★★★★★",
            text: "I love the colorful design and how easy it is to find healthy options. The health score game makes eating nutritious food fun! My parents are impressed.",
            verified: true,
            date: "1 week ago"
        },
        {
            name: "Vikash Gupta (Class 10B)",
            rating: "★★★★☆",
            text: "The dark mode is perfect for my eyes. Customer support responded quickly when I had an issue. Would recommend adding more protein options.",
            verified: true,
            date: "2 weeks ago"
        },
        {
            name: "Ananya Roy (Class 6D)",
            rating: "★★★★★",
            text: "My first time using a school app like this. The interface is so user-friendly! Even my mom learned to use it quickly. Love the daily specials section.",
            verified: true,
            date: "2 weeks ago"
        }
    ];

    const feedbackDisplay = document.querySelector('.feedback-display');
    if (feedbackDisplay) {
        const feedbackHTML = realFeedbacks.map(feedback => `
            <div class="review-item ${feedback.verified ? 'verified-review' : ''}">
                <div class="review-header">
                    <div class="reviewer-info">
                        <span class="reviewer-name">${feedback.name}</span>
                        ${feedback.verified ? '<i class="fas fa-check-circle verified-badge" title="Verified Student"></i>' : ''}
                    </div>
                    <div class="review-meta">
                        <div class="review-rating">${feedback.rating}</div>
                        <span class="review-date">${feedback.date}</span>
                    </div>
                </div>
                <p class="review-text">${feedback.text}</p>
            </div>
        `).join('');

        feedbackDisplay.innerHTML = `
            <div class="feedback-header">
                <h4><i class="fas fa-comments"></i> Recent Student Reviews</h4>
                <div class="review-stats">
                    <span class="total-reviews">Based on 127 reviews</span>
                    <div class="rating-summary">
                        <span class="average-rating">4.8</span>
                        <div class="stars">★★★★★</div>
                    </div>
                </div>
            </div>
            <div class="reviews-container">
                ${feedbackHTML}
            </div>
            <div class="feedback-pagination">
                <button class="load-more-reviews" onclick="loadMoreReviews()">
                    <i class="fas fa-chevron-down"></i>
                    Load More Reviews
                </button>
            </div>
        `;
    }
}

function loadMoreReviews() {
    showToast("📝 Loading more reviews... This feature will show older reviews!");
}

function addCategoryToFeedback(category) {
    const textArea = document.getElementById('feedback-text');
    const currentText = textArea.value;

    // Toggle category tag active state
    event.target.classList.toggle('active');

    // Add category to feedback if not already present
    if (!currentText.includes(`[${category}]`)) {
        const newText = currentText ? `${currentText}\n\n[${category}] ` : `[${category}] `;
        textArea.value = newText;
        textArea.focus();
        textArea.setSelectionRange(textArea.value.length, textArea.value.length);
    }

    showToast(`📝 ${category} category added to your feedback!`);
}

// --- Modern App Features ---

// Offline Support
function initializeOfflineSupport() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js').then(function(registration) {
            console.log('ServiceWorker registration successful');
        }).catch(function(err) {
            console.warn('ServiceWorker registration failed: ', err);
        });
    }

    // Cache key data for offline use
    window.addEventListener('beforeunload', function() {
        localStorage.setItem('offlineData', JSON.stringify({
            favorites: appState.favorites,
            healthScore: appState.userHealthScore,
            itemsChecked: appState.itemsChecked,
            healthyChoices: appState.healthyChoices
        }));
    });
}

// User Profile Management
function loadUserProfile() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
        const profile = JSON.parse(savedProfile);
        if (profile.autoLogin && profile.credentials) {
            currentStudent = profile.credentials;
            document.getElementById('login-prompt').style.display = 'none';
            document.getElementById('user-welcome').style.display = 'block';
            updateWelcomeDisplay();
        }
    }
}

function saveUserProfile() {
    if (currentStudent) {
        const profile = {
            credentials: currentStudent,
            preferences: {
                darkMode: appState.darkMode,
                favorites: appState.favorites
            },
            autoLogin: true,
            lastLogin: new Date().toISOString()
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }
}

function updateWelcomeDisplay() {
    if (currentStudent) {
        document.getElementById('student-name').innerHTML = `<span class="gradient-text">${currentStudent.name}</span>`;
        document.getElementById('student-class-display').innerHTML = `<span class="colorful-text">${currentStudent.class}</span>`;
        document.getElementById('student-id-display').innerHTML = `<span class="rainbow-text">${currentStudent.id}</span>`;
    }
}

// Performance Monitoring
function trackUserActivity() {
    const activity = {
        sessionStart: new Date().toISOString(),
        itemsViewed: 0,
        ordersPlaced: 0,
        favoritesAdded: 0,
        feedbackSubmitted: 0
    };

    window.addEventListener('beforeunload', function() {
        activity.sessionEnd = new Date().toISOString();
        activity.sessionDuration = Date.now() - new Date(activity.sessionStart).getTime();

        const analytics = JSON.parse(localStorage.getItem('userAnalytics') || '[]');
        analytics.push(activity);
        localStorage.setItem('userAnalytics', JSON.stringify(analytics.slice(-50))); // Keep last 50 sessions
    });

    return activity;
}

// Progressive Web App Features
function initializePWA() {
    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;

        // Show install banner
        const installBanner = document.createElement('div');
        installBanner.className = 'install-banner';
        installBanner.innerHTML = `
            <div class="install-content">
                <i class="fas fa-download"></i>
                <span>Install Smart Canteen app for better experience!</span>
                <button onclick="installPWA()" class="install-btn">Install</button>
                <button onclick="dismissInstall()" class="dismiss-btn">×</button>
            </div>
        `;
        document.body.appendChild(installBanner);

        window.installPWA = () => {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                }
                deferredPrompt = null;
                installBanner.remove();
            });
        };

        window.dismissInstall = () => installBanner.remove();
    });
}

// --- Load JSON Data ---
let appData = {};

async function loadAppData() {
    try {
        const response = await fetch('./data.json');
        appData = await response.json();
        console.log('App data loaded successfully:', appData);
        integrateJsonData();
    } catch (error) {
        console.error('Failed to load app data:', error);
        // Fallback to existing hardcoded data
    }
}

function integrateJsonData() {
    if (appData.menuCategories) {
        // Update today's specials
        updateTodaysSpecials();

        // Update menu with JSON data
        updateMenuFromJson();

        // Initialize gamification features
        initializeGamification();

        // Setup AI features
        setupAIFeatures();
    }
}

function updateTodaysSpecials() {
    const specialsGrid = document.getElementById('daily-specials');
    if (!specialsGrid || !appData.menuCategories.todaysSpecials) return;

    specialsGrid.innerHTML = '';
    appData.menuCategories.todaysSpecials.forEach(special => {
        const specialItem = document.createElement('div');
        specialItem.className = 'special-item featured-special';
        specialItem.innerHTML = `
            <div class="special-badge rainbow-bg">${special.badge}</div>
            <img src="${special.image}" alt="${special.name}" onerror="this.src='https://via.placeholder.com/400x300?text=🍎+Food+Image'">
            <div class="special-content">
                <h3 class="gradient-text">${special.name}</h3>
                <p class="colorful-text">${special.description}</p>
                <div class="special-tags">
                    ${special.tags.map(tag => `<span class="tag ${tag}">${tag}</span>`).join('')}
                </div>
                <div class="special-price rainbow-text">
                    ₹${special.price}
                    ${special.originalPrice ? `<span class="regular-price">₹${special.originalPrice}</span>` : ''}
                </div>
                <div class="special-info">
                    <span class="calories gradient-text">🔥 ${special.calories} cal</span>
                    <span class="health-score colorful-text">⭐ ${special.healthScore}/10</span>
                    <span class="stock ${special.stock < 10 ? 'low-stock' : ''}">${special.stock} left</span>
                </div>
                <button class="order-special-btn rainbow-btn" onclick="addToCart('${special.name}', ${special.price})">
                    <i class="fas fa-shopping-cart"></i> Order Now
                </button>
            </div>
        `;
        specialsGrid.appendChild(specialItem);
    });
}

// --- New Gamification Features ---
function initializeGamification() {
    if (!appData.gamification) return;

    updateBadgeSystem();
    setupLeaderboards();
    initializeEcoFeatures();
}

function updateBadgeSystem() {
    const badges = appData.gamification.badges;
    const userBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');

    // Check for new badge achievements
    badges.forEach(badge => {
        if (checkBadgeRequirement(badge) && !userBadges.includes(badge.id)) {
            awardBadge(badge);
        }
    });
}

function checkBadgeRequirement(badge) {
    const userStats = JSON.parse(localStorage.getItem('userStats') || '{}');

    switch(badge.id) {
        case 'hydration_hero':
            return userStats.waterIntake >= 56; // 8 glasses * 7 days
        case 'green_champ':
            return userStats.healthyMeals >= 10;
        case 'no_junk_streak':
            return userStats.junkFreeStreak >= 5;
        case 'eco_warrior':
            return userStats.ownBottleCount >= 10;
        default:
            return false;
    }
}

function awardBadge(badge) {
    const userBadges = JSON.parse(localStorage.getItem('userBadges') || '[]');
    userBadges.push(badge.id);
    localStorage.setItem('userBadges', JSON.stringify(userBadges));

    showBadgeNotification(badge);
    appState.userHealthScore += badge.points;
    updateStats();
}

function showBadgeNotification(badge) {
    const notification = document.createElement('div');
    notification.className = 'badge-notification';
    notification.innerHTML = `
        <div class="badge-content">
            <div class="badge-icon">${badge.icon}</div>
            <div class="badge-info">
                <h4 class="rainbow-text">Badge Earned!</h4>
                <p class="gradient-text">${badge.name}</p>
                <small class="colorful-text">+${badge.points} points</small>
            </div>
            <button onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => notification.remove(), 5000);
}

// --- AI Mood-Based Food Suggestions ---
function setupAIFeatures() {
    if (!appData.aiFeatures) return;

    addMoodSelector();
    setupVoiceOrdering();
}

function addMoodSelector() {
    const moodSelector = document.createElement('div');
    moodSelector.className = 'mood-selector';
    moodSelector.innerHTML = `
        <h4 class="gradient-text">🎭 How are you feeling today?</h4>
        <div class="mood-buttons">
            <button class="mood-btn" onclick="suggestFoodByMood('happy')">😊 Happy</button>
            <button class="mood-btn" onclick="suggestFoodByMood('sad')">😢 Sad</button>
            <button class="mood-btn" onclick="suggestFoodByMood('tired')">😴 Tired</button>
            <button class="mood-btn" onclick="suggestFoodByMood('excited')">🤩 Excited</button>
            <button class="mood-btn" onclick="suggestFoodByMood('stressed')">😰 Stressed</button>
        </div>
        <div id="mood-suggestions" class="mood-suggestions"></div>
    `;

    const searchSection = document.querySelector('.search-section');
    if (searchSection) {
        searchSection.appendChild(moodSelector);
    }
}

function suggestFoodByMood(mood) {
    if (!appData.aiFeatures.moodFoodMapping[mood]) return;

    const suggestions = appData.aiFeatures.moodFoodMapping[mood];
    const suggestionsDiv = document.getElementById('mood-suggestions');

    suggestionsDiv.innerHTML = `
        <h5 class="colorful-text">🎯 Perfect for your ${mood} mood:</h5>
        <div class="food-suggestions">
            ${suggestions.map(food => `
                <button class="suggestion-item rainbow-btn" onclick="itemInputField.value='${food}'; handleCheckItem();">
                    ${food}
                </button>
            `).join('')}
        </div>
    `;

    showToast(`🎭 Found ${suggestions.length} perfect foods for your ${mood} mood!`);
}

// --- Voice Ordering Feature ---
function setupVoiceOrdering() {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        console.log('Speech recognition not supported');
        return;
    }

    addVoiceOrderButton();
}

function addVoiceOrderButton() {
    const voiceBtn = document.createElement('button');
    voiceBtn.className = 'voice-order-btn rainbow-btn';
    voiceBtn.innerHTML = '<i class="fas fa-microphone"></i> Voice Order';
    voiceBtn.onclick = startVoiceOrder;

    const quickActions = document.querySelector('.quick-actions');
    if (quickActions) {
        quickActions.appendChild(voiceBtn);
    }
}

function startVoiceOrder() {
    if (!('webkitSpeechRecognition' in window)) {
        showToast("🎤 Voice ordering not supported in this browser");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
        showToast("🎤 Listening... Say your order!");
    };

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        processVoiceOrder(transcript);
    };

    recognition.onerror = () => {
        showToast("❌ Voice recognition failed. Please try again.");
    };

    recognition.start();
}

function processVoiceOrder(transcript) {
    showToast(`🎤 You said: "${transcript}"`);

    // Simple voice order processing
    const lowerTranscript = transcript.toLowerCase();

    // Extract items and quantities
    const items = [];

    if (lowerTranscript.includes('pizza')) items.push({name: '🍕 Mini Pizza', price: 50});
    if (lowerTranscript.includes('apple')) items.push({name: '🍎 Red Apple', price: 15});
    if (lowerTranscript.includes('smoothie')) items.push({name: '🥤 Fresh Fruit Smoothie', price: 45});
    if (lowerTranscript.includes('water')) items.push({name: '💧 Water Bottle', price: 10});

    if (items.length > 0) {
        items.forEach(item => addToCart(item.name, item.price));
        showToast(`✅ Added ${items.length} items from your voice order!`);
    } else {
        showToast("🤔 Couldn't understand your order. Please try again or use the menu.");
    }
}

// --- AR Food Preview Feature ---
function openARPreview(foodName) {
    if (!appData.futuristicFeatures?.arPreview?.enabled) {
        showToast("🥽 AR Preview coming soon!");
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal ar-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-cube"></i> <span class="rainbow-text">AR Food Preview</span></h3>
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="ar-preview-container">
                    <div class="ar-camera-view">
                        <div class="ar-placeholder">
                            <div class="food-3d-model">
                                <div class="rotating-food">🍔</div>
                            </div>
                            <p class="gradient-text">Point your camera at your desk to see ${foodName} in 3D!</p>
                        </div>
                    </div>
                    <div class="ar-controls">
                        <button class="ar-btn rainbow-btn" onclick="rotateFood()">
                            <i class="fas fa-sync"></i> Rotate
                        </button>
                        <button class="ar-btn gradient-btn" onclick="addToCart('${foodName}', 50)">
                            <i class="fas fa-cart-plus"></i> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function rotateFood() {
    const foodModel = document.querySelector('.rotating-food');
    if (foodModel) {
        foodModel.style.transform = `rotateY(${Math.random() * 360}deg)`;
        showToast("🔄 Food rotated! This is a demo of AR preview.");
    }
}

// --- Eco Features ---
function initializeEcoFeatures() {
    if (!appData.ecoFeatures) return;

    setupEcoTracking();
    addEcoButtons();
}

function setupEcoTracking() {
    const ecoStats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
    if (!ecoStats.bottleCount) ecoStats.bottleCount = 0;
    if (!ecoStats.tiffinCount) ecoStats.tiffinCount = 0;
    if (!ecoStats.zeroWasteCount) ecoStats.zeroWasteCount = 0;
    localStorage.setItem('ecoStats', JSON.stringify(ecoStats));
}

function addEcoButtons() {
    const ecoSection = document.createElement('div');
    ecoSection.className = 'eco-section';
    ecoSection.innerHTML = `
        <h4 class="gradient-text">🌱 Eco-Friendly Actions</h4>
        <div class="eco-buttons">
            <button class="eco-btn" onclick="logEcoAction('bottle')">
                <i class="fas fa-water"></i> Brought Own Bottle
            </button>
            <button class="eco-btn" onclick="logEcoAction('tiffin')">
                <i class="fas fa-utensils"></i> Brought Own Tiffin
            </button>
            <button class="eco-btn" onclick="logEcoAction('zeroWaste')">
                <i class="fas fa-recycle"></i> Zero Waste Meal
            </button>
        </div>
        <div id="eco-stats" class="eco-stats"></div>
    `;

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsSection.parentNode.insertBefore(ecoSection, statsSection);
    }

    updateEcoStats();
}

function logEcoAction(action) {
    const ecoStats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
    const rewards = appData.ecoFeatures.rewardPoints;
    let points = 0;

    switch(action) {
        case 'bottle':
            ecoStats.bottleCount = (ecoStats.bottleCount || 0) + 1;
            points = rewards.ownBottle;
            showToast(`🌱 +${points} eco points for bringing your own bottle!`);
            break;
        case 'tiffin':
            ecoStats.tiffinCount = (ecoStats.tiffinCount || 0) + 1;
            points = rewards.ownTiffin;
            showToast(`🌱 +${points} eco points for bringing your own tiffin!`);
            break;
        case 'zeroWaste':
            ecoStats.zeroWasteCount = (ecoStats.zeroWasteCount || 0) + 1;
            points = rewards.zeroWaste;
            showToast(`🌱 +${points} eco points for zero waste meal!`);
            break;
    }

    ecoStats.totalEcoPoints = (ecoStats.totalEcoPoints || 0) + points;
    localStorage.setItem('ecoStats', JSON.stringify(ecoStats));

    appState.userHealthScore += points;
    updateStats();
    updateEcoStats();
}

function updateEcoStats() {
    const ecoStats = JSON.parse(localStorage.getItem('ecoStats') || '{}');
    const statsDiv = document.getElementById('eco-stats');

    if (statsDiv) {
        statsDiv.innerHTML = `
            <div class="eco-stat-item">
                <span class="colorful-text">🚰 Own Bottles:</span>
                <span class="rainbow-text">${ecoStats.bottleCount || 0}</span>
            </div>
            <div class="eco-stat-item">
                <span class="colorful-text">🍱 Own Tiffins:</span>
                <span class="rainbow-text">${ecoStats.tiffinCount || 0}</span>
            </div>
            <div class="eco-stat-item">
                <span class="colorful-text">♻️ Zero Waste:</span>
                <span class="rainbow-text">${ecoStats.zeroWasteCount || 0}</span>
            </div>
            <div class="eco-stat-item total">
                <span class="gradient-text">🌍 Total Eco Points:</span>
                <span class="rainbow-text">${ecoStats.totalEcoPoints || 0}</span>
            </div>
        `;
    }
}

// --- Mystery Meal Box Feature ---
function openMysteryMealBox() {
    const modal = document.createElement('div');
    modal.className = 'modal mystery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-gift"></i> <span class="rainbow-text">Mystery Meal Box</span></h3>
                <span class="close-modal" onclick="this.closest('.modal').remove()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="mystery-container">
                    <div class="mystery-box-animation">
                        <div class="gift-box">🎁</div>
                        <div class="sparkles">✨✨✨</div>
                    </div>
                    <h4 class="gradient-text">🎲 Surprise Meal Experience!</h4>
                    <p class="colorful-text">Get a random healthy meal at 30% discount!</p>
                    <div class="mystery-price">
                        <span class="mystery-cost rainbow-text">Only ₹35</span>
                        <span class="regular-cost">Regular: ₹50-70</span>
                    </div>
                    <button class="mystery-btn rainbow-btn" onclick="openMysteryBox()">
                        <i class="fas fa-dice"></i> Open Mystery Box
                    </button>
                </div>
                <div id="mystery-result" class="mystery-result" style="display: none;"></div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function openMysteryBox() {
    const mysteryMeals = [
        {name: "🥗 Surprise Salad Bowl", price: 35, original: 50},
        {name: "🍲 Chef's Special Soup", price: 35, original: 60},
        {name: "🥪 Mystery Healthy Wrap", price: 35, original: 55},
        {name: "🥤 Secret Smoothie Blend", price: 35, original: 45},
        {name: "🍛 Hidden Treasure Bowl", price: 35, original: 70}
    ];

    const randomMeal = mysteryMeals[Math.floor(Math.random() * mysteryMeals.length)];

    const resultDiv = document.getElementById('mystery-result');
    resultDiv.innerHTML = `
        <div class="mystery-reveal">
            <h4 class="gradient-text">🎉 Your Mystery Meal:</h4>
            <div class="revealed-meal">
                <h5 class="colorful-text">${randomMeal.name}</h5>
                <p class="rainbow-text">You saved ₹${randomMeal.original - randomMeal.price}!</p>
                <button class="add-mystery-btn gradient-btn" onclick="addToCart('${randomMeal.name}', ${randomMeal.price}); this.closest('.modal').remove();">
                    <i class="fas fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';

    showToast(`🎁 Mystery revealed: ${randomMeal.name}!`);
}

// --- Birthday Special Feature ---
function checkBirthdaySpecial() {
    const today = new Date();
    const userBirthday = localStorage.getItem('userBirthday');

    if (userBirthday) {
        const birthday = new Date(userBirthday);
        if (today.getMonth() === birthday.getMonth() && today.getDate() === birthday.getDate()) {
            showBirthdaySpecial();
        }
    }
}

function showBirthdaySpecial() {
    const birthdayModal = document.createElement('div');
    birthdayModal.className = 'modal birthday-modal';
    birthdayModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-birthday-cake"></i> <span class="rainbow-text">Happy Birthday! 🎂</span></h3>
            </div>
            <div class="modal-body">
                <div class="birthday-celebration">
                    <div class="birthday-animation">🎉🎂🎁🎈</div>
                    <h4 class="gradient-text">Special Birthday Treat!</h4>
                    <p class="colorful-text">Enjoy a free cupcake from the canteen!</p>
                    <div class="birthday-coupon">
                        <div class="coupon-code rainbow-text">BIRTHDAY2024</div>
                        <p class="coupon-text">Show this to the canteen staff</p>
                    </div>
                    <button class="birthday-btn rainbow-btn" onclick="this.closest('.modal').remove();">
                        <i class="fas fa-gift"></i> Thank You!
                    </button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(birthdayModal);
    birthdayModal.style.display = 'block';

    appState.userHealthScore += 50;
    updateStats();
}

// --- Mobile Menu Functions ---
function toggleMobileMenu() {
    const overlay = document.getElementById('mobileMenuOverlay');
    if (overlay) {
        if (overlay.style.display === 'none' || overlay.style.display === '') {
            overlay.style.display = 'flex';
        } else {
            overlay.style.display = 'none';
        }
    }
}

// Add the missing function if not already declared
window.toggleMobileMenu = toggleMobileMenu;

// --- Initialize Enhanced App ---
function initializeFuturisticFeatures() {
    // Placeholder for initializing the futuristic features mentioned in the prompt
    console.log("Initializing Futuristic Features...");

    // Example: Initialize Face-ID Fast Order (conceptual)
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //     console.log("Face-ID capability detected. Ready for integration.");
    // }

    // Example: Initialize Gaming-Style UI (conceptual)
    // Apply gaming-themed styles or animations
    console.log("Applying gaming-style UI elements...");
    document.body.classList.add('gaming-ui'); // Add a class for CSS to target
}

// Initialize DOM elements and gaming features
document.addEventListener('DOMContentLoaded', function() {
    menuDisplayDiv = document.getElementById('menu-display');
    itemInputField = document.getElementById('itemInput');
    checkButton = document.getElementById('checkButton');
    messageDisplay = document.getElementById('message-display');

    // Initialize features
    initializeDarkMode();
    initializeFuturisticFeatures();
    loadHealthProfile();
    setupPreOrderListeners(); // Assuming this is needed for pre-order functionality
    setupStarRating();
    displayRealFeedback();
    createFilterButtons();
    drawMenu();
    updateStats();

    // Check for login
    loadUserProfile();

    // Initialize offline support
    initializeOfflineSupport();

    // Initialize PWA
    initializePWA();

    // Start user activity tracking
    const userActivity = trackUserActivity();

    // Initialize real feedback display
    displayRealFeedback();

    // Add global functions to window
    window.switchLoginTab = switchLoginTab;
    window.loadMoreReviews = loadMoreReviews;

    if (checkButton && itemInputField) {
        checkButton.addEventListener('click', handleCheckItem);
        itemInputField.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                handleCheckItem();
            }
        });
    }


    window.addEventListener('click', function(event) {
        const modals = ['orderModal', 'loginModal', 'bmiModal', 'createAccountModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    createFilterButtons();
    drawMenu();
    updateStats();

    displayMessage('🎓 Welcome to School Hackers P.B.L Smart Canteen! 🌈 Explore our colorful, healthy menu with 80+ items and make nutritious choices. Contact support: s.18.266@slps.one', "prompt");

    // Load offline data if available
    const offlineData = localStorage.getItem('offlineData');
    if (offlineData) {
        const data = JSON.parse(offlineData);
        appState.favorites = data.favorites || [];
        appState.userHealthScore = data.healthScore || 0;
        appState.itemsChecked = data.itemsChecked || 0;
        appState.healthyChoices = data.healthyChoices || 0;
        updateStats();
    }

    if (appState.userHealthScore >= 100) {
        showToast("🎉 Congratulations! You've reached a perfect 100 health score!");
    }

    setTimeout(() => {
        if (appState.itemsChecked === 0) {
            showNutritionTips();
        }
    }, 8000);

    console.log("EmailJS ready for order notifications");
});

// Gaming Hub Initialization
function initializeGamingHub() {
    console.log("Initializing Gaming Hub Features...");

    // Apply gaming-specific UI elements and styles
    document.body.classList.add('gaming-ui');
    document.body.classList.add('cyberpunk-theme'); // Adding a cyberpunk theme

    // Add gaming-themed FAB buttons
    addGamingFABButtons();

    // Implement Snack Battle Royale Mode (conceptual)
    console.log("Snack Battle Royale: Feature not yet implemented.");

    // Implement Gun-Snack Ordering UI (conceptual)
    console.log("Gun-Snack Ordering UI: Feature not yet implemented.");

    // Implement Rap Mode (conceptual)
    console.log("Rap Mode: Feature not yet implemented.");

    // Implement Badmashi Avatar System (conceptual)
    console.log("Badmashi Avatar System: Feature not yet implemented.");

    // Implement Vibration + Explosion Feedback (conceptual)
    console.log("Vibration + Explosion Feedback: Feature not yet implemented.");

    // Implement Cheat Code Snacks (conceptual)
    console.log("Cheat Code Snacks: Feature not yet implemented.");

    // Implement Squad Combo Packs (conceptual)
    console.log("Squad Combo Packs: Feature not yet implemented.");

    // Implement Live DJ Mode (conceptual)
    console.log("Live DJ Mode: Feature not yet implemented.");

    // Implement Energy & Power Bar (conceptual)
    console.log("Energy & Power Bar: Feature not yet implemented.");

    // Implement Canteen Spy Cam (conceptual)
    console.log("Canteen Spy Cam: Feature not yet implemented.");

    // Implement Explosion Order Animation (conceptual)
    console.log("Explosion Order Animation: Feature not yet implemented.");

    // Implement AI Roasting Bot (Boys Mode) (conceptual)
    console.log("AI Roasting Bot: Feature not yet implemented.");

    // Implement Drone Delivery (Future) (conceptual)
    console.log("Drone Delivery: Feature not yet implemented.");

    // Implement Clan Wars (conceptual)
    console.log("Clan Wars: Feature not yet implemented.");

    // Implement Snack Stock Market (conceptual)
    console.log("Snack Stock Market: Feature not yet implemented.");
}


// --- Killer App Features ---

// 1. Classroom / Desk Delivery Mode
function openClassDelivery() {
    showToast("Classroom Delivery: Feature not yet implemented.");
    console.log("Opening Classroom Delivery Mode...");
}

// 2. Pre-Order & Meal Subscriptions
function openMealSubscriptions() {
    showToast("Meal Subscriptions: Feature not yet implemented.");
    console.log("Opening Meal Subscriptions...");
}

// 3. Squad / Group Orders
function openSquadOrders() {
    showToast("Squad Orders: Feature not yet implemented.");
    console.log("Opening Squad Orders...");
}

// 4. Smart Campus Wallet
const campusWallet = {
    balance: 0,
    transactions: []
};

function openCampusWallet() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'campusWalletModal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3><i class="fas fa-wallet"></i> <span class="rainbow-text">Smart Campus Wallet</span></h3>
                <span class="close-modal" onclick="closeCampusWallet()">&times;</span>
            </div>
            <div class="modal-body">
                <div class="wallet-container">
                    <div class="wallet-balance">
                        <h4 class="gradient-text">Your Balance</h4>
                        <div class="balance-display rainbow-text">₹ ${campusWallet.balance.toFixed(2)}</div>
                    </div>
                    <div class="wallet-actions">
                        <button class="wallet-btn add-funds-btn" onclick="addFundsToWallet()">
                            <i class="fas fa-plus-circle"></i> Add Funds
                        </button>
                        <button class="wallet-btn withdraw-btn" onclick="withdrawFundsFromWallet()" disabled>
                            <i class="fas fa-minus-circle"></i> Withdraw (Future)
                        </button>
                    </div>
                    <div class="wallet-transactions">
                        <h4 class="gradient-text">Recent Transactions</h4>
                        <div id="wallet-transaction-list">
                            ${renderWalletTransactions()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';
    window.closeCampusWallet = () => modal.remove();
}

function closeCampusWallet() {
    const modal = document.getElementById('campusWalletModal');
    if (modal) modal.remove();
}

function addFundsToWallet() {
    const amount = parseFloat(prompt("Enter amount to add:"));
    if (amount && amount > 0) {
        campusWallet.balance += amount;
        campusWallet.transactions.push({ type: 'credit', amount: amount, timestamp: new Date().toISOString() });
        showToast(`₹${amount.toFixed(2)} added to wallet!`);
        updateCampusWalletDisplay();
    } else {
        showToast("Invalid amount entered.");
    }
}

function withdrawFundsFromWallet() {
    showToast("Withdrawal feature is not yet available.");
}

function renderWalletTransactions() {
    if (campusWallet.transactions.length === 0) {
        return '<p class="colorful-text">No transactions yet.</p>';
    }
    return campusWallet.transactions.slice(-5).map(tx => `
        <div class="transaction-item">
            <span class="transaction-type ${tx.type === 'credit' ? 'credit' : 'debit'}">${tx.type === 'credit' ? '+' : '-'} ₹${tx.amount.toFixed(2)}</span>
            <span class="transaction-time gradient-text">${new Date(tx.timestamp).toLocaleString()}</span>
        </div>
    `).join('');
}

function updateCampusWalletDisplay() {
    const balanceDisplay = document.querySelector('#campusWalletModal .balance-display');
    const transactionList = document.getElementById('wallet-transaction-list');
    if (balanceDisplay) balanceDisplay.textContent = `₹ ${campusWallet.balance.toFixed(2)}`;
    if (transactionList) transactionList.innerHTML = renderWalletTransactions();
}

// 5. Mystery Meal Box
// Already implemented as openMysteryMealBox

// 6. AR Food Preview
// Already implemented as openARPreview

// 7. Nutrition & Allergy Profile
function openNutritionProfile() {
    showToast("Nutrition & Allergy Profile: Navigate to Health Dashboard.");
    openHealthDashboard();
}

// 8. Instant Re-Fill / Smart Locker Pickup
function openSmartLockerPickup() {
    showToast("Smart Locker Pickup: Feature not yet implemented.");
    console.log("Opening Smart Locker Pickup...");
}

// 9. Gamification & Rewards
function openGamificationRewards() {
    showToast("Gamification & Rewards: Check your badges and points in the Health Dashboard.");
    // Could potentially open a dedicated rewards modal/section
    openHealthDashboard(); // Redirecting to dashboard for now
}

// 10. Face-ID or Tap Login
function openFaceIdLogin() {
    showToast("Face-ID Login: Feature not yet implemented.");
    console.log("Opening Face-ID Login...");
}

// --- Killer App Feature Integration into FAB ---
function addKillerFeaturesToFAB() {
    const fabOptions = document.getElementById('fab-options');
    if (fabOptions) {
        const features = [
            { id: 'class-delivery', icon: 'fas fa-school', title: 'Class Delivery', onclick: 'openClassDelivery()' },
            { id: 'meal-subscriptions', icon: 'fas fa-calendar-alt', title: 'Meal Subscriptions', onclick: 'openMealSubscriptions()' },
            { id: 'squad-orders', icon: 'fas fa-users', title: 'Squad Orders', onclick: 'openSquadOrders()' },
            { id: 'campus-wallet', icon: 'fas fa-wallet', title: 'Campus Wallet', onclick: 'openCampusWallet()' },
            { id: 'mystery-box', icon: 'fas fa-gift', title: 'Mystery Box', onclick: 'openMysteryMealBox()' },
            { id: 'nutrition-profile', icon: 'fas fa-leaf', title: 'Nutrition Profile', onclick: 'openNutritionProfile()' },
            { id: 'smart-locker', icon: 'fas fa-box', title: 'Smart Locker', onclick: 'openSmartLockerPickup()' },
            { id: 'gamification', icon: 'fas fa-trophy', title: 'Gamification', onclick: 'openGamificationRewards()' },
            { id: 'face-id-login', icon: 'fas fa-camera', title: 'Face-ID Login', onclick: 'openFaceIdLogin()' }
        ];

        features.forEach(feature => {
            const btn = document.createElement('button');
            btn.className = `fab-option ${feature.id}-btn`;
            btn.onclick = () => eval(feature.onclick); // Use eval to call the function string
            btn.title = feature.title;
            btn.innerHTML = `<i class="${feature.icon}"></i>`;
            fabOptions.appendChild(btn);
        });
        console.log("Killer app features added to FAB menu.");
    } else {
        console.warn("FAB options container not found. Killer app features not added to FAB.");
    }
}

// --- Initialize Enhanced App ---
// This function is called from the DOMContentLoaded listener, ensuring elements are ready.
// Existing initializations are consolidated and kept in their original place within DOMContentLoaded.

// Call the function to make them globally accessible immediately
makeGloballyAccessible();

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupStarRating();
    initializeGamingHub(); // Initialize gaming hub features

    // Add killer app features to FAB menu after other initializations if needed
    addKillerFeaturesToFAB();

    // Initialize wallet with demo balance
    campusWallet.balance = 250;
    console.log("Killer App Features integrated. Campus Wallet initialized.");
});
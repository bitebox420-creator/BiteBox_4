
import React, { useState, useEffect } from 'react';

// Enhanced Cart Component with React
export function CartComponent() {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');
        setCart(savedCart);
    }, []);

    const updateQuantity = (index, change) => {
        const newCart = [...cart];
        newCart[index].quantity += change;
        
        if (newCart[index].quantity <= 0) {
            newCart.splice(index, 1);
        }
        
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return (
        <div className={`cart-sidebar-react ${isOpen ? 'open' : ''}`}>
            <div className="cart-header">
                <h3><i className="fas fa-shopping-cart"></i> Your Cart</h3>
                <button onClick={() => setIsOpen(false)} className="close-btn">&times;</button>
            </div>
            <div className="cart-items">
                {cart.length === 0 ? (
                    <p className="empty-cart">Your cart is empty</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <div className="cart-item-info">
                                <h4>{item.name}</h4>
                                <p>₹{item.price} x {item.quantity}</p>
                            </div>
                            <div className="cart-item-actions">
                                <button onClick={() => updateQuantity(index, -1)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(index, 1)}>+</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="cart-footer">
                <div className="cart-total">
                    <span>Total:</span>
                    <span>₹{total}</span>
                </div>
                <button className="btn-primary btn-full">Proceed to Checkout</button>
            </div>
        </div>
    );
}

// Live Order Tracking Component
export function LiveOrderTracking({ orderId }) {
    const [orderStatus, setOrderStatus] = useState('pending');
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const statuses = ['pending', 'preparing', 'ready', 'completed'];
        let currentIndex = 0;

        const interval = setInterval(() => {
            if (currentIndex < statuses.length) {
                setOrderStatus(statuses[currentIndex]);
                setProgress((currentIndex + 1) * 25);
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="order-tracking">
            <h3>Order #{orderId}</h3>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="status-text">{orderStatus}</p>
        </div>
    );
}

// AI Nutrition Assistant Component
export function NutritionAssistant() {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState('');

    const handleAsk = async () => {
        // Simulate AI response
        const responses = {
            'calories': 'Most of our healthy meals range from 200-400 calories.',
            'protein': 'Our high-protein options include Greek Yogurt, Grilled Chicken Wrap, and Paneer Tikka.',
            'healthy': 'Items with a health score of 8+ are our healthiest options!',
            'vegetarian': 'We have 12 vegetarian options including salads, quinoa bowls, and fruit options.'
        };

        const matchedKey = Object.keys(responses).find(key => query.toLowerCase().includes(key));
        setResponse(matchedKey ? responses[matchedKey] : 'I can help you with calories, protein, healthy options, and vegetarian meals!');
    };

    return (
        <div className="nutrition-assistant">
            <h3>🤖 Nutrition Assistant</h3>
            <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about nutrition..."
            />
            <button onClick={handleAsk}>Ask</button>
            {response && <p className="ai-response">{response}</p>}
        </div>
    );
}

// Quick Reorder Component
export function QuickReorder() {
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        fetch('/api/orders')
            .then(res => res.json())
            .then(data => setRecentOrders(data.slice(0, 3)))
            .catch(err => console.error('Error loading orders:', err));
    }, []);

    const reorder = (order) => {
        // Add order items back to cart
        console.log('Reordering:', order);
    };

    return (
        <div className="quick-reorder">
            <h3>Quick Reorder</h3>
            {recentOrders.map(order => (
                <div key={order.id} className="reorder-item">
                    <p>Order #{order.id} - ₹{order.total_amount}</p>
                    <button onClick={() => reorder(order)}>Reorder</button>
                </div>
            ))}
        </div>
    );
}

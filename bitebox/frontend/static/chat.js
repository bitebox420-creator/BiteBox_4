let chatHistory = [];

function sendMessage(message = null) {
    const input = document.getElementById('messageInput');
    const msg = message || input.value.trim();
    
    if (!msg) return;
    
    // Hide suggestions on first message
    const suggestionsDiv = document.getElementById('chatSuggestions');
    if (suggestionsDiv) suggestionsDiv.style.display = 'none';
    
    // Add user message to chat
    addMessageToChat(msg, 'user');
    
    // Clear input
    input.value = '';
    input.style.height = 'auto';
    
    // Add to history
    chatHistory.push({ role: 'user', content: msg });
    
    // Show loading
    const loadingId = 'loading-' + Date.now();
    addLoadingMessage(loadingId);
    
    // Send to API
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg })
    })
    .then(r => r.json())
    .then(data => {
        removeLoadingMessage(loadingId);
        if (data.reply) {
            addMessageToChat(data.reply, 'assistant');
            chatHistory.push({ role: 'assistant', content: data.reply });
        } else {
            addMessageToChat('Sorry, I encountered an error. Please try again.', 'assistant');
        }
    })
    .catch(err => {
        removeLoadingMessage(loadingId);
        console.error('Chat error:', err);
        addMessageToChat('Connection error. Please try again.', 'assistant');
    });
}

function addMessageToChat(message, role) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageGroup = document.createElement('div');
    messageGroup.className = 'message-group';
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageGroup.innerHTML = `
        <div class="message-avatar ${role}">
            <i class="fas fa-${role === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble ${role}">
                ${escapeHtml(message)}
            </div>
            <span class="message-time">${time}</span>
        </div>
    `;
    
    messagesDiv.appendChild(messageGroup);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function addLoadingMessage(id) {
    const messagesDiv = document.getElementById('chatMessages');
    const loadingDiv = document.createElement('div');
    loadingDiv.id = id;
    loadingDiv.className = 'message-group loading-message';
    loadingDiv.innerHTML = `
        <div class="message-avatar assistant">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="message-bubble assistant">
                <div class="typing-indicator">
                    <span></span><span></span><span></span>
                </div>
            </div>
        </div>
    `;
    messagesDiv.appendChild(loadingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function removeLoadingMessage(id) {
    const msg = document.getElementById(id);
    if (msg) msg.remove();
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Auto-resize textarea
document.getElementById('messageInput')?.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 150) + 'px';
});

// Send on Enter, new line on Shift+Enter
document.getElementById('messageInput')?.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// Clear chat button
document.querySelector('.chat-icon-btn')?.addEventListener('click', function() {
    if (confirm('Clear all messages?')) {
        document.getElementById('chatMessages').innerHTML = `
            <div class="message-group welcome-message">
                <div class="message-avatar assistant">
                    <i class="fas fa-robot"></i>
                </div>
                <div class="message-content">
                    <div class="message-bubble assistant">
                        <h3>Welcome back! 👋</h3>
                        <p>Chat cleared. How can I help you?</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('chatSuggestions').style.display = 'grid';
        chatHistory = [];
    }
});

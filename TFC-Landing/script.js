let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({name, price});
    total += price;
    updateCartUI();
}

function removeFromCart(index) {
    total -= cart[index].price;
    cart.splice(index, 1);
    updateCartUI();
}

function openChat() {
    alert('Chat en vivo próximamente disponible.');
}

let chatMessages = [];

function openChat() {
    document.getElementById('chat-modal').style.display = 'block';
    if (chatMessages.length === 0) {
        addBotMessage('¡Hola! Soy el asistente de CyberSquid Kicks. ¿En qué puedo ayudarte?');
    }
}

function closeChat() {
    document.getElementById('chat-modal').style.display = 'none';
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addUserMessage(message);
        input.value = '';
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                '¡Genial elección! ¿Quieres saber más sobre ese modelo?',
                'Tenemos envío gratuito en pedidos superiores a 100€.',
                '¿Necesitas ayuda con tallas o colores?',
                '¡Gracias por contactar! ¿Qué más te gustaría saber?',
                'Nuestros productos son 100% originales y con garantía.'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addBotMessage(randomResponse);
        }, 1000);
    }
}

function addUserMessage(text) {
    chatMessages.push({type: 'user', text});
    updateChatUI();
}

function addBotMessage(text) {
    chatMessages.push({type: 'bot', text});
    updateChatUI();
}

function updateChatUI() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = chatMessages.map(msg => `<div class="message ${msg.type}">${msg.text}</div>`).join('');
    container.scrollTop = container.scrollHeight;
}

// Allow sending with Enter
document.addEventListener('DOMContentLoaded', function() {
    const input = document.getElementById('chat-input');
    if (input) {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

function updateCartUI() {
    const countLabel = document.getElementById('cart-count');
    const listContainer = document.getElementById('cart-items-list');
    const totalLabel = document.getElementById('total-val');

    countLabel.innerText = cart.length;
    totalLabel.innerText = total;

    if (cart.length === 0) {
        listContainer.innerHTML = '<p style="text-align:center; color:#64748b;">El carrito está vacío por ahora...</p>';
    } else {
        listContainer.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <span>${item.name}</span>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <span style="color:#38bdf8; font-weight:bold">${item.price}€</span>
                    <button onclick="removeFromCart(${index})" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Eliminar</button>
                </div>
            </div>
        `).join('');
    }
}
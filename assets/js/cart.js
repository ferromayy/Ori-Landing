// Sistema de Carrito
class Cart {
  constructor() {
    this.items = this.loadCart();
    this.updateCartUI();
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateCartUI();
  }

  addItem(product) {
    const item = {
      id: `${product.productId}-${product.size}-${product.grind}`,
      productId: product.productId,
      name: product.name,
      size: product.size,
      grind: product.grind,
      quantity: product.quantity,
      price: product.price,
      total: product.price * product.quantity
    };
    
    const existingIndex = this.items.findIndex(i => i.id === item.id);
    if (existingIndex >= 0) {
      this.items[existingIndex].quantity += item.quantity;
      this.items[existingIndex].total = this.items[existingIndex].price * this.items[existingIndex].quantity;
    } else {
      this.items.push(item);
    }
    
    this.saveCart();
  }

  removeItem(itemId) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.saveCart();
  }

  updateQuantity(itemId, quantity) {
    const item = this.items.find(i => i.id === itemId);
    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.saveCart();
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  updateCartUI() {
    const cartCount = document.querySelector('.js-cart-count');
    const cartItems = document.querySelector('.js-cart-items');
    const cartTotal = document.querySelector('.js-cart-total');
    
    if (cartCount) {
      const count = this.getItemCount();
      if (count > 0) {
        cartCount.textContent = count;
        cartCount.style.display = 'flex';
      } else {
        cartCount.style.display = 'none';
      }
    }
    
    if (cartItems) {
      if (this.items.length === 0) {
        cartItems.innerHTML = '<p class="text-gray-600 text-center py-8">Tu carrito está vacío</p>';
      } else {
        cartItems.innerHTML = this.items.map(item => `
          <div class="border-b border-gray-200 pb-4 mb-4">
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <h3 class="font-medium mb-1 text-gray-900">${item.name}</h3>
                <p class="text-xs text-gray-600">${item.size === 250 ? '250gr' : '1kg'} - ${item.grind || 'Sin molienda'}</p>
              </div>
              <button class="text-gray-600 hover:text-gray-900 js-remove-item" data-item-id="${item.id}" type="button">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <button class="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-700 js-decrease-qty" data-item-id="${item.id}" type="button">-</button>
                <span class="text-sm text-gray-900">${item.quantity}</span>
                <button class="w-6 h-6 flex items-center justify-center border border-gray-300 hover:bg-gray-100 text-gray-700 js-increase-qty" data-item-id="${item.id}" type="button">+</button>
              </div>
              <span class="font-medium text-gray-900">$${item.total.toLocaleString('es-AR')}</span>
            </div>
          </div>
        `).join('');
        
        cartItems.querySelectorAll('.js-remove-item').forEach(btn => {
          btn.addEventListener('click', (e) => {
            cart.removeItem(e.target.closest('[data-item-id]').dataset.itemId);
          });
        });
        
        cartItems.querySelectorAll('.js-decrease-qty').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('[data-item-id]').dataset.itemId;
            const item = cart.items.find(i => i.id === itemId);
            if (item && item.quantity > 1) {
              cart.updateQuantity(itemId, item.quantity - 1);
            }
          });
        });
        
        cartItems.querySelectorAll('.js-increase-qty').forEach(btn => {
          btn.addEventListener('click', (e) => {
            const itemId = e.target.closest('[data-item-id]').dataset.itemId;
            const item = cart.items.find(i => i.id === itemId);
            if (item) {
              cart.updateQuantity(itemId, item.quantity + 1);
            }
          });
        });
      }
    }
    
    if (cartTotal) {
      cartTotal.textContent = `$${this.getTotal().toLocaleString('es-AR')}`;
    }
  }
}

// Inicializar carrito global
const cart = new Cart();

// Abrir/cerrar modal del carrito
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.js-cart-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.js-cart-modal')?.classList.remove('hidden');
      cart.updateCartUI();
    });
  });

  document.querySelectorAll('.js-cart-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.js-cart-modal')?.classList.add('hidden');
    });
  });

  // Finalizar compra por WhatsApp
  document.querySelector('.js-checkout-whatsapp')?.addEventListener('click', () => {
    if (cart.items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    // Generar mensaje del ticket
    let message = '🛒 *PEDIDO DE CAFÉ*\n\n';
    message += 'Hola! Quiero realizar el siguiente pedido:\n\n';
    
    cart.items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   - Tamaño: ${item.size === 250 ? '250gr' : '1kg'}\n`;
      message += `   - Molienda: ${item.grind || 'Sin molienda'}\n`;
      message += `   - Cantidad: ${item.quantity}\n`;
      message += `   - Precio: $${item.total.toLocaleString('es-AR')}\n\n`;
    });
    
    message += `*TOTAL: $${cart.getTotal().toLocaleString('es-AR')}*\n\n`;
    message += 'Gracias!';
    
    // Codificar mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = '5493518014893';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    // Abrir WhatsApp
    window.open(whatsappUrl, '_blank');
  });
});


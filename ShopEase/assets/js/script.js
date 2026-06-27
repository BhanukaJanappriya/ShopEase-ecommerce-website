'use strict';

// modal variables
const modal = document.querySelector('[data-modal]');
const modalCloseBtn = document.querySelector('[data-modal-close]');
const modalCloseOverlay = document.querySelector('[data-modal-overlay]');

// modal function
const modalCloseFunc = function () {
  if (modal) modal.classList.add('closed');
}

// modal eventListener
if (modalCloseOverlay && modalCloseFunc) {
  modalCloseOverlay.addEventListener('click', modalCloseFunc);
}
if (modalCloseBtn && modalCloseFunc) {
  modalCloseBtn.addEventListener('click', modalCloseFunc);
}





// notification toast variables
const notificationToast = document.querySelector('[data-toast]');
const toastCloseBtn = document.querySelector('[data-toast-close]');

// notification toast eventListener
if (toastCloseBtn && notificationToast) {
  toastCloseBtn.addEventListener('click', function () {
    notificationToast.classList.add('closed');
  });
}





// mobile menu variables
const mobileMenuOpenBtn = document.querySelectorAll('[data-mobile-menu-open-btn]');
const mobileMenu = document.querySelectorAll('[data-mobile-menu]');
const mobileMenuCloseBtn = document.querySelectorAll('[data-mobile-menu-close-btn]');
const overlay = document.querySelector('[data-overlay]');

for (let i = 0; i < mobileMenuOpenBtn.length; i++) {

  // mobile menu function
  const mobileMenuCloseFunc = function () {
    if (mobileMenu[i]) mobileMenu[i].classList.remove('active');
    if (overlay) overlay.classList.remove('active');
  }

  mobileMenuOpenBtn[i].addEventListener('click', function () {
    if (mobileMenu[i]) mobileMenu[i].classList.add('active');
    if (overlay) overlay.classList.add('active');
  });

  if (mobileMenuCloseBtn[i]) {
    mobileMenuCloseBtn[i].addEventListener('click', mobileMenuCloseFunc);
  }
  if (overlay) {
    overlay.addEventListener('click', mobileMenuCloseFunc);
  }

}





// accordion variables
const accordionBtn = document.querySelectorAll('[data-accordion-btn]');
const accordion = document.querySelectorAll('[data-accordion]');

for (let i = 0; i < accordionBtn.length; i++) {

  accordionBtn[i].addEventListener('click', function () {

    const clickedBtn = this.nextElementSibling.classList.contains('active');

    for (let i = 0; i < accordion.length; i++) {

      if (clickedBtn) break;

      if (accordion[i].classList.contains('active')) {

        accordion[i].classList.remove('active');
        accordionBtn[i].classList.remove('active');

      }

    }

    this.nextElementSibling.classList.toggle('active');
    this.classList.toggle('active');

  });

}

// --- Animation on Scroll ---
const revealElements = document.querySelectorAll('.banner, .category, .product-main, .showcase, .blog-card, .blog-box, .blog-post-card, .sidebar, .product-minimal, .testimonial-card, .cta-container, .service-container');

const revealOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("aos-active");
      observer.unobserve(entry.target);
    }
  });
}, revealOptions);

revealElements.forEach(el => {
  el.classList.add("aos-init");
  revealOnScroll.observe(el);
});

// --- Countdown Timer ---
const countdownElements = document.querySelectorAll('.countdown');

countdownElements.forEach(countdown => {
  const displayNumbers = countdown.querySelectorAll('.display-number');
  
  if (displayNumbers.length === 4) {
    let days = parseInt(displayNumbers[0].textContent, 10);
    let hours = parseInt(displayNumbers[1].textContent, 10);
    let minutes = parseInt(displayNumbers[2].textContent, 10);
    let seconds = parseInt(displayNumbers[3].textContent, 10);

    let totalSeconds = days * 86400 + hours * 3600 + minutes * 60 + seconds;

    const timer = setInterval(() => {
      if (totalSeconds <= 0) {
        clearInterval(timer);
        return;
      }
      totalSeconds--;

      const d = Math.floor(totalSeconds / 86400);
      const h = Math.floor((totalSeconds % 86400) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      displayNumbers[0].textContent = d;
      displayNumbers[1].textContent = h < 10 ? '0' + h : h;
      displayNumbers[2].textContent = m < 10 ? '0' + m : m;
      displayNumbers[3].textContent = s < 10 ? '0' + s : s;
    }, 1000);
  }
});

// ==========================================
// DB CART CUSTOM MODAL & DATABASE LOGS
// ==========================================
// Add database support
(function initCartDatabase() {
  // Inject HTML Elements
  const modalHTML = `
    <div class="cart-input-modal" id="cartInputModal">
      <div class="cart-input-modal-overlay" id="cartModalOverlay"></div>
      <div class="cart-input-modal-content">
        <div class="cart-modal-header">
          <h3>Add to Cart & Configure Order</h3>
          <button class="cart-modal-close-btn" id="cartModalCloseBtn">&times;</button>
        </div>
        
        <div class="cart-product-preview">
          <img src="" alt="Product Image" id="cartPreviewImg">
          <div class="cart-product-info">
            <span class="cart-product-name" id="cartPreviewName">Product Name</span>
            <span class="cart-product-price" id="cartPreviewPrice">LKR 0.00</span>
          </div>
        </div>

        <form id="cartInputForm">
          <!-- Configuration Options -->
          <div class="cart-form-row">
            <div class="cart-form-group">
              <label>Select Size</label>
              <div class="options-selector-list" id="sizeSelectorList">
                <span class="option-badge selected" data-value="M">M</span>
                <span class="option-badge" data-value="L">L</span>
                <span class="option-badge" data-value="XL">XL</span>
                <span class="option-badge" data-value="XXL">XXL</span>
              </div>
            </div>
            
            <div class="cart-form-group">
              <label>Select Color</label>
              <div class="options-selector-list" id="colorSelectorList">
                <span class="color-dot selected" data-value="Black" style="background-color: #111;"></span>
                <span class="color-dot" data-value="Navy Blue" style="background-color: #1b365d;"></span>
                <span class="color-dot" data-value="Salmon Pink" style="background-color: #ff7f8f;"></span>
                <span class="color-dot" data-value="Off White" style="background-color: #faf9f6;"></span>
              </div>
            </div>
          </div>

          <div class="cart-form-group">
            <label>Quantity</label>
            <div class="qty-selector">
              <button type="button" class="qty-btn" id="qtyMinusBtn">-</button>
              <span class="qty-val" id="qtyVal">1</span>
              <button type="button" class="qty-btn" id="qtyPlusBtn">+</button>
            </div>
          </div>

          <!-- Customer Data Input Section -->
          <div class="cart-form-group">
            <label>Customer Name</label>
            <input type="text" id="custName" class="cart-input-field" placeholder="e.g. John Doe" required>
          </div>

          <div class="cart-form-row">
            <div class="cart-form-group">
              <label>Email Address</label>
              <input type="email" id="custEmail" class="cart-input-field" placeholder="e.g. john@example.com" required>
            </div>
            <div class="cart-form-group">
              <label>Phone Number</label>
              <input type="tel" id="custPhone" class="cart-input-field" placeholder="e.g. +94 77 123 4567" required>
            </div>
          </div>

          <div class="cart-form-group">
            <label>Shipping Address</label>
            <input type="text" id="custAddress" class="cart-input-field" placeholder="e.g. 123, Galle Road, Colombo 03" required>
          </div>

          <div class="cart-form-row">
            <div class="cart-form-group">
              <label>Delivery Method</label>
              <select id="custDelivery" class="cart-input-field">
                <option value="Standard (LKR 350)">Standard (3-5 Days)</option>
                <option value="Express (LKR 600)">Express (1-2 Days)</option>
                <option value="Same Day (LKR 1000)">Same Day Delivery</option>
              </select>
            </div>
            <div class="cart-form-group">
              <label>Payment Method</label>
              <select id="custPayment" class="cart-input-field">
                <option value="Cash On Delivery">Cash on Delivery</option>
                <option value="Credit / Debit Card">Credit / Debit Card</option>
                <option value="Koko Installments">Koko Installments</option>
              </select>
            </div>
          </div>

          <button type="submit" class="cart-submit-btn">Confirm & Save to Database</button>
        </form>
      </div>
    </div>
  `;

  const dbFloatingBtnHTML = `
    <button class="db-floating-btn" id="dbFloatingBtn" title="View Database Orders">
      <ion-icon name="server-outline"></ion-icon>
      <span class="db-count" id="dbCount">0</span>
    </button>
  `;

  const dbDrawerHTML = `
    <div class="db-viewer-drawer" id="dbViewerDrawer">
      <div class="db-viewer-overlay" id="dbViewerOverlay"></div>
      <div class="db-viewer-content">
        <div class="db-header">
          <h3><ion-icon name="server-outline"></ion-icon> Saved Orders Database (LocalStorage)</h3>
          <button class="db-close-btn" id="dbCloseBtn">&times;</button>
        </div>

        <div class="db-stats">
          <div class="stat-card">
            <div class="stat-title">Total Orders</div>
            <div class="stat-value" id="dbStatOrders">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Total Products</div>
            <div class="stat-value" id="dbStatQty">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-title">Est. Revenue</div>
            <div class="stat-value" id="dbStatRevenue">LKR 0</div>
          </div>
        </div>

        <div class="db-controls">
          <input type="text" class="db-search" id="dbSearch" placeholder="Search orders by customer or product...">
          <button class="db-clear-btn" id="dbClearBtn">Wipe DB</button>
        </div>

        <div class="db-table-container">
          <table class="db-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Total Price</th>
                <th>Customer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody id="dbTableBody">
              <!-- Dynamically Populated -->
            </tbody>
          </table>
          <div class="db-empty" id="dbEmptyState">
            <ion-icon name="folder-open-outline"></ion-icon>
            Database is empty. Add items to cart to save records!
          </div>
        </div>
      </div>
    </div>
  `;

  const jsonModalHTML = `
    <div class="json-modal" id="jsonModal">
      <div class="json-modal-overlay" id="jsonModalOverlay"></div>
      <div class="json-modal-content">
        <div class="db-header" style="margin-bottom: 10px;">
          <h3><ion-icon name="code-working-outline"></ion-icon> Structured Database Record</h3>
          <button class="db-close-btn" id="jsonModalCloseBtn" style="font-size: 20px;">&times;</button>
        </div>
        <pre class="json-pre"><code id="jsonCode"></code></pre>
        <button class="cart-submit-btn" id="jsonOkBtn" style="margin-top: 0;">Close Record View</button>
      </div>
    </div>
  `;

  const notificationHTML = `
    <div class="db-notification" id="dbNotification">
      <ion-icon name="checkmark-circle-outline" class="db-notification-icon"></ion-icon>
      <span class="db-notification-message" id="dbNotificationMessage">Record saved successfully!</span>
    </div>
  `;

  // Inject elements to body
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = modalHTML + dbFloatingBtnHTML + dbDrawerHTML + jsonModalHTML + notificationHTML;
  while (tempDiv.firstChild) {
    document.body.appendChild(tempDiv.firstChild);
  }

  // Get DOM Elements
  const cartInputModal = document.getElementById('cartInputModal');
  const cartModalOverlay = document.getElementById('cartModalOverlay');
  const cartModalCloseBtn = document.getElementById('cartModalCloseBtn');
  const cartPreviewImg = document.getElementById('cartPreviewImg');
  const cartPreviewName = document.getElementById('cartPreviewName');
  const cartPreviewPrice = document.getElementById('cartPreviewPrice');
  const cartInputForm = document.getElementById('cartInputForm');

  const sizeSelectorList = document.getElementById('sizeSelectorList');
  const colorSelectorList = document.getElementById('colorSelectorList');
  const qtyMinusBtn = document.getElementById('qtyMinusBtn');
  const qtyPlusBtn = document.getElementById('qtyPlusBtn');
  const qtyVal = document.getElementById('qtyVal');

  const dbFloatingBtn = document.getElementById('dbFloatingBtn');
  const dbCountBadge = document.getElementById('dbCount');
  const dbViewerDrawer = document.getElementById('dbViewerDrawer');
  const dbViewerOverlay = document.getElementById('dbViewerOverlay');
  const dbCloseBtn = document.getElementById('dbCloseBtn');
  const dbClearBtn = document.getElementById('dbClearBtn');
  const dbTableBody = document.getElementById('dbTableBody');
  const dbEmptyState = document.getElementById('dbEmptyState');
  const dbSearch = document.getElementById('dbSearch');

  const dbStatOrders = document.getElementById('dbStatOrders');
  const dbStatQty = document.getElementById('dbStatQty');
  const dbStatRevenue = document.getElementById('dbStatRevenue');

  const jsonModal = document.getElementById('jsonModal');
  const jsonModalOverlay = document.getElementById('jsonModalOverlay');
  const jsonModalCloseBtn = document.getElementById('jsonModalCloseBtn');
  const jsonOkBtn = document.getElementById('jsonOkBtn');
  const jsonCode = document.getElementById('jsonCode');

  const dbNotification = document.getElementById('dbNotification');
  const dbNotificationMessage = document.getElementById('dbNotificationMessage');

  // State Management
  let currentProduct = { name: '', price: '', image: '' };
  let selectedSize = 'M';
  let selectedColor = 'Black';
  let selectedQty = 1;

  // Option Selections (Sizes)
  sizeSelectorList.addEventListener('click', e => {
    if (e.target.classList.contains('option-badge')) {
      sizeSelectorList.querySelectorAll('.option-badge').forEach(el => el.classList.remove('selected'));
      e.target.classList.add('selected');
      selectedSize = e.target.getAttribute('data-value');
    }
  });

  // Option Selections (Colors)
  colorSelectorList.addEventListener('click', e => {
    if (e.target.classList.contains('color-dot')) {
      colorSelectorList.querySelectorAll('.color-dot').forEach(el => el.classList.remove('selected'));
      e.target.classList.add('selected');
      selectedColor = e.target.getAttribute('data-value');
    }
  });

  // Quantity adjustments
  qtyMinusBtn.addEventListener('click', () => {
    if (selectedQty > 1) {
      selectedQty--;
      qtyVal.textContent = selectedQty;
    }
  });

  qtyPlusBtn.addEventListener('click', () => {
    selectedQty++;
    qtyVal.textContent = selectedQty;
  });

  // Open Product Configuration Modal
  function openCartModal(name, price, img) {
    currentProduct = { name, price, image: img };
    cartPreviewName.textContent = name;
    cartPreviewPrice.textContent = price;
    cartPreviewImg.src = img;

    // Reset Form Config state
    selectedSize = 'M';
    selectedColor = 'Black';
    selectedQty = 1;
    qtyVal.textContent = 1;
    sizeSelectorList.querySelectorAll('.option-badge').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-value') === 'M');
    });
    colorSelectorList.querySelectorAll('.color-dot').forEach(el => {
      el.classList.toggle('selected', el.getAttribute('data-value') === 'Black');
    });

    // Reset customer fields
    cartInputForm.reset();

    // Show modal
    cartInputModal.classList.add('active');
  }

  // Close modal
  function closeCartModal() {
    cartInputModal.classList.remove('active');
  }

  if (cartModalCloseBtn) cartModalCloseBtn.addEventListener('click', closeCartModal);
  if (cartModalOverlay) cartModalOverlay.addEventListener('click', closeCartModal);

  // Success Notification
  function showNotification(message) {
    dbNotificationMessage.textContent = message;
    dbNotification.classList.add('active');
    setTimeout(() => {
      dbNotification.classList.remove('active');
    }, 3500);
  }

  // Get orders list
  function getOrders() {
    return JSON.parse(localStorage.getItem('shopEaseOrders')) || [];
  }

  // Save order to LocalStorage database
  cartInputForm.addEventListener('submit', e => {
    e.preventDefault();

    const orderId = 'ORD-' + Date.now().toString().slice(-6) + '-' + Math.floor(Math.random() * 1000);
    const timestamp = new Date().toISOString();
    
    const newOrder = {
      orderId,
      timestamp,
      product: {
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image
      },
      quantity: selectedQty,
      size: selectedSize,
      color: selectedColor,
      customer: {
        name: document.getElementById('custName').value,
        email: document.getElementById('custEmail').value,
        phone: document.getElementById('custPhone').value,
        address: document.getElementById('custAddress').value,
        deliveryMethod: document.getElementById('custDelivery').value,
        paymentMethod: document.getElementById('custPayment').value
      }
    };

    const orders = getOrders();
    orders.push(newOrder);
    localStorage.setItem('shopEaseOrders', JSON.stringify(orders));

    closeCartModal();
    updateDatabaseViewer();
    showNotification(`Order ${orderId} saved to database!`);
  });

  // Open / Close Database Viewer
  if (dbFloatingBtn) {
    dbFloatingBtn.addEventListener('click', () => {
      dbViewerDrawer.classList.add('active');
    });
  }

  function closeDbDrawer() {
    dbViewerDrawer.classList.remove('active');
  }

  if (dbCloseBtn) dbCloseBtn.addEventListener('click', closeDbDrawer);
  if (dbViewerOverlay) dbViewerOverlay.addEventListener('click', closeDbDrawer);

  // Re-render and calculate DB values
  function updateDatabaseViewer() {
    const orders = getOrders();
    if (dbCountBadge) dbCountBadge.textContent = orders.length;

    syncBadges();
    syncStockProgress();

    if (orders.length === 0) {
      if (dbTableBody) dbTableBody.innerHTML = '';
      if (dbEmptyState) dbEmptyState.style.display = 'block';
      if (dbStatOrders) dbStatOrders.textContent = '0';
      if (dbStatQty) dbStatQty.textContent = '0';
      if (dbStatRevenue) dbStatRevenue.textContent = 'LKR 0';
      return;
    }

    if (dbEmptyState) dbEmptyState.style.display = 'none';
    let totalQty = 0;
    let totalRevenue = 0;

    const searchTerm = dbSearch ? dbSearch.value.toLowerCase() : '';
    let filteredOrders = orders.filter(order => {
      const matchCust = order.customer.name.toLowerCase().includes(searchTerm);
      const matchProd = order.product.name.toLowerCase().includes(searchTerm);
      return matchCust || matchProd;
    });

    if (dbTableBody) {
      dbTableBody.innerHTML = filteredOrders.map(order => {
        // Parse numeric price from LKR 12000.00 or similar
        const rawPrice = order.product.price.replace(/[^\d.]/g, '');
        const priceVal = parseFloat(rawPrice) || 0;
        const orderTotal = priceVal * order.quantity;

        totalQty += order.quantity;
        totalRevenue += orderTotal;

        return `
          <tr>
            <td><span class="db-order-id">${order.orderId}</span><br><small class="db-date">${new Date(order.timestamp).toLocaleDateString()}</small></td>
            <td><strong>${order.product.name}</strong><br><small>Size: ${order.size} | Color: ${order.color}</small></td>
            <td style="text-align: center;">${order.quantity}</td>
            <td class="db-price">LKR ${orderTotal.toFixed(2)}</td>
            <td><strong>${order.customer.name}</strong><br><small>${order.customer.phone}</small></td>
            <td>
              <div class="db-actions-cell">
                <button class="db-action-btn view-json" data-id="${order.orderId}" title="View JSON Record">
                  <ion-icon name="code-working-outline"></ion-icon>
                </button>
                <button class="db-action-btn delete-row" data-id="${order.orderId}" title="Delete Record">
                  <ion-icon name="trash-outline"></ion-icon>
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }

    if (dbStatOrders) dbStatOrders.textContent = orders.length;
    if (dbStatQty) dbStatQty.textContent = totalQty;
    if (dbStatRevenue) dbStatRevenue.textContent = 'LKR ' + totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // Row Action listeners (View JSON / Delete Row)
  if (dbTableBody) {
    dbTableBody.addEventListener('click', e => {
      const btn = e.target.closest('.db-action-btn');
      if (!btn) return;

      const id = btn.getAttribute('data-id');
      const orders = getOrders();
      
      if (btn.classList.contains('view-json')) {
        const order = orders.find(o => o.orderId === id);
        if (order) {
          jsonCode.textContent = JSON.stringify(order, null, 2);
          jsonModal.classList.add('active');
        }
      } else if (btn.classList.contains('delete-row')) {
        if (confirm(`Are you sure you want to delete order ${id} from the database?`)) {
          const updatedOrders = orders.filter(o => o.orderId !== id);
          localStorage.setItem('shopEaseOrders', JSON.stringify(updatedOrders));
          updateDatabaseViewer();
          showNotification(`Order ${id} deleted.`);
        }
      }
    });
  }

  // JSON Modal actions
  function closeJsonModal() {
    jsonModal.classList.remove('active');
  }
  if (jsonModalCloseBtn) jsonModalCloseBtn.addEventListener('click', closeJsonModal);
  if (jsonModalOverlay) jsonModalOverlay.addEventListener('click', closeJsonModal);
  if (jsonOkBtn) jsonOkBtn.addEventListener('click', closeJsonModal);

  // Search orders
  if (dbSearch) dbSearch.addEventListener('input', updateDatabaseViewer);

  // Wipe Database
  if (dbClearBtn) {
    dbClearBtn.addEventListener('click', () => {
      if (confirm('CRITICAL WARNING: Are you sure you want to WIPE the entire LocalStorage database? All recorded order logs will be lost.')) {
        localStorage.removeItem('shopEaseOrders');
        updateDatabaseViewer();
        showNotification('Database cleared completely.');
      }
    });
  }

  // Event Listener Attachment to Product "Add to Cart" Actions
  function setupCartTriggers() {
    // 1. Featured add-to-cart buttons
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      // Avoid duplicate binding
      if (btn.getAttribute('data-db-bound')) return;
      btn.setAttribute('data-db-bound', 'true');
      
      btn.addEventListener('click', e => {
        e.preventDefault();
        
        // Find featured showcase container
        const showcase = btn.closest('.showcase') || btn.closest('.showcase-container');
        if (!showcase) return;

        const titleEl = showcase.querySelector('.showcase-title');
        const priceEl = showcase.querySelector('.price-box .price') || showcase.querySelector('.price');
        
        // Look for image inside showcase banner or inside showcase
        const imgEl = showcase.querySelector('.showcase-banner img') || showcase.querySelector('img');

        const title = titleEl ? titleEl.textContent.trim() : 'Premium Product';
        const price = priceEl ? priceEl.textContent.trim() : 'LKR 0.00';
        
        let img = '';
        if (imgEl) {
          img = imgEl.getAttribute('src');
        } else {
          // Fallback if no img element exists
          img = './assets/images/products/clothes-1.jpg';
        }

        // Relative path correction if triggered on blog/subfolder
        openCartModal(title, price, img);
      });
    });

    // 2. Standard grid add-to-cart action buttons (bag-add icon)
    document.querySelectorAll('.btn-action').forEach(btn => {
      const icon = btn.querySelector('ion-icon');
      if (icon && (icon.getAttribute('name') === 'bag-add-outline' || icon.getAttribute('name') === 'bag-add')) {
        // Avoid duplicate binding
        if (btn.getAttribute('data-db-bound')) return;
        btn.setAttribute('data-db-bound', 'true');

        btn.addEventListener('click', e => {
          e.preventDefault();

          // Find product showcase container
          const showcase = btn.closest('.showcase') || btn.closest('.showcase-container');
          if (!showcase) return;

          const titleEl = showcase.querySelector('.showcase-title');
          const priceEl = showcase.querySelector('.price-box .price') || showcase.querySelector('.price');
          
          // Prefer default image if multi-image structure exists
          const imgEl = showcase.querySelector('.product-img.default') || showcase.querySelector('img');

          const title = titleEl ? titleEl.textContent.trim() : 'Premium Product';
          const price = priceEl ? priceEl.textContent.trim() : 'LKR 0.00';
          const img = imgEl ? imgEl.getAttribute('src') : './assets/images/products/clothes-1.jpg';

          openCartModal(title, price, img);
        });
      }
    });
  }

  // Sync header badges (cart quantity & wishlist items)
  function syncBadges() {
    const orders = getOrders();
    const totalCartQty = orders.reduce((sum, order) => sum + (order.quantity || 1), 0);

    const wishlist = JSON.parse(localStorage.getItem('shopEaseWishlist')) || [];
    const totalWishlistCount = wishlist.length;

    // Update all matching elements
    document.querySelectorAll('.action-btn ion-icon[name="bag-handle-outline"] + .count, .action-btn ion-icon[name="bag-handle"] + .count').forEach(badge => {
      badge.textContent = totalCartQty;
    });

    document.querySelectorAll('.action-btn ion-icon[name="heart-outline"] + .count, .action-btn ion-icon[name="heart"] + .count').forEach(badge => {
      badge.textContent = totalWishlistCount;
    });
  }

  // Sync claim stock indicators dynamically
  function syncStockProgress() {
    const orders = getOrders();
    const showcases = document.querySelectorAll('.showcase, .showcase-container');
    showcases.forEach(showcase => {
      const titleEl = showcase.querySelector('.showcase-title');
      if (!titleEl) return;
      const title = titleEl.textContent.trim().toLowerCase();

      let soldQty = 0;
      orders.forEach(order => {
        if (order.product.name.toLowerCase() === title) {
          soldQty += order.quantity;
        }
      });

      let baseSold = 84;
      let baseAvail = 16;
      if (title.includes('shampoo')) {
        baseSold = 50;
        baseAvail = 90;
      } else if (title.includes('watch')) {
        baseSold = 91;
        baseAvail = 9;
      } else if (title.includes('hat')) {
        baseSold = 62;
        baseAvail = 38;
      } else if (title.includes('dress') || title.includes('frock')) {
        baseSold = 78;
        baseAvail = 22;
      } else if (title.includes('perfume')) {
        baseSold = 51;
        baseAvail = 49;
      } else if (title.includes('necklace') || title.includes('jewellery')) {
        baseSold = 73;
        baseAvail = 27;
      }

      const currentSold = baseSold + soldQty;
      const currentAvail = Math.max(0, baseAvail - soldQty);
      const total = currentSold + currentAvail;
      const percent = total > 0 ? Math.round((currentSold / total) * 100) : 0;

      const soldEl = showcase.querySelector('.showcase-status .wrapper p:nth-child(1) b, .deal-progress-container .progress-text-flex span:nth-child(1)');
      const availEl = showcase.querySelector('.showcase-status .wrapper p:nth-child(2) b, .deal-progress-container .progress-text-flex span:nth-child(2)');
      const barEl = showcase.querySelector('.showcase-status-bar, .progress-bar-fill');

      if (soldEl) {
        if (soldEl.textContent.includes('%')) {
          soldEl.textContent = `${percent}% Claimed`;
        } else {
          soldEl.textContent = currentSold;
        }
      }
      if (availEl) {
        if (availEl.textContent.includes('Left')) {
          availEl.textContent = `${currentAvail} Left`;
        } else {
          availEl.textContent = currentAvail;
        }
      }
      if (barEl) {
        barEl.style.width = percent + '%';
      }
    });
  }

  // Highlight wishlisted products
  function highlightWishlist() {
    const wishlist = JSON.parse(localStorage.getItem('shopEaseWishlist')) || [];
    document.querySelectorAll('.btn-action').forEach(btn => {
      const icon = btn.querySelector('ion-icon');
      if (icon && (icon.getAttribute('name') === 'heart-outline' || icon.getAttribute('name') === 'heart')) {
        const showcase = btn.closest('.showcase') || btn.closest('.showcase-container');
        if (!showcase) return;
        const titleEl = showcase.querySelector('.showcase-title');
        if (!titleEl) return;
        const title = titleEl.textContent.trim();

        if (wishlist.includes(title)) {
          icon.setAttribute('name', 'heart');
          icon.style.color = 'var(--salmon-pink)';
        } else {
          icon.setAttribute('name', 'heart-outline');
          icon.style.color = '';
        }
      }
    });
  }

  // Setup wishlist triggers
  function setupWishlistTriggers() {
    document.querySelectorAll('.btn-action').forEach(btn => {
      const icon = btn.querySelector('ion-icon');
      if (icon && (icon.getAttribute('name') === 'heart-outline' || icon.getAttribute('name') === 'heart')) {
        if (btn.getAttribute('data-wishlist-bound')) return;
        btn.setAttribute('data-wishlist-bound', 'true');

        btn.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();

          const showcase = btn.closest('.showcase') || btn.closest('.showcase-container');
          if (!showcase) return;

          const titleEl = showcase.querySelector('.showcase-title');
          if (!titleEl) return;
          const title = titleEl.textContent.trim();

          let wishlist = JSON.parse(localStorage.getItem('shopEaseWishlist')) || [];
          if (wishlist.includes(title)) {
            wishlist = wishlist.filter(item => item !== title);
            icon.setAttribute('name', 'heart-outline');
            icon.style.color = '';
            showNotification(`"${title}" removed from wishlist.`);
          } else {
            wishlist.push(title);
            icon.setAttribute('name', 'heart');
            icon.style.color = 'var(--salmon-pink)';
            showNotification(`"${title}" added to wishlist!`);
          }

          localStorage.setItem('shopEaseWishlist', JSON.stringify(wishlist));
          syncBadges();
        });
      }
    });
  }

  // Initial runs
  setupCartTriggers();
  updateDatabaseViewer();
  highlightWishlist();
  setupWishlistTriggers();

  // Watch for dynamic DOM changes (just in case they render late)
  setTimeout(() => {
    setupCartTriggers();
    setupWishlistTriggers();
    highlightWishlist();
  }, 1000);
})();

// ==========================================
// INTERACTIVE STAR RATING SYSTEM
// ==========================================
(function initStarRating() {
  const ratingContainers = document.querySelectorAll('.showcase-rating');

  ratingContainers.forEach(container => {
    // Find the product title associated with this rating
    const showcase = container.closest('.showcase') || container.closest('.showcase-container');
    if (!showcase) return;

    const titleEl = showcase.querySelector('.showcase-title');
    if (!titleEl) return;

    const productKey = 'rating_' + titleEl.textContent.trim().toLowerCase().replace(/\s+/g, '_');

    // Retrieve saved rating from LocalStorage
    const savedRating = localStorage.getItem(productKey);
    const stars = container.querySelectorAll('ion-icon');

    // Record original state of rating stars on page load
    const originalStates = [];
    stars.forEach(star => {
      originalStates.push({
        name: star.getAttribute('name'),
        color: star.style.color || ''
      });
    });

    if (savedRating) {
      const ratingVal = parseInt(savedRating, 10);
      stars.forEach((star, idx) => {
        if (idx < ratingVal) {
          star.setAttribute('name', 'star');
          star.style.color = '#ffb300';
        } else {
          star.setAttribute('name', 'star-outline');
          star.style.color = '';
        }
      });
    }

    // Set interactive styles and events for stars
    stars.forEach((star, index) => {
      star.style.cursor = 'pointer';
      star.style.transition = 'transform 0.15s ease';
      
      // Hover feedback (mouseenter)
      star.addEventListener('mouseenter', () => {
        stars.forEach((s, idx) => {
          if (idx <= index) {
            s.setAttribute('name', 'star');
            s.style.color = '#ffcc00';
            s.style.transform = 'scale(1.2)';
          } else {
            s.setAttribute('name', 'star-outline');
            s.style.color = '';
            s.style.transform = '';
          }
        });
      });

      // Rating save (click)
      star.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const ratingVal = index + 1;
        localStorage.setItem(productKey, ratingVal);

        // Update UI
        stars.forEach((s, idx) => {
          if (idx < ratingVal) {
            s.setAttribute('name', 'star');
            s.style.color = '#ffb300';
          } else {
            s.setAttribute('name', 'star-outline');
            s.style.color = '';
          }
        });

        // Trigger database notification toast
        const prodName = titleEl.textContent.trim();
        showFeedbackNotification(`Thank you! You rated "${prodName}" ${ratingVal} out of 5 stars.`);
      });
    });

    // Reset stars layout on container mouseleave
    container.addEventListener('mouseleave', () => {
      const activeRating = parseInt(localStorage.getItem(productKey) || '0', 10);
      stars.forEach((s, idx) => {
        s.style.transform = '';
        if (activeRating > 0) {
          if (idx < activeRating) {
            s.setAttribute('name', 'star');
            s.style.color = '#ffb300';
          } else {
            s.setAttribute('name', 'star-outline');
            s.style.color = '';
          }
        } else {
          s.setAttribute('name', originalStates[idx].name);
          s.style.color = originalStates[idx].color;
        }
      });
    });
  });

  // Re-use or define notification toast helper
  function showFeedbackNotification(message) {
    const dbNotif = document.getElementById('dbNotification');
    const dbNotifMsg = document.getElementById('dbNotificationMessage');
    if (dbNotif && dbNotifMsg) {
      dbNotifMsg.textContent = message;
      dbNotif.classList.add('active');
      setTimeout(() => {
        dbNotif.classList.remove('active');
      }, 3500);
    }
  }
})();

// ==========================================
// CATEGORY FILTER & REDIRECT SYSTEM
// ==========================================
(function initCategoryFilter() {
  const categoryItems = document.querySelectorAll('.category-item');
  const productMain = document.querySelector('.product-main');
  const productGridTitle = document.getElementById('productGridTitle');
  const clearFilterBtn = document.getElementById('clearCategoryFilterBtn');
  const productGrid = document.querySelector('.product-grid');
  
  if (!productMain || !productGrid) return;
  
  const showcases = productGrid.querySelectorAll('.showcase');

  // Category mapping to product showcase categories (all lowercase match)
  const categoryMap = {
    "dress & frock": ["skirt", "party wear", "dress & frock", "clothes"],
    "winter wear": ["jacket", "jackets", "winter wear", "coat"],
    "glasses & lens": ["glasses", "lens", "sunglasses", "glasses & lens"],
    "shorts & jeans": ["shorts", "jeans", "shorts & jeans"],
    "t-shirts": ["shirt", "t-shirt", "t-shirts", "tee"],
    "jacket": ["jacket", "jackets"],
    "watch": ["watch", "watches"],
    "hat & caps": ["hat", "caps", "hat & caps"]
  };

  function applyCategoryFilter(categoryName) {
    const query = categoryName.toLowerCase().trim();
    const targetCategories = categoryMap[query] || [query];

    showcases.forEach(showcase => {
      const catEl = showcase.querySelector('.showcase-category');
      if (catEl) {
        const productCat = catEl.textContent.trim().toLowerCase();
        const isMatch = targetCategories.some(target => productCat.includes(target) || target.includes(productCat));
        
        if (isMatch) {
          showcase.style.display = 'block';
          // Ensure fade-in animation triggers
          showcase.classList.remove('aos-active');
          setTimeout(() => showcase.classList.add('aos-active'), 50);
        } else {
          showcase.style.display = 'none';
        }
      }
    });

    if (productGridTitle) {
      productGridTitle.textContent = `Category: ${categoryName}`;
    }
    if (clearFilterBtn) {
      clearFilterBtn.style.display = 'block';
    }

    // Scroll to Product Section smoothly
    productMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function resetCategoryFilter() {
    showcases.forEach(showcase => {
      showcase.style.display = 'block';
    });

    if (productGridTitle) {
      productGridTitle.textContent = 'New Products';
    }
    if (clearFilterBtn) {
      clearFilterBtn.style.display = 'none';
    }
  }

  // Bind click events to category slider cards
  categoryItems.forEach(item => {
    const titleEl = item.querySelector('.category-item-title');
    const categoryName = titleEl ? titleEl.textContent.trim() : '';
    
    item.style.cursor = 'pointer';
    item.addEventListener('click', (e) => {
      if (e.target.tagName === 'A' || e.target.classList.contains('category-btn')) {
        e.preventDefault();
      }
      if (categoryName) {
        applyCategoryFilter(categoryName);
      }
    });
  });

  // Bind click event to Clear Filter button
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resetCategoryFilter();
    });
  }

  // Bind clicking sidebar category links or other menu links
  const sidebarSubmenus = document.querySelectorAll('.sidebar-submenu-title');
  sidebarSubmenus.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const nameEl = link.querySelector('.product-name');
      if (nameEl) {
        applyCategoryFilter(nameEl.textContent.trim());
      }
    });
  });
})();

// ==========================================
// LINKED LIST PRODUCT SEARCH SYSTEM
// ==========================================
(function initLinkedListSearch() {
  class Node {
    constructor(data) {
      this.data = data; // { title: string, category: string, element: HTMLElement }
      this.next = null;
    }
  }

  class LinkedList {
    constructor() {
      this.head = null;
    }

    append(data) {
      const newNode = new Node(data);
      if (!this.head) {
        this.head = newNode;
        return;
      }
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }

    // Traverse the LinkedList searching for matches case-insensitively
    search(query) {
      const results = [];
      const lowerQuery = query.toLowerCase().trim();
      let current = this.head;

      while (current) {
        const title = current.data.title.toLowerCase();
        const category = current.data.category.toLowerCase();

        if (title.includes(lowerQuery) || category.includes(lowerQuery)) {
          results.push(current.data);
        }
        current = current.next;
      }
      return results;
    }
  }

  const productList = new LinkedList();
  const showcases = document.querySelectorAll('.product-grid .showcase, .product-featured .showcase, .product-featured .showcase-container');

  // Populate Linked List with DOM references of all products on the current page
  showcases.forEach(showcase => {
    const titleEl = showcase.querySelector('.showcase-title');
    const catEl = showcase.querySelector('.showcase-category');
    if (titleEl) {
      productList.append({
        title: titleEl.textContent.trim(),
        category: catEl ? catEl.textContent.trim() : '',
        element: showcase
      });
    }
  });

  // Perform search UI filtering using the LinkedList matches
  function executeSearch(query) {
    const productGridTitle = document.getElementById('productGridTitle') || document.querySelector('.product-main .title');
    const clearFilterBtn = document.getElementById('clearCategoryFilterBtn');
    const productMain = document.querySelector('.product-main');

    if (!query) {
      showcases.forEach(sc => sc.style.display = 'block');
      if (productGridTitle) productGridTitle.textContent = 'New Products';
      if (clearFilterBtn) clearFilterBtn.style.display = 'none';
      return;
    }

    const matches = productList.search(query);

    showcases.forEach(sc => {
      sc.style.display = 'none';
    });

    matches.forEach(match => {
      match.element.style.display = 'block';
      match.element.classList.remove('aos-active');
      setTimeout(() => match.element.classList.add('aos-active'), 50);
    });

    if (productGridTitle) {
      productGridTitle.textContent = `Search: "${query}" (${matches.length} matches)`;
    }

    if (clearFilterBtn) {
      clearFilterBtn.style.display = 'block';
    }

    if (productMain) {
      productMain.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // Bind to header search controls
  const searchInput = document.querySelector('.search-field');
  const searchBtn = document.querySelector('.search-btn');

  if (searchInput) {
    function performSearch() {
      const query = searchInput.value.trim();
      if (!query) return;

      const hasGrid = document.querySelector('.product-grid') !== null;
      if (hasGrid) {
        executeSearch(query);
      } else {
        // Redirect to homepage with search query parameter
        window.location.href = `index.html?search=${encodeURIComponent(query)}`;
      }
    }

    searchInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    if (searchBtn) {
      searchBtn.addEventListener('click', performSearch);
    }
  }

  // Handle clear filter clicks (reset search display)
  const clearFilterBtn = document.getElementById('clearCategoryFilterBtn');
  if (clearFilterBtn) {
    clearFilterBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      executeSearch('');
    });
  }

  // Run on page load if search parameter is present in URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery) {
    if (searchInput) searchInput.value = searchQuery;
    setTimeout(() => {
      executeSearch(searchQuery);
    }, 300);
  }
})();
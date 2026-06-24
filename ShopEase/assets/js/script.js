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
const revealElements = document.querySelectorAll('.banner, .category, .product-main, .showcase, .blog-card, .blog-box, .sidebar, .product-minimal, .testimonial-card, .cta-container, .service-container');

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

  // Initial runs
  setupCartTriggers();
  updateDatabaseViewer();

  // Watch for dynamic DOM changes (just in case they render late)
  setTimeout(setupCartTriggers, 1000);
})();
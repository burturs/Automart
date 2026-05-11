// Automart Spares Marketplace - Main Application

// Sample Product Data
const productsData = [
    {
        id: 1,
        make: 'Toyota',
        model: 'Hilux (2018-2022)',
        name: 'Left Side Front Fender - White',
        category: 'Body Parts',
        condition: 'used',
        price: 2450,
        vin_matched: true,
        sku: '992-TH',
        seller: 'JM Spares',
        rating: 4.8,
        reviews: 24,
        image: '🚗',
        inStock: true
    },
    {
        id: 2,
        make: 'Volkswagen',
        model: 'Golf 7 (TSI)',
        name: 'OEM Ignition Coil Pack (Set of 4)',
        category: 'Engine Parts',
        condition: 'new',
        price: 3800,
        vin_matched: false,
        sku: 'VW-IGN-001',
        seller: 'AutoParts Direct',
        rating: 4.9,
        reviews: 156,
        image: '⚙️',
        inStock: true
    },
    {
        id: 3,
        make: 'Ford',
        model: 'Focus (2015-2018)',
        name: 'Front Bumper Assembly - Black',
        category: 'Body Parts',
        condition: 'used',
        price: 1850,
        vin_matched: true,
        sku: 'FRD-FBU-015',
        seller: 'Crash Parts SA',
        rating: 4.5,
        reviews: 45,
        image: '🛡️',
        inStock: true
    },
    {
        id: 4,
        make: 'BMW',
        model: '320i (2010-2015)',
        name: 'Complete Alternator - OEM',
        category: 'Engine Parts',
        condition: 'new',
        price: 4200,
        vin_matched: false,
        sku: 'BMW-ALT-320',
        seller: 'Premium Motors',
        rating: 5.0,
        reviews: 89,
        image: '🔋',
        inStock: true
    },
    {
        id: 5,
        make: 'Toyota',
        model: 'Corolla (2012-2018)',
        name: 'Rear Shock Absorbers (Pair)',
        category: 'Suspension',
        condition: 'used',
        price: 1200,
        vin_matched: true,
        sku: 'TYT-SHCK-012',
        seller: 'Suspension Specialists',
        rating: 4.7,
        reviews: 67,
        image: '🏎️',
        inStock: true
    },
    {
        id: 6,
        make: 'Hyundai',
        model: 'i10 (2016-2020)',
        name: 'Full Brake Pads Set - Ceramic',
        category: 'Brakes',
        condition: 'new',
        price: 890,
        vin_matched: false,
        sku: 'HND-BRK-I10',
        seller: 'BrakeMaster',
        rating: 4.6,
        reviews: 112,
        image: '🛑',
        inStock: true
    }
];

// DOM Helpers
const DOM = {
    productGrid: document.querySelector('[data-product-grid]'),
    searchBtn: document.querySelector('[data-search-btn]'),
    cartBtn: document.querySelector('[data-cart-btn]'),
    cart: [],
    
    renderProducts(products = productsData) {
        if (!this.productGrid) return;
        
        this.productGrid.innerHTML = products.map(product => `
            <div class="bg-zinc-900 border border-zinc-800 p-4 rounded-sm part-card transition duration-300">
                <div class="h-40 bg-zinc-800 rounded mb-4 overflow-hidden relative">
                    <span class="absolute top-2 right-2 ${product.condition === 'new' ? 'bg-zinc-100 text-black' : 'bg-red-600 text-white'} text-[10px] font-bold px-2 py-1 rounded">
                        ${product.condition.toUpperCase()}
                    </span>
                    <div class="w-full h-full flex items-center justify-center text-4xl">${product.image}</div>
                </div>
                <p class="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-1">${product.make} ${product.model}</p>
                <h3 class="text-white font-bold text-lg leading-tight mb-2">${product.name}</h3>
                <div class="flex items-center space-x-2 mb-2">
                    ${product.vin_matched ? `<span class="bg-zinc-800 text-green-500 text-[10px] font-mono px-2 py-0.5 rounded">VIN-MATCHED</span>` : ''}
                    <span class="bg-zinc-800 text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded">SKU: ${product.sku}</span>
                </div>
                <div class="flex items-center mb-3">
                    <span class="text-yellow-500 text-xs font-bold">★ ${product.rating}</span>
                    <span class="text-zinc-500 text-xs ml-1">(${product.reviews} reviews)</span>
                </div>
                <div class="flex justify-between items-center mt-4">
                    <span class="text-2xl font-black text-white">R ${product.price.toLocaleString()}</span>
                    <button class="bg-zinc-100 text-black hover:bg-red-600 hover:text-white px-4 py-2 text-xs font-black uppercase transition-colors" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    updateCart() {
        const cartCount = this.cart.length;
        const cartBtn = document.querySelector('[data-cart-btn]');
        if (cartBtn) {
            cartBtn.textContent = `Cart (${cartCount})`;
        }
    }
};

// Search Functionality
function handleSearch() {
    const make = document.querySelector('[data-filter-make]')?.value;
    const model = document.querySelector('[data-filter-model]')?.value;
    const partName = document.querySelector('[data-filter-part]')?.value;
    
    let filtered = productsData;
    
    if (make && make !== 'all') {
        filtered = filtered.filter(p => p.make.toLowerCase() === make.toLowerCase());
    }
    
    if (partName) {
        filtered = filtered.filter(p => p.name.toLowerCase().includes(partName.toLowerCase()));
    }
    
    DOM.renderProducts(filtered);
}

// Cart Management
function addToCart(productId) {
    const product = productsData.find(p => p.id === productId);
    if (product) {
        DOM.cart.push(product);
        DOM.updateCart();
        showNotification(`Added "${product.name}" to cart!`);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-3 rounded shadow-lg z-50';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Filter Management
function toggleConditionFilter(condition) {
    const filters = document.querySelectorAll('[data-condition-filter]');
    let selectedConditions = [];
    
    filters.forEach(filter => {
        if (filter.checked) {
            selectedConditions.push(filter.dataset.conditionFilter);
        }
    });
    
    if (selectedConditions.length === 0) {
        DOM.renderProducts(productsData);
    } else {
        const filtered = productsData.filter(p => selectedConditions.includes(p.condition));
        DOM.renderProducts(filtered);
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    const menu = document.querySelector('[data-mobile-menu]');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
    DOM.renderProducts();
    DOM.updateCart();
    
    // Event listeners
    const searchBtn = document.querySelector('[data-search-btn]');
    if (searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
    }
    
    const conditionFilters = document.querySelectorAll('[data-condition-filter]');
    conditionFilters.forEach(filter => {
        filter.addEventListener('change', toggleConditionFilter);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addToCart, handleSearch, toggleConditionFilter };
}

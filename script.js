// مدیریت حالت تاریک
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// بررسی ذخیره‌سازی محلی برای حالت تاریک
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        localStorage.setItem('darkMode', 'disabled');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
});

// مدیریت سبد خرید
const cart = {
    items: [],
    total: 0,
    
    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({...item, quantity: 1});
        }
        
        this.calculateTotal();
        this.updateCartUI();
        this.saveToLocalStorage();
        
        // نمایش اعلان
        showNotification(`${item.name} به سبد خرید اضافه شد`);
    },
    
    removeItem(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.calculateTotal();
        this.updateCartUI();
        this.saveToLocalStorage();
    },
    
    updateQuantity(id, quantity) {
        const item = this.items.find(i => i.id === id);
        
        if (item) {
            item.quantity = quantity;
            
            if (item.quantity <= 0) {
                this.removeItem(id);
            } else {
                this.calculateTotal();
                this.updateCartUI();
                this.saveToLocalStorage();
            }
        }
    },
    
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },
    
    updateCartUI() {
        const cartItemsEl = document.getElementById('cartItems');
        const cartTotalEl = document.getElementById('cartTotal');
        const cartCountEl = document.getElementById('cartCount');
        
        // به روزرسانی آیتم‌های سبد خرید
        cartItemsEl.innerHTML = this.items.map(item => `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toLocaleString()} تومان</p>
                </div>
                <div class="item-controls">
                    <button class="quantity-btn minus" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // به روزرسانی جمع کل و تعداد آیتم‌ها
        cartTotalEl.textContent = `${this.total.toLocaleString()} تومان`;
        cartCountEl.textContent = this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    },
    
    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            this.items = JSON.parse(savedCart);
            this.calculateTotal();
            this.updateCartUI();
        }
    }
};

// نمایش اعلان
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // نمایش اعلان
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // مخفی کردن اعلان بعد از 3 ثانیه
    setTimeout(() => {
        notification.classList.remove('show');
        notification.classList.add('fade-out');
        
        // حذف اعلان از DOM بعد از اتمام انیمیشن
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// داده‌های منو
const menuData = [
    {
        id: "1",
        name: "چلوکباب",
        description: "چلوکباب کوبیده با برنج ایرانی و زعفران",
        price: 85000,
        image: "https://via.placeholder.com/300x200?text=چلوکباب"
    },
    {
        id: "2",
        name: "چلو جوجه کباب",
        description: "جوجه کباب مزه‌دار شده با برنج ایرانی",
        price: 75000,
        image: "https://via.placeholder.com/300x200?text=چلو+جوجه"
    },
    {
        id: "3",
        name: "چلو قیمه",
        description: "قیمه سنتی با لپه و سیب زمینی",
        price: 65000,
        image: "https://via.placeholder.com/300x200?text=چلو+قیمه"
    },
    {
        id: "4",
        name: "چلو خورشت سبزی",
        description: "برنج سفید و خورشت سبزی",
        price: 90000,
        image: "https://via.placeholder.com/300x200?text=چلو+سبزی"
    },
    {
        id: "5",
        name: "زرشک پلو با مرغ",
        description: "برنج زعفرانی با زرشک و مرغ مزه‌دار شده",
        price: 75000,
        image: "https://via.placeholder.com/300x200?text=زرشک+پلو"
    }
];

const trayData = [
    {
        id: "6",
        name: "سینی ۲ نفره",
        description: "یک عدد سیخ کوبیده و یک سیخ جوجه و گوجه با دو عدد برنج",
        price: 190000,
        image: "https://via.placeholder.com/300x200?text=سینی+۲+نفره"
    },
    {
        id: "7",
        name: "سینی ۳ نفره",
        description: "دو سیخ کوبیده ویک سیخ جوجه با گوجه و سه عدد برنج",
        price: 270000,
        image: "https://via.placeholder.com/300x200?text=سینی+۳+نفره"
    },
    {
        id: "8",
        name: "سینی ۴ نفره",
        description: "سه عدد سیخ کوبیده و یک سیخ جوجه با گوجه و چهار عدد برنج",
        price: 340000,
        image: "https://via.placeholder.com/300x200?text=سینی+۴+نفره"
    },
    {
        id: "9",
        name: "سینی ۵ نفره",
        description: "چها عدد سیخ کوبیده و دو سیخ جوجه با گوجه و پنج عدد برنج",
        price: 400000,
        image: "https://via.placeholder.com/300x200?text=سینی+۵+نفره"
    }
];

// نقشه گوگل
let map;
let marker;
let geocoder;

function initMap() {
    // مختصات مرکز نقشه (تهران)
    const center = { lat: 35.6892, lng: 51.3890 };
    
    // ایجاد نقشه
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: center,
    });
    
    // ایجاد نشانگر
    marker = new google.maps.Marker({
        map: map,
        draggable: true,
    });
    
    // تنظیم نشانگر در مرکز نقشه
    marker.setPosition(center);
    
    // جیوکدر برای تبدیل آدرس به مختصات
    geocoder = new google.maps.Geocoder();
    
    // رویداد برای جابجایی نشانگر
    marker.addListener("dragend", () => {
        updateAddressFromMarker();
    });
    
    // جستجوی آدرس
    const addressInput = document.getElementById("address-search");
    addressInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            geocodeAddress(addressInput.value);
        }
    });
    
    // دکمه موقعیت فعلی
    document.getElementById("use-current-location").addEventListener("click", () => {
        getCurrentLocation();
    });
}

// تبدیل آدرس به مختصات
function geocodeAddress(address) {
    geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results[0]) {
            map.setCenter(results[0].geometry.location);
            marker.setPosition(results[0].geometry.location);
            
            // به‌روزرسانی فیلد آدرس
            document.getElementById("delivery-address").value = results[0].formatted_address;
        } else {
            showNotification("آدرس یافت نشد", "error");
        }
    });
}

// به‌روزرسانی آدرس از روی نشانگر
function updateAddressFromMarker() {
    const position = marker.getPosition();
    geocoder.geocode({ location: position }, (results, status) => {
        if (status === "OK" && results[0]) {
            document.getElementById("delivery-address").value = results[0].formatted_address;
        }
    });
}

// دریافت موقعیت فعلی کاربر
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                map.setCenter(pos);
                marker.setPosition(pos);
                updateAddressFromMarker();
            },
            () => {
                showNotification("دسترسی به موقعیت فعلی امکان‌پذیر نیست", "error");
            }
        );
    } else {
        showNotification("مرورگر شما از موقعیت‌یابی پشتیبانی نمی‌کند", "error");
    }
}

// بارگذاری اولیه صفحه
document.addEventListener('DOMContentLoaded', () => {
    // بارگذاری سبد خرید
    cart.loadFromLocalStorage();
    
    // تولید منو
    const menuCarousel = document.querySelector('.menu-carousel');
    menuCarousel.innerHTML = menuData.map(item => `
        <div class="menu-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="menu-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price.toLocaleString()} تومان</span>
                <button class="add-to-cart" 
                    data-id="${item.id}" 
                    data-name="${item.name}" 
                    data-price="${item.price}">
                    افزودن به سبد
                </button>
            </div>
        </div>
    `).join('');
    
    // تولید سینی‌ها
    const trayCarousel = document.querySelector('.tray-carousel');
    trayCarousel.innerHTML = trayData.map(item => `
        <div class="tray-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="tray-item-content">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <span class="price">${item.price.toLocaleString()} تومان</span>
                <button class="add-to-cart" 
                    data-id="${item.id}" 
                    data-name="${item.name}" 
                    data-price="${item.price}">
                    افزودن به سبد
                </button>
            </div>
        </div>
    `).join('');
    
    // مدیریت کلیک روی دکمه‌های افزودن به سبد خرید
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            const name = button.getAttribute('data-name');
            const price = parseInt(button.getAttribute('data-price'));
            
            cart.addItem({ id, name, price });
        });
    });
    
    // باز و بسته کردن سبد خرید
    const openCartBtn = document.getElementById('openCart');
    const closeCartBtn = document.getElementById('closeCart');
    const cartSidebar = document.getElementById('cartSidebar');
    
    openCartBtn.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
    
    closeCartBtn.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
    
    // مدیریت رویدادهای سبد خرید
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
            const id = e.target.getAttribute('data-id') || 
                       e.target.closest('.remove-btn').getAttribute('data-id');
            cart.removeItem(id);
        }
        
        if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
            const id = e.target.getAttribute('data-id') || 
                       e.target.closest('.plus').getAttribute('data-id');
            const item = cart.items.find(i => i.id === id);
            if (item) cart.updateQuantity(id, item.quantity + 1);
        }
        
        if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
            const id = e.target.getAttribute('data-id') || 
                       e.target.closest('.minus').getAttribute('data-id');
            const item = cart.items.find(i => i.id === id);
            if (item) cart.updateQuantity(id, item.quantity - 1);
        }
    });
    
    // تکمیل سفارش
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.items.length === 0) {
            showNotification('سبد خرید شما خالی است', 'error');
            return;
        }
        
        // دریافت آدرس
        const address = document.getElementById('delivery-address').value;
        if (!address.trim()) {
            showNotification('لطفاً آدرس ارسال را وارد کنید', 'error');
            return;
        }
        
        // ایجاد سفارش
        const order = {
            id: Date.now(),
            items: [...cart.items],
            total: cart.total,
            address: address,
            date: new Date().toLocaleString('fa-IR'),
            status: 'pending'
        };
        
        // ذخیره سفارش (در اینجا می‌توانید به سرور ارسال کنید)
        saveOrder(order);
        
        // نمایش مودال سفارش موفق
        showOrderSuccess(order);
        
        // ریست سبد خرید
        cart.items = [];
        cart.total = 0;
        cart.updateCartUI();
        cart.saveToLocalStorage();
        cartSidebar.classList.remove('open');
    });
    
    // مدیریت منوی موبایل
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        mobileMenuBtn.innerHTML = mainNav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // مدیریت کاروسل‌ها
    setupCarousel('.menu-container', '.menu-carousel');
    setupCarousel('.tray-container', '.tray-carousel');
    
    // مدیریت مودال سفارش موفق
    const successModal = document.getElementById('order-success-modal');
    const closeModal = document.querySelector('.close');
    
    closeModal.addEventListener('click', () => {
        successModal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });
});

// نمایش سفارش موفق
function showOrderSuccess(order) {
    const modal = document.getElementById('order-success-modal');
    const orderDetails = document.getElementById('order-details');
    
    const itemsList = order.items.map(item => 
        `${item.name} (${item.quantity} عدد) - ${(item.price * item.quantity).toLocaleString()} تومان`
    ).join('<br>');
    
    orderDetails.innerHTML = `
        <strong>شماره سفارش:</strong> ${order.id}<br>
        <strong>مبلغ کل:</strong> ${order.total.toLocaleString()} تومان<br>
        <strong>آدرس تحویل:</strong> ${order.address}<br>
        <strong>جزئیات سفارش:</strong><br>${itemsList}
    `;
    
    modal.style.display = 'block';
}

// ذخیره سفارش
function saveOrder(order) {
    // در اینجا می‌توانید سفارش را به سرور ارسال کنید
    // برای نمونه در localStorage ذخیره می‌کنیم
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    console.log('سفارش ذخیره شد:', order);
}

// تنظیمات کاروسل
function setupCarousel(containerSelector, carouselSelector) {
    const container = document.querySelector(containerSelector);
    const carousel = container.querySelector(carouselSelector);
    const prevBtn = container.querySelector('.prev-btn');
    const nextBtn = container.querySelector('.next-btn');
    
    prevBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });
    
    nextBtn.addEventListener('click', () => {
        carousel.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });
}
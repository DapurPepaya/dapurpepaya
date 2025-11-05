// --- Wait for the DOM to be fully loaded ---
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // SECTION 1: WEBSITE FUNCTIONALITY (Navbar, Dark Mode, etc.)
    // =========================================================================

    // Navbar
    const toggleBtn = document.querySelector('.toggle-btn');
    const mobileToggleBtn = document.querySelector('.mobile-toggle');
    const navbar = document.querySelector('.navbar');
    const navItem = document.querySelectorAll('.nav-item');

    toggleBtn.addEventListener('click', () => {
        if (!navbar.classList.contains('active')) {
            navbar.classList.add('active');
            navbar.classList.remove('closing');
            toggleBtn.textContent = 'X Close';
        } else {
            navbar.classList.add('closing');
            navbar.classList.remove('active');
            toggleBtn.textContent = '☰ Menu';
        }
    });

    navItem.forEach(Nitem => {
        Nitem.addEventListener('click', () => {
            navbar.classList.add('closing');
            navbar.classList.remove('active');
            toggleBtn.textContent = '☰ Menu';
        });
    });

    mobileToggleBtn.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            mobileToggleBtn.classList.remove('active');
            navbar.classList.add('closing');
            navbar.classList.remove('active');
        } else {
            mobileToggleBtn.classList.add('active');
            navbar.classList.add('active');
            navbar.classList.remove('closing');
        }
    });

    // Dark Mode
    let darkmode = localStorage.getItem("darkmode");
    const themeswitch = document.getElementById('theme-switch');

    const enableDarkmode = () => {
        document.body.classList.add('darkmode');
        localStorage.setItem('darkmode', 'active');
        themeswitch.textContent = "⏾";
    }

    const disableDarkmode = () => {
        document.body.classList.remove('darkmode');
        localStorage.setItem('darkmode', null);
        themeswitch.textContent = "☀";
    }

    if (darkmode === 'active') enableDarkmode();

    themeswitch.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode');
        darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });

    // Home img clicker
    const homeImg = document.querySelector('.home-img-clicker');
    const homeImages = ["Images/1.png", "Images/2.png", "Images/3.png", "Images/4.png", "Images/5.png", "Images/6.png", "Images/7.png"];
    let currentImageIndex = 0;

    homeImg.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % homeImages.length;
        homeImg.style.transform = 'scale(0.985)';
        homeImg.src = homeImages[currentImageIndex];
        setTimeout(() => {
            homeImg.style.transform = 'scale(1)';
        }, 300);
    });

    // Comparison Slider
    const rangeInput = document.getElementById('range');
    if (rangeInput) {
        rangeInput.oninput = () => {
            document.body.style.setProperty('--pos', rangeInput.value + '%');
        }
    }
    
    // Contact Section Map Switcher
    window.switchLocation = function(location) {
        document.querySelectorAll('.tab-button').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('.map-content').forEach(content => content.classList.remove('active'));
        document.querySelector(`[onclick="switchLocation('${location}')"]`).classList.add('active');
        document.getElementById(location).classList.add('active');
    }

    // =========================================================================
    // SECTION 2: DYNAMIC PRODUCT DISPLAY
    // =========================================================================

    let products = [];
    const initialProducts = [
        { id: 1, name: 'Papaya Candied', description: 'Manisan Buah papaya dengan perpaduan rasa manis, kenyal dan rasa asam Menjadikan rasa yang unik untuk dinikmati', price: 'Rp 25.000,00', imageSrc: 'Images/1.png' },
        { id: 2, name: 'Papaya Crispy', description: 'Cemilan inovatif, yang mengubah buah papaya segar menjadi keripik Renyah, dengan cita rasa manis alami buah papaya.', price: 'Rp 20.000,00', imageSrc: 'Images/2.png' },
        { id: 3, name: 'Aboya', description: 'Abon papaya terbuat dari buah papaya dengan campuran rempah2 menghadirkan sensasi Rasa berbeda. Cemilan gurih cocok dijadikan lauk praktis.', price: 'Rp 15.000,00', imageSrc: 'Images/3.png' },
        { id: 4, name: 'Sukade', description: 'Olahan papaya bertekstur kenyal dengan rasa manis alami dan warna menarik, sempurna sebagai campuran adonan atau topping.', price: 'Rp 7.000,00', imageSrc: 'Images/4.png' },
        { id: 5, name: 'Sweet & Spicy', description: 'Pepaya Sweet & Spicy adalah camilan yang memberikan paduan rasa antara manis alami pepaya yang segar dengan rasa pedas yang menyengat, menciptakan sensasi yang membuat penasaran.', price: 'Rp 10.000,00', imageSrc: 'Images/5.png' }
    ];

    function loadProducts() {
        const storedProducts = localStorage.getItem('dapurPepayaProducts');
        if (storedProducts) {
            products = JSON.parse(storedProducts);
        } else {
            products = initialProducts;
            localStorage.setItem('dapurPepayaProducts', JSON.stringify(products));
        }
    }

    const productsGrid = document.querySelector('.products-grid');

    function renderProducts() {
        if (!productsGrid) return;
        productsGrid.innerHTML = ''; // Clear existing products
        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.className = 'product';
            productElement.innerHTML = `
                <div class="prd-img">
                    <img src="${product.imageSrc}" alt="${product.name}">
                </div>
                <div class="prd-desc">
                    <h2 class="prd-name">${product.name}</h2>
                    <p class="prd-text">${product.description}</p>
                    <div class="prd-bottom">
                        <div class="prd-price">
                            <small>Price</small>
                            <p>${product.price}</p>
                        </div>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productElement);
        });
        addProductClickListeners();
    }

    function addProductClickListeners() {
        const productCards = document.querySelectorAll('.product');
        productCards.forEach(product => {
            product.addEventListener('click', () => {
                const currentlyOpen = document.querySelector('.prd-open');
                if (currentlyOpen && currentlyOpen !== product) {
                    currentlyOpen.classList.remove('prd-open');
                }
                product.classList.toggle('prd-open');
            });
        });
    }

    // --- Initial Load for the main page ---
    loadProducts();
    renderProducts();
});

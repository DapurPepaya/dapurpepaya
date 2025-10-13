// Navbar
const toggleBtn = document.querySelector('.toggle-btn');
const mobileToggleBtn = document.querySelector('.mobile-toggle');
const navbar = document.querySelector('.navbar');
const navItem = document.querySelectorAll('.nav-item');

toggleBtn.addEventListener('click', () => {
    if (!navbar.classList.contains('active')) {
        // Buka navbar
        navbar.classList.add('active');
        navbar.classList.remove('closing');
        toggleBtn.textContent = 'X Close';
    } else {
        // Tutup navbar
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
const homeImages = [
    "Images/1.png",
    "Images/2.png",
    "Images/3.png",
    "Images/4.png",
    "Images/5.png",
    "Images/6.png",
    "Images/7.png"
];
let currentImageIndex = 0;

homeImg.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % homeImages.length;
    homeImg.style.transform = 'scale(0.985)';
    homeImg.src = homeImages[currentImageIndex];
    setTimeout(() => {
        homeImg.style.transform = 'scale(1)';
    }, 300);
});

// Comparison
const rangeInput = document.getElementById('range');
range.oninput = () => {
    document.body.style.setProperty('--pos', range.value + '%');
}

// Product click functionality
const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.addEventListener('click', () => {
        // Close any currently open product
        const currentlyOpen = document.querySelector('.prd-open');
        if (currentlyOpen && currentlyOpen !== product) {
            currentlyOpen.classList.remove('prd-open');
        }

        // Toggle the clicked product
        product.classList.toggle('prd-open');
    });
});

function switchLocation(location) {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.map-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[onclick="switchLocation('${location}')"]`).classList.add('active');
    document.getElementById(location).classList.add('active');
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');


function toggleMobMenu() {
    mobileMenu.classList.toggle('open');
}

mobileMenuBtn.addEventListener('click', toggleMobMenu);
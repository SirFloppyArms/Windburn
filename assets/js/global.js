// MOBILE MENU TOGGLE
const toggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-menu ul');

toggle.addEventListener('click', () => {
  navList.classList.toggle('active');
});
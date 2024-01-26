const menubtn = document.querySelector('#menu-btn');
const nav = document.querySelector('.nav-links');

menubtn.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

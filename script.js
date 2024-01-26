import { createCard, showElement, hideElement, getElementValue, showAlert } from './dom.js';

const menubtn = document.querySelector('#menu-btn');
const nav = document.querySelector('.nav-links');
const gallery = document.querySelector('#courses-gallery');

async function initPage() {
  const courses = await loadCourses();

  courses.forEach((course) => {
    gallery.appendChild(createCard(course));
  });
}

const loadCourses = async () => {
  const url = 'http://localhost:3000/courses';
  const response = await fetch(url);

  if (response.ok) {
    const result = await response.json();
    return result;
  }
};

const performAction = (action, usernameId, passwordId, containerToShow, containerToHide) => {
  const username = getElementValue(usernameId);
  const password = getElementValue(passwordId);

  const storedUser = localStorage.getItem(username);

  if (
    (action === 'Registration' && storedUser) ||
    (action === 'Login' && (!storedUser || JSON.parse(storedUser).password !== password))
  ) {
    showAlert(
      action === 'Registration'
        ? 'Username already exists. Please choose a different one.'
        : 'Incorrect username or password'
    );
  } else {
    const newUser = { username, password };
    localStorage.setItem(username, JSON.stringify(newUser));
    showAlert(`${action} successful!`);
    hideElement(containerToHide);
    showElement(containerToShow);
  }
};

const toggleFormVisibility = (showContainer, hideContainer) => {
  hideElement(hideContainer);
  showElement(showContainer);
};

const login = () => performAction('Login', 'login-username', 'login-password', 'login-container', 'register-container');
const register = () =>
  performAction('Registration', 'register-username', 'register-password', 'register-container', 'login-container');
const showRegisterForm = () => toggleFormVisibility('register-container', 'login-container');
const hideRegisterForm = () => toggleFormVisibility('login-container', 'register-container');

document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  login();
});

document.getElementById('register-form').addEventListener('submit', (event) => {
  event.preventDefault();
  register();
});

menubtn.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});
document.addEventListener('DOMContentLoaded', initPage);
document.getElementById('register-button').addEventListener('click', showRegisterForm);
document.getElementById('close-register-button').addEventListener('click', hideRegisterForm);

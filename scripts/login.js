import { showElement, hideElement, getElementValue, showAlert } from './dom.js';

const performAction = (action, usernameId, passwordId, containerToShow, containerToHide) => {
  const username = getElementValue(usernameId);
  const password = getElementValue(passwordId);

  if (username === 'admin' && password === 'admin') {
    window.location.href = '/pages/add-courses.html';
    return;
  }

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

    hideElement(containerToHide);
    showElement(containerToShow);

    if (action === 'Login') {
      window.location.href = '/pages/booking.html';
    }
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

document.getElementById('register-button').addEventListener('click', showRegisterForm);
document.getElementById('close-register-button').addEventListener('click', hideRegisterForm);

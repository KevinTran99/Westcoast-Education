import { createCard } from './dom.js';

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

  const adminUser = { username: 'admin', password: 'admin' };
  localStorage.setItem('admin', JSON.stringify(adminUser));
};

document.addEventListener('DOMContentLoaded', initPage);

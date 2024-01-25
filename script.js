import { createCard } from './dom.js';
const menubtn = document.querySelector('#menu-btn');
const nav = document.querySelector('.nav-links');

const gallery = document.querySelector('#popular-courses');

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

menubtn.addEventListener('click', () => {
  nav.classList.toggle('nav-open');
});

document.addEventListener('DOMContentLoaded', initPage);

import { HttpClient } from './dom.js';

document.addEventListener('DOMContentLoaded', initPage);

function initPage() {
  const form = document.querySelector('#courseForm');
  form.addEventListener('submit', addCourse);
}

async function addCourse(e) {
  e.preventDefault();

  const courseForm = document.getElementById('courseForm');

  const coursesJson = await fetch('../courses.json');
  const existingCourses = await coursesJson.json();
  const nextId = existingCourses.courses.length + 1;

  const courseData = {
    id: nextId,
    course: courseForm.course.value,
    courseNumber: courseForm.courseNumber.value,
    duration: courseForm.duration.value,
    location: courseForm.location.value,
    imageUrl: 'placeholder.jpg',
    courseStart: courseForm.courseStart.value,
    courseEnd: courseForm.courseEnd.value,
    price: courseForm.price.value,
    description: courseForm.description.value,
  };

  saveCourse(courseData);
}

async function saveCourse(courseData) {
  const url = 'http://localhost:3000/courses/';
  const http = new HttpClient(url);

  try {
    const newCourse = await http.add(courseData);
  } catch (error) {
    console.error(error);
  }
}

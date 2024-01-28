const createCard = (course) => {
  const div = document.createElement('div');
  div.classList.add('course-image');
  div.appendChild(createImage(course.imageUrl, course.id));
  div.appendChild(createCourseInfo(course));

  return div;
};

const createImage = (imageUrl, id) => {
  const image = document.createElement('img');
  image.setAttribute('src', `/images/${imageUrl}`);
  image.setAttribute('id', id);

  return image;
};

const createCourseInfo = (course) => {
  const paragraph = document.createElement('p');
  paragraph.innerHTML = `${course.course}<br>Location: ${course.location}<br>Duration: ${course.duration}<br>Course Number: ${course.courseNumber}<br>Start Date: ${course.courseStart}<br>End Date: ${course.courseEnd}`;
  return paragraph;
};

const getElement = (elementId) => document.getElementById(elementId);

const showElement = (elementId) => {
  const element = getElement(elementId);
  if (element) element.style.display = 'block';
};

const hideElement = (elementId) => {
  const element = getElement(elementId);
  if (element) element.style.display = 'none';
};

const getElementValue = (elementId) => getElement(elementId)?.value || null;

const showAlert = (message) => alert(message);

const initializeForm = () => {
  const form = document.getElementById('course-application-form');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const paymentAddress = document.getElementById('payment-address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const courseNumber = document.getElementById('courseNumber').value;

    const formData = {
      name,
      paymentAddress,
      email,
      phone,
      courseNumber,
    };

    const existingData = JSON.parse(localStorage.getItem('courseApplications')) || [];

    const isDuplicate = existingData.some((data) => {
      return data.email === formData.email && data.courseNumber === formData.courseNumber;
    });

    if (!isDuplicate) {
      existingData.push(formData);
      localStorage.setItem('courseApplications', JSON.stringify(existingData));
      form.reset();
    } else {
      alert('This email and courseNumber combination has already been submitted.');
    }
  });
};

class HttpClient {
  #url = '';

  constructor(url) {
    this.#url = url;
  }

  async add(data) {
    try {
      const response = await fetch(this.#url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        return result;
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      throw new Error(`An error occurred in the add method: ${error}`);
    }
  }
}

export { createCard, showElement, hideElement, getElementValue, showAlert, initializeForm, HttpClient };

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
  paragraph.innerHTML = `${course.course}<br>Location: ${course.location}<br>Duration: ${course.duration}<br>Course Number: ${course.courseNumber}<br>Starts from: ${course.courseDate}`;
  return paragraph;
};

export { createCard };

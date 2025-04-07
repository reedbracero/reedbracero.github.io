const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */

const images = ['photo1.jpg', `photo2.jpg`, `photo3.jpg`, `photo4.jpg`, `photo5.jpg`];

/* Declaring the alternative text for each image file */

const text = {
  'photo1.jpg' : 'Winking Cat',
  'photo2.jpg' : 'Soft Fuzzy Cat',
  'photo3.jpg' : 'Tired Cat',
  'photo4.jpg' : 'Two Eyed Cat',
  'photo5.jpg' : 'Sleepyh Cat'
}

/* Looping through images */

for (const image of images) {
  const difPhoto = document.createElement('img');
  difPhoto.setAttribute('src', `images/${image}`);
  difPhoto.setAttribute('alt', text[image]);
  thumbBar.appendChild(difPhoto);
  difPhoto.addEventListener('click', change => {
    displayedImage.src = change.target.src;
    displayedImage.alt = change.target.alt;
  });
}

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', () => {
  const btnClick = btn.getAttribute('class');
  if (btnClick === 'dark') {
    btn.setAttribute('class','light');
    btn.textContent = 'Lighten';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
  } else {
    btn.setAttribute('class','dark');
    btn.textContent = 'Darken';
    overlay.style.backgroundColor = 'rgba(0,0,0,0)';
  }
});  

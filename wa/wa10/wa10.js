// 1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS

const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

// 2. RAW TEXT STRINGS

let storyText = 'It was 94 fahrenheit inside the house and when :insertx: tried to sleep yet they could not. When they laid down to :inserty:, they winched at the fact that there was a :insertz:. Bob laid next to them and was explaining to — :insertx: weighs 300 pounds and this was an everyday thing.'

let insetX = ['Tod tha Slob' , 'Sam with Ham', 'Rick who was not slick']
let insertY = ['watch YT shorts', 'eat in the bed', 'tried to take off their socks']
let insertZ = ['big ol bettle on the mattres', 'hole in the bed', 'stork whom tried to carry them away']

// 3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText;
    let xItem =  randomValueFromArray(insetX);
    let yItem =  randomValueFromArray(insertY);
    let zItem =  randomValueFromArray(insertZ);
    newStory = newStory.replaceAll(':insertx:',xItem);
    newStory = newStory.replaceAll(':inserty:',yItem);
    newStory = newStory.replaceAll(':insertz:',zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace('Bob', name);
  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + ' stone';
    const temperature =  Math.round((94-32) * 5/9) + ' centigrade';
    newStory = newStory.replace('94 fahrenheit', temperature).replace('300 pounds', weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible';
}

document.querySelector("html").style.backgroundColor = "pink";


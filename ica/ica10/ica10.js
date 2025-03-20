let newX = 0, newY = 0, startX = 0, startY = 0;

const card = document.getElementById('ball')

card.addEventListener('mousedown', mouseDown)

function mouseDown(e){
    startX = e.clientX
    startY = e.clientY

    document.addEventListener('mousemove', mouseMove)
    document.addEventListener('mouseup', mouseUp)
}

function mouseMove(e){
    newX = startX - e.clientX 
    newY = startY - e.clientY 
  
    startX = e.clientX
    startY = e.clientY

    card.style.top = (card.offsetTop - newY) + 'px'
    card.style.left = (card.offsetLeft - newX) + 'px'
}

function mouseUp(e){
    document.removeEventListener('mousemove', mouseMove)
}

console.log('Hello World');
alert('This circle is movable! There is also a cat function!');
let button = document.querySelector('button');
btn.addEvenListener('click', updateName)

function updateName() {
   // console.log('Test');
    let name = document.querySelector('.name');
    const input = prompt('Enter a new name!');
    name.textContent = input;
}


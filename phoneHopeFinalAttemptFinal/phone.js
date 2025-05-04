const deployHookBtn = document.getElementById('deployHook');
const hookZone = document.getElementById('hookZone');
const savedNumbers = document.getElementById('savedNumbers');
const movingNumbers = document.getElementById('movingNumbers');
const hookLine = document.getElementById('hookLine');
const ctx = hookLine.getContext('2d');

let hookDeployed = false;
let phoneDigits = [];
let fishes = [];

let mouseX = 0;
let mouseY = 0;

const fishIndex = {
'blob fish.png': 0,
'green fish.webp': 1,
'orange fish.png': 2,
'red fish.png': 3,
'congo fish.png': 4,
'gold fish.png': 5,
'blue fish.png': 6,
'purple fish.webp': 7,
'yellow fish.png': 8,
'silver fish.png': 9
};

function resizeCanvas() {
  hookLine.width = window.innerWidth;
  hookLine.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function drawLine() {
  ctx.clearRect(0, 0, hookLine.width, hookLine.height);

  if (hookDeployed) {
    const btnRect = deployHookBtn.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(mouseX, mouseY);
    ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 6;
    ctx.stroke();
  }

  requestAnimationFrame(drawLine);
}
drawLine();

deployHookBtn.addEventListener('click', () => {
  hookDeployed = true;
  document.body.classList.add('hookCursor');
});

function createPhoneBoxes() {
  savedNumbers.innerHTML = '';

  for (let i = 0; i < 10; i++) {
    const box = document.createElement('div');
    box.classList.add('numberBox');
    savedNumbers.appendChild(box);

    if (i === 2 || i === 5) {
      const dash = document.createElement('div');
      dash.classList.add('dash');
      dash.textContent = '-';
      savedNumbers.appendChild(dash);
    }
  }
}

function updatePhoneBoxes() {
  const boxes = document.querySelectorAll('.numberBox');
  phoneDigits.forEach((digit, index) => {
    if (boxes[index]) {
      boxes[index].textContent = digit;
    }
  });
}

function createMovingNumber(num, fishFile) {
  const number = document.createElement('div');
  number.classList.add('number');
  number.style.backgroundImage = `url('fish/${fishFile}')`;

  let posX = Math.random() * (movingNumbers.clientWidth - 50);
  let posY = Math.random() * (movingNumbers.clientHeight - 50);
  number.style.top = posY + 'px';
  number.style.left = posX + 'px';

  const speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
  const speedY = (Math.random() * 2 - 1);

  number.addEventListener('click', () => {
    if (hookDeployed && phoneDigits.length < 10) {
      phoneDigits.push(num);
      updatePhoneBoxes();
  
      hookDeployed = false;
      document.body.classList.remove('hookCursor');
    }
  });
  

  movingNumbers.appendChild(number);
  fishes.push({ element: number, posX, posY, speedX, speedY });
}

function animateFish() {
  fishes.forEach(fish => {
    fish.posX += fish.speedX;
    fish.posY += fish.speedY;

    if (fish.posX < 0 || fish.posX > movingNumbers.clientWidth - 50) {
      fish.speedX *= -1;
    }
    if (fish.posY < 0 || fish.posY > movingNumbers.clientHeight - 50) {
      fish.speedY *= -1;
    }

    fish.element.style.left = fish.posX + 'px';
    fish.element.style.top = fish.posY + 'px';
  });

  requestAnimationFrame(animateFish);
}


createPhoneBoxes();

Object.keys(fishIndex).forEach(fishFile => {
  const digit = fishIndex[fishFile];
  createMovingNumber(digit, fishFile);
});

animateFish();

function createSharkFish() {
    const shark = document.createElement('div');
    shark.classList.add('number');
    shark.style.backgroundImage = `url('fish/shark fish.png')`;
  
    let posX = Math.random() * (movingNumbers.clientWidth - 50);
    let posY = Math.random() * (movingNumbers.clientHeight - 50);
    shark.style.top = posY + 'px';
    shark.style.left = posX + 'px';
  
    const speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const speedY = (Math.random() * 2 - 1);
  
    shark.addEventListener('click', () => {
      if (hookDeployed) {
        phoneDigits = [];
        createPhoneBoxes();
        hookDeployed = false;
        document.body.classList.remove('hookCursor');
      }
    });
  
    movingNumbers.appendChild(shark);
    fishes.push({ element: shark, posX, posY, speedX, speedY });
  }

  createSharkFish();

  function createStarFish() {
    const star = document.createElement('div');
    star.classList.add('number');
    star.style.backgroundImage = `url('fish/star fish.webp')`;
  
    let posX = Math.random() * (movingNumbers.clientWidth - 100);
    let posY = Math.random() * (movingNumbers.clientHeight - 100);
    star.style.top = posY + 'px';
    star.style.left = posX + 'px';
  
    const speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const speedY = (Math.random() * 2 - 1);
  
    star.addEventListener('click', () => {
      if (hookDeployed && phoneDigits.length === 10) {
        const formatted = `${phoneDigits.slice(0, 3).join('')}-${phoneDigits.slice(3, 6).join('')}-${phoneDigits.slice(6).join('')}`;
        alert(`You submitted: ${formatted}`);
        hookDeployed = false;
        document.body.classList.remove('hookCursor');
      } else if (hookDeployed) {
        alert('You need 10 digits before submitting!');
        hookDeployed = false;
        document.body.classList.remove('hookCursor');
      }
    });
  
    movingNumbers.appendChild(star);
    fishes.push({ element: star, posX, posY, speedX, speedY });
  }
  
  createStarFish(); 


const deployHookBtn = document.getElementById('deploy-hook');
const hookZone = document.getElementById('hook-zone');
const savedNumbers = document.getElementById('saved-numbers');
const movingNumbers = document.getElementById('moving-numbers');
const hookLine = document.getElementById('hook-line');
const ctx = hookLine.getContext('2d');

let hookDeployed = false;
let phoneDigits = [];

let fishes = [];

let mouseX = 0;
let mouseY = 0;

// Resize canvas
function resizeCanvas() {
    hookLine.width = window.innerWidth;
    hookLine.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Draw hook line
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

// Deploy hook
deployHookBtn.addEventListener('click', () => {
    hookDeployed = true;
    document.body.classList.add('hook-cursor');
});

// Create phone boxes
function createPhoneBoxes() {
    savedNumbers.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        const box = document.createElement('div');
        box.classList.add('number-box');
        savedNumbers.appendChild(box);

        if (i === 2 || i === 5) {
            const dash = document.createElement('div');
            dash.classList.add('dash');
            dash.textContent = '-';
            savedNumbers.appendChild(dash);
        }
    }
}

// Update filled numbers
function updatePhoneBoxes() {
    const boxes = document.querySelectorAll('.number-box');
    phoneDigits.forEach((digit, index) => {
        if (boxes[index]) {
            boxes[index].textContent = digit;
        }
    });
}

function createMovingNumber(num, fishType = null) {
    const number = document.createElement('div');
    number.classList.add('number');

    // Only pick a random fish if fishType is not provided
    if (!fishType) {
        fishType = Math.random() < 0.5 ? "blue fish.png" : "red snapper.png";
    }
    number.style.backgroundImage = `url('${fishType}')`;

    // Random starting position
    let posX = Math.random() * (movingNumbers.clientWidth - 50);
    let posY = Math.random() * (movingNumbers.clientHeight - 50);
    number.style.top = posY + 'px';
    number.style.left = posX + 'px';

    // Random velocity
    const speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const speedY = (Math.random() * 2 - 1);

    // Add number label
    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.color = 'white';
    label.style.fontSize = '20px';
    label.style.fontWeight = 'bold';
    label.style.textShadow = '1px 1px 2px black';
    label.textContent = num;
    number.appendChild(label);

    number.addEventListener('click', () => {
        if (hookDeployed && phoneDigits.length < 10) {
            phoneDigits.push(num);
            updatePhoneBoxes();
            number.remove();

            // Remove from fish array
            fishes = fishes.filter(f => f.element !== number);

            // 🛠 Spawn another fish of same type
            createMovingNumber(num, fishType);

            hookDeployed = false;
            document.body.classList.remove('hook-cursor');
        }
    });

    movingNumbers.appendChild(number);

    fishes.push({ element: number, posX, posY, speedX, speedY });
}


// Animate fish swimming
function animateFish() {
    fishes.forEach(fish => {
        fish.posX += fish.speedX;
        fish.posY += fish.speedY;

        // Bounce off walls
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

// Initialize
createPhoneBoxes();
for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < 5; j++) {
        createMovingNumber(i);
    }
}
animateFish(); // 🛠 start swimming

// Reset phone number
const resetPhoneBtn = document.getElementById('reset-phone');
resetPhoneBtn.addEventListener('click', () => {
    phoneDigits = [];
    createPhoneBoxes();
});

const deployHookBtn = document.getElementById('deploy-hook');
const hookZone = document.getElementById('hook-zone');
const savedNumbers = document.getElementById('saved-numbers');
const movingNumbers = document.getElementById('moving-numbers');
const hookLine = document.getElementById('hook-line');
const ctx = hookLine.getContext('2d');

let hookDeployed = false;
let phoneDigits = [];

// For mouse position tracking
let mouseX = 0;
let mouseY = 0;

// Resize canvas to always match window
function resizeCanvas() {
    hookLine.width = window.innerWidth;
    hookLine.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate the hook line
function drawLine() {
    ctx.clearRect(0, 0, hookLine.width, hookLine.height);

    if (hookDeployed) {
        const btnRect = deployHookBtn.getBoundingClientRect();
        const startX = btnRect.left + btnRect.width / 2;
        const startY = btnRect.top + btnRect.height / 2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = 'red'; // Hook line color
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    requestAnimationFrame(drawLine);
}
drawLine(); // Start the drawing loop

// Deploy hook
deployHookBtn.addEventListener('click', () => {
    hookDeployed = true;
    document.body.classList.add('hook-cursor');
});

// Create boxes for phone number
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

// Update filled phone number
function updatePhoneBoxes() {
    const boxes = document.querySelectorAll('.number-box');
    phoneDigits.forEach((digit, index) => {
        if (boxes[index]) {
            boxes[index].textContent = digit;
        }
    });
}

// Create a moving fish
function createMovingNumber(num) {
    const number = document.createElement('div');
    number.classList.add('number');

    // Randomly choose blue fish or red snapper
    const fishType = Math.random() < 0.5 ? "blue fish.png" : "red snapper.png";
    number.style.backgroundImage = `url('${fishType}')`;

    number.style.top = Math.random() * (movingNumbers.clientHeight - 50) + 'px';
    number.style.left = Math.random() * (movingNumbers.clientWidth - 50) + 'px';

    const moveInterval = setInterval(() => {
        number.style.top = Math.random() * (movingNumbers.clientHeight - 50) + 'px';
        number.style.left = Math.random() * (movingNumbers.clientWidth - 50) + 'px';
    }, 1500);

    number.addEventListener('click', () => {
        if (hookDeployed && phoneDigits.length < 10) {
            phoneDigits.push(num);
            updatePhoneBoxes();
            number.remove();
            clearInterval(moveInterval);
            createMovingNumber(num);

            hookDeployed = false;
            document.body.classList.remove('hook-cursor');
        }
    });

    movingNumbers.appendChild(number);
}

// Initialize
createPhoneBoxes();
for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < 5; j++) {
        createMovingNumber(i);
    }
}

// Reset phone number
const resetPhoneBtn = document.getElementById('reset-phone');
resetPhoneBtn.addEventListener('click', () => {
    phoneDigits = [];
    createPhoneBoxes();
});

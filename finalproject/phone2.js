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

// -------------------------
// (Your other code below this)
// -------------------------

deployHookBtn.addEventListener('click', () => {
    hookDeployed = true;
    document.body.classList.add('hook-cursor');
});

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

function updatePhoneBoxes() {
    const boxes = document.querySelectorAll('.number-box');
    phoneDigits.forEach((digit, index) => {
        if (boxes[index]) {
            boxes[index].textContent = digit;
        }
    });
}

function createMovingNumber(num) {
    const number = document.createElement('div');
    number.classList.add('number');
    number.textContent = num;

    number.style.top = Math.random() * (movingNumbers.clientHeight - 40) + 'px';
    number.style.left = Math.random() * (movingNumbers.clientWidth - 40) + 'px';

    const moveInterval = setInterval(() => {
        number.style.top = Math.random() * (movingNumbers.clientHeight - 40) + 'px';
        number.style.left = Math.random() * (movingNumbers.clientWidth - 40) + 'px';
    }, 1500);

    number.addEventListener('click', () => {
        if (hookDeployed && phoneDigits.length < 10) {
            phoneDigits.push(num);
            updatePhoneBoxes();
            number.remove();
            clearInterval(moveInterval);
            createMovingNumber(num);
    
            // Disable hook after catching
            hookDeployed = false;
            document.body.classList.remove('hook-cursor');
        }
    });
    

    movingNumbers.appendChild(number);
}

// Initialize everything
createPhoneBoxes();
for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < 5; j++) {
        createMovingNumber(i);
    }
}

const resetPhoneBtn = document.getElementById('reset-phone');

resetPhoneBtn.addEventListener('click', () => {
    phoneDigits = []; // Clear saved digits
    createPhoneBoxes(); // Recreate empty boxes
});

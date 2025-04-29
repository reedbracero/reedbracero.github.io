/* const deployHookBtn = document.getElementById('deployHook');
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

function createMovingNumber(num, fishType = null) {
    const number = document.createElement('div');
    number.classList.add('number');

    if (!fishType) {
        fishType = Math.random() < 0.5 ? "blue fish.png" : "red snapper.png";
    }
    number.style.backgroundImage = `url('${fishType}')`;

    let posX = Math.random() * (movingNumbers.clientWidth - 50);
    let posY = Math.random() * (movingNumbers.clientHeight - 50);
    number.style.top = posY + 'px';
    number.style.left = posX + 'px';

    const speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    const speedY = (Math.random() * 2 - 1);

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
            fishes = fishes.filter(f => f.element !== number);
            createMovingNumber(num, fishType);
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
for (let i = 0; i <= 9; i++) {
    for (let j = 0; j < 5; j++) {
        createMovingNumber(i);
    }
}
animateFish();

const resetPhoneBtn = document.getElementById('resetPhone');
resetPhoneBtn.addEventListener('click', () => {
    phoneDigits = [];
    createPhoneBoxes();
}); */


/* second one
var a = document.getElementById('deployHook');
var b = document.getElementById('hookZone');
var savedNumbers = document.querySelector('#savedNumbers');
var c = document.getElementById('movingNumbers');
var d = document.getElementById('hookLine');
var ctx = d.getContext('2d');

var hookDeployed = false;
var phoneDigits = [];
var fishes = [];

var x = 0;
var y = 0;

function resizeCanvas() {
d.width = window.innerWidth;
    d.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// track mouse
document.addEventListener('mousemove', function(e){
x = e.clientX;
y = e.clientY;
});

function drawLine(){
ctx.clearRect(0, 0, d.width, d.height);
    if(hookDeployed){
    var rect = a.getBoundingClientRect();
var sx = rect.left + rect.width / 2;
var sy = rect.top + rect.height / 2;

    ctx.beginPath();
    ctx.moveTo(sx, sy);
ctx.lineTo(x, y);
ctx.strokeStyle = 'yellow';
    ctx.lineWidth = 6;
ctx.stroke();
    }
requestAnimationFrame(drawLine);
}
drawLine();

a.addEventListener('click', function(){
    hookDeployed = true;
    document.body.classList.add('hookCursor'); // adds the cursor
});

// create number boxes
function createPhoneBoxes(){
    savedNumbers.innerHTML = '';
    for(var i=0;i<10;i++){
        var box = document.createElement('div');
box.classList.add('numberBox');
savedNumbers.appendChild(box);

if(i==2 || i==5){
    var dash = document.createElement('div');
    dash.classList.add('dash');
    dash.innerText = '-';
    savedNumbers.appendChild(dash);
}
    }
}

function updatePhoneBoxes(){
    var boxes = document.getElementsByClassName('numberBox');
    for(var i=0;i<phoneDigits.length;i++){
        boxes[i].innerText = phoneDigits[i];
    }
}

function createMovingNumber(num, fishType){
    var n = document.createElement('div');
    n.className = 'number';

    if(!fishType){
        if(Math.random() < 0.5){
            fishType = "blue fish.png";
        } else {
            fishType = "red snapper.png";
        }
    }
    n.style.backgroundImage = "url('" + fishType + "')";
    var posX = Math.random() * (c.clientWidth - 50);
    var posY = Math.random() * (c.clientHeight - 50);
    n.style.position = 'absolute';
    n.style.top = posY + 'px';
    n.style.left = posX + 'px';

    var speedX = (Math.random()*2 + 1)*(Math.random() < 0.5 ? 1 : -1);
    var speedY = (Math.random()*2 - 1);

    var label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.color = 'white';
    label.style.fontSize = '20px';
    label.style.fontWeight = 'bold';
    label.style.textShadow = '1px 1px 2px black';
    label.innerText = num;
    label.style.backgroundColor = 'rgba(0,0,0,0.3)';
    n.appendChild(label);

    n.addEventListener('click', function(){
        if(hookDeployed && phoneDigits.length < 10){
            phoneDigits.push(num);
            updatePhoneBoxes();
            n.remove();
            for(var i=0;i<fishes.length;i++){
                if(fishes[i].element == n){
                    fishes.splice(i,1);
                    break;
                }
            }
            createMovingNumber(num, fishType);
            hookDeployed = false;
            document.body.classList.remove('hookCursor');
        }
    });

    c.appendChild(n);
    fishes.push({element:n, posX:posX, posY:posY, speedX:speedX, speedY:speedY});
}

function animateFish(){
    for(var i=0;i<fishes.length;i++){
        var fish = fishes[i];
        fish.posX += fish.speedX;
        fish.posY += fish.speedY;

        if(fish.posX < 0 || fish.posX > c.clientWidth - 50){
            fish.speedX *= -1;
        }
        if(fish.posY < 0 || fish.posY > c.clientHeight - 50){
            fish.speedY *= -1;
        }

        fish.element.style.left = fish.posX + 'px';
        fish.element.style.top = fish.posY + 'px';
    }
    requestAnimationFrame(animateFish);
}

// init
createPhoneBoxes();
// instead of a loop, beginner might do this manually
createMovingNumber(0); createMovingNumber(0); createMovingNumber(0); createMovingNumber(0); createMovingNumber(0);
createMovingNumber(1); createMovingNumber(1); createMovingNumber(1); createMovingNumber(1); createMovingNumber(1);
createMovingNumber(2); createMovingNumber(2); createMovingNumber(2); createMovingNumber(2); createMovingNumber(2);
createMovingNumber(3); createMovingNumber(3); createMovingNumber(3); createMovingNumber(3); createMovingNumber(3);
createMovingNumber(4); createMovingNumber(4); createMovingNumber(4); createMovingNumber(4); createMovingNumber(4);
createMovingNumber(5); createMovingNumber(5); createMovingNumber(5); createMovingNumber(5); createMovingNumber(5);
createMovingNumber(6); createMovingNumber(6); createMovingNumber(6); createMovingNumber(6); createMovingNumber(6);
createMovingNumber(7); createMovingNumber(7); createMovingNumber(7); createMovingNumber(7); createMovingNumber(7);
createMovingNumber(8); createMovingNumber(8); createMovingNumber(8); createMovingNumber(8); createMovingNumber(8);
createMovingNumber(9); createMovingNumber(9); createMovingNumber(9); createMovingNumber(9); createMovingNumber(9);

animateFish();

var resetPhoneBtn = document.querySelector('#resetPhone');
resetPhoneBtn.addEventListener('click', function(){
    phoneDigits = [];
    createPhoneBoxes();
});
*/ 
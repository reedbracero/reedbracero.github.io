var deployHookBtn = document.getElementById('deployHook');
var hookZone = document.getElementById('hookZone');
var savedNumbers = document.getElementById('savedNumbers');
var movingNumbers = document.getElementById('movingNumbers');
var hookLine = document.getElementById('hookLine');
var ctx = hookLine.getContext('2d');

var hookDeployed = false;
var phoneDigits = [];
var fishes = [];

var mouseX = 0;
var mouseY = 0;

function resizeCanvas() {
    hookLine.width = window.innerWidth;
hookLine.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

document.addEventListener('mousemove', function(e) {
mouseX = e.clientX;
    mouseY = e.clientY;
});

function drawLine() {
    ctx.clearRect(0, 0, hookLine.width, hookLine.height);

if(hookDeployed){
        var btnRect = deployHookBtn.getBoundingClientRect();
        var startX = btnRect.left + btnRect.width / 2;
    var startY = btnRect.top + btnRect.height / 2;

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

deployHookBtn.addEventListener('click', function(){
    hookDeployed = true;
    document.body.classList.add('hookCursor');
});

function createPhoneBoxes() {
savedNumbers.innerHTML = '';

    for (var i = 0; i < 10; i++) {
        var box = document.createElement('div');
        box.classList.add('numberBox');
        savedNumbers.appendChild(box);

        if (i === 2 || i === 5) {
            var dash = document.createElement('div');
            dash.classList.add('dash');
            dash.textContent = '-';
            savedNumbers.appendChild(dash);
        }
    }
}

function updatePhoneBoxes() {
    var boxes = document.getElementsByClassName('numberBox');
    for (var i = 0; i < phoneDigits.length; i++) {
        boxes[i].textContent = phoneDigits[i];
    }
}

function createMovingNumber(num, fishType) {
    var number = document.createElement('div');
    number.className = 'number';

    if (!fishType) {
        if (Math.random() < 0.5) {
            fishType = "blue fish.png";
        } else {
            fishType = "red snapper.png";
        }
    }

    number.style.backgroundImage = "url('" + fishType + "')";
    number.style.position = 'absolute';

    var posX = Math.random() * (movingNumbers.clientWidth - 50);
    var posY = Math.random() * (movingNumbers.clientHeight - 50);
    number.style.left = posX + 'px';
    number.style.top = posY + 'px';

    var speedX = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    var speedY = (Math.random() * 2 - 1);

    var label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.color = 'white';
    label.style.fontSize = '20px';
    label.style.fontWeight = 'bold';
    label.style.textShadow = '1px 1px 2px black';
    label.textContent = num;
    label.style.backgroundColor = 'rgba(0,0,0,0.25)';
    number.appendChild(label);

    number.addEventListener('click', function() {
        if (hookDeployed && phoneDigits.length < 10) {
            phoneDigits.push(num);
            updatePhoneBoxes();
            number.remove();

            for (var i = 0; i < fishes.length; i++) {
                if (fishes[i].element === number) {
                    fishes.splice(i, 1);
                    break;
                }
            }

            createMovingNumber(num, fishType);
            hookDeployed = false;
            document.body.classList.remove('hookCursor');
        }
    });

    movingNumbers.appendChild(number);
    fishes.push({ element: number, posX: posX, posY: posY, speedX: speedX, speedY: speedY });
}

function animateFish() {
    for (var i = 0; i < fishes.length; i++) {
        var fish = fishes[i];
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
    }

    requestAnimationFrame(animateFish);
}

createPhoneBoxes();

for (var i = 0; i <= 9; i++) {
    for (var j = 0; j < 5; j++) {
        createMovingNumber(i);
    }
}

animateFish();

var resetPhoneBtn = document.getElementById('resetPhone');
resetPhoneBtn.addEventListener('click', function() {
    phoneDigits = [];
    createPhoneBoxes();
});


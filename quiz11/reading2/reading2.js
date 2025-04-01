function startCountdown() {
    const output = document.querySelector('.count'); 

    let i = 10; 

    while (i >= 0) { 
        const para = document.createElement('p'); 
        
        if (i === 10) {
            para.textContent = `Countdown ${i}`;
        } else if (i === 0) {
            para.textContent = 'Blast off!';
        } else {
            para.textContent = i;
        }

        output.appendChild(para); 
        i--; 
    }
}

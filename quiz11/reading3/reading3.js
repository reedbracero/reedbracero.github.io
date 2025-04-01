function squared(num) {
    return num * num;
  }
  
  function cubed(num) {
    return num * num * num;
  }
  
  function factorial(num) {
    if (num < 0) return undefined;
    if (num === 0) return 1;
    let x = num - 1;
    while (x > 1) {
      num *= x;
      x--;
    }
    return num;
  }
 function divide(num) {
    return num / 2;
 }

 function add(num) {
    return num + num;
 }

  input.addEventListener("change", () => {
    const num = parseFloat(input.value);
    if (isNaN(num)) {
      para.textContent = "You need to enter a number!";
    } else {
      para.textContent = `${num} squared is ${squared(num)}. `;
      para.textContent += `${num} cubed is ${cubed(num)}. `;
      para.textContent += `${num} factorial is ${factorial(num)}. `;
      para.textContent += `${num} divided by 2 is ${divide(num)}. `;
      para.textContent += `${num} added to itself is ${add(num)}. `;
    }
  });
  
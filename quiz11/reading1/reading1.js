const select = document.querySelector("select");
const html = document.querySelector("html");
document.body.style.padding = "10px";

function update(bgColor, textColor) {
  html.style.backgroundColor = bgColor;
  html.style.color = textColor;
}

select.addEventListener('change', () => {
    const choice = select.value;
  
    switch(choice) {
      case 'black':
        update('black','white');
        break;
      case 'white':
        update('white','black');
        break;
      case 'SpiderMan':
        update('red','blue');
        break;
      case 'yellow':
        update('yellow','purple');
        break;
      case 'psychedelic':
        update('lime','purple');
        break;
        case 'apple':
            update('grey','silver');
            break;
    }
  });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.body;
let interval = null;

startBtn.addEventListener('click', clickStart);
stopBtn.addEventListener('click', clickStop);

function clickStart() {
  startBtn.setAttribute('disabled', 'disabled');
  stopBtn.removeAttribute('disabled', 'disabled');
  interval = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function clickStop() {
  stopBtn.setAttribute('disabled', 'disabled');
  startBtn.removeAttribute('disabled', 'disabled');
  clearInterval(interval);
}

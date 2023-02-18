const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let colorChangeInterval;

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const onStart = e => {
  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
};
const onStop = e => {
  clearInterval(colorChangeInterval);
  startBtn.disabled = false;
};

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let colorChangeInterval;

const getRandomHexColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

const onStart = () => {
  colorChangeInterval = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
};
const onStop = () => {
  clearInterval(colorChangeInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
};

stopBtn.disabled = true;
startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('span[data-days]'),
  timerHrs: document.querySelector('span[data-hours]'),
  timerMins: document.querySelector('span[data-minutes]'),
  timerSecs: document.querySelector('span[data-seconds]'),
};

let endDate;
let timer;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (Date.now() >= selectedDates[0]) {
      return Notify.failure('Please choose a date in the future');
    }
    endDate = selectedDates[0];

    refs.startBtn.disabled = false;
  },
};

const onTimerStart = () => {
  refs.startBtn.disabled = true;
  timer = setInterval(timerHandler, 1000);
};

const timerHandler = () => {
  const timeDelta = endDate - Date.now();
  if (timeDelta <= 0) {
    clearInterval(timer);
    return Notify.success('Time’s up');
  }
  const { days, hours, minutes, seconds } = convertMs(endDate - Date.now());
  refs.timerDays.textContent = days < 10 ? addLeadingZero(days) : days;
  refs.timerHrs.textContent = hours < 10 ? addLeadingZero(hours) : hours;
  refs.timerMins.textContent = minutes < 10 ? addLeadingZero(minutes) : minutes;
  refs.timerSecs.textContent = seconds < 10 ? addLeadingZero(seconds) : seconds;
};

const convertMs = ms => {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

const addLeadingZero = value => {
  return value.toString().padStart(2, '0');
};

flatpickr(refs.datePicker, options);
refs.startBtn.disabled = true;
refs.startBtn.addEventListener('click', onTimerStart);

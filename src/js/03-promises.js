import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');
const submitBtn = document.querySelector('button[type="submit"]');

function onFormSubmit(e) {
  e.preventDefault();
  submitBtn.disabled = true;
  let delay = Number(e.currentTarget.elements.delay.value);
  const delayStep = Number(e.currentTarget.elements.step.value);
  const amount = Number(e.currentTarget.elements.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    if (i === amount) {
      setTimeout(() => (submitBtn.disabled = false), delay);
    }
    delay += delayStep;
  }
}

function createPromise(position, delay) {
  const result = { position, delay };
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(result);
      } else {
        reject(result);
      }
    }, delay);
  });
}

form.addEventListener('submit', onFormSubmit);

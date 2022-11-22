import Notiflix from 'notiflix';

const refs = {
  formRef: document.querySelector('.form'),
  delayRef: document.querySelector('input[name="delay"]'),
  stepRef: document.querySelector('input[name="step"]'),
  amountRef: document.querySelector('input[name="amount"]'),
  submitBtn: document.querySelector('button'),
};

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

refs.formRef.addEventListener('submit', event => {
  event.preventDefault();

  let delay = Number(refs.delayRef.value);
  let step = Number(refs.stepRef.value);
  let amount = Number(refs.amountRef.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => {
        refs.formRef.reset();
      });
    delay += step;
  }
});

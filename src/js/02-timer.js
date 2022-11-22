import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const runBtn = document.querySelector('[data-start]');

const refs = {
  dd: document.querySelector('[data-days]'),
  hh: document.querySelector('[data-hours]'),
  mm: document.querySelector('[data-minutes]'),
  ss: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = new Date();
    if (selectedDates[0] <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      runBtn.setAttribute('disabled', 'disabled');
    } else {
      runBtn.removeAttribute('disabled', 'disabled');
    }
  },
};

const calendar = flatpickr('#datetime-picker', options);

runBtn.addEventListener('click', clickRun);

class Timer {
  constructor({ onUpdate }) {
    this.interval = null;
    this.isActive = false;
    this.onUpdate = onUpdate;
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = calendar.selectedDates[0];
    this.isActive = true;

    this.interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.convertMs(deltaTime);
      this.onUpdate(time);

      if (deltaTime < 1000) {
        clearInterval(this.interval);
        this.isActive = false;
      }
    }, 1000);
  }
}

const timer = new Timer({
  onUpdate: updateValue,
});

function clickRun() {
  timer.start();
}

function updateValue({ days, hours, minutes, seconds }) {
  refs.dd.textContent = `${days}`;
  refs.hh.textContent = `${hours}`;
  refs.mm.textContent = `${minutes}`;
  refs.ss.textContent = `${seconds}`;
}

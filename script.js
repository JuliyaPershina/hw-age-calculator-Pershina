const dayInput = document.getElementById('input-day');
const monthInput = document.getElementById('input-month');
const yearInput = document.getElementById('input-year');

dayInput.addEventListener('blur', () => validateDay(dayInput));
monthInput.addEventListener('blur', () => validateMonth(monthInput));
yearInput.addEventListener('blur', () => validateYear(yearInput));

function validateDay(input) {
  const value = +input.value;
  if (!(value >= 1 && value <= 31)) {
    showError(input, 'Must be a valid day');
    return false;
  }
  clearError(input);
  return true;
}

function validateMonth(input) {
  const value = +input.value;
  if (!(value >= 1 && value <= 12)) {
    showError(input, 'Must be a valid month');
    return false;
  }
  clearError(input);
  return true;
}

function validateYear(input) {
  const value = +input.value;
  const currentYear = new Date().getFullYear();
  if (!(value <= currentYear)) {
    showError(input, 'Must be in the past');
    return false;
  }
  clearError(input);
  return true;
}
function showError(inputEl, message) {
  const formElement = inputEl.closest('.form-element');
  formElement.classList.add('error');
  formElement.querySelector('.error-text').textContent = message;
}

function clearError(inputEl) {
  const formElement = inputEl.closest('.form-element');
  formElement.classList.remove('error');
  formElement.querySelector('.error-text').textContent = '';
}
const form = document.querySelector('.age-calculator__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const isDayValid = validateDay(dayInput);
  const isMonthValid = validateMonth(monthInput);
  const isYearValid = validateYear(yearInput);

  const day = +dayInput.value;
  const month = +monthInput.value;
  const year = +yearInput.value;

  // Перевірка, чи дата існує
  const userDate = new Date(year, month - 1, day);
  const isValidDate =
    userDate.getDate() === day &&
    userDate.getMonth() === month - 1 &&
    userDate.getFullYear() === year;

  // Перевірка, чи кожне поле заповнене
  const isDayEmpty = !dayInput.value.trim();
  const isMonthEmpty = !monthInput.value.trim();
  const isYearEmpty = !yearInput.value.trim();

  if (!isDayValid || !isMonthValid || !isYearValid || !isValidDate) {
    if (isDayEmpty) {
      showError(dayInput, 'This field is required');
    }
    if (isMonthEmpty) {
      showError(monthInput, 'This field is required');
    }
    if (isYearEmpty) {
      showError(yearInput, 'This field is required');
    }

    // Якщо всі поля заповнені, але дата невалідна
    if (!isDayEmpty && !isMonthEmpty && !isYearEmpty && !isValidDate) {
      showError(dayInput, 'Invalid date');
      showError(monthInput, '');
      showError(yearInput, '');
    }

    return;
  }

  const today = new Date();

  let years = today.getFullYear() - userDate.getFullYear();
  let months = today.getMonth() - userDate.getMonth();
  let days = today.getDate() - userDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  document.querySelector('.result-year').textContent = `${years}`;
  document.querySelector('.result-month').textContent = `${months}`;
  document.querySelector('.result-days').textContent = `${days}`;
});
  
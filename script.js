const form = document.querySelector('.age-calculator__form');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const day = document.getElementById('input-day').value;
  const month = document.getElementById('input-month').value;
  const year = document.getElementById('input-year').value;

  const userDate = new Date(year, month, day);
  const today = new Date();

  let years = today.getFullYear() - userDate.getFullYear();
  let months = today.getMonth() + 1 - userDate.getMonth();
  let days = today.getDate() - userDate.getDate();

  // Коригування, якщо день не настав ще цього місяця
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  // Коригування, якщо місяць ще не настав у цьому році
  if (months < 0) {
    years--;
    months += 12;
    }
    
    document.querySelector('.result-year').textContent = `${years}`;
    document.querySelector('.result-month').textContent = `${months}`;
    document.querySelector('.result-days').textContent = `${days}`;

  console.log(`Результат: ${years} років, ${months} місяців, ${days} днів`);

});


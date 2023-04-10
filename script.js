let timerId = null;
let timeLeft = 15;
let isTimerFinished = false;
const form = document.querySelector('form');
const table = document.querySelector('table');


function startTimer() {
    const timerElem = document.getElementById('timer');
    const resultsElem = document.getElementById('results');
    let timeLeft = 15;
    timerElem.textContent = `Времени до окончания: ${timeLeft} сек.`;
    timerId = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) {
            clearInterval(timerId);
            timerElem.textContent = 'Время вышло!';
            isTimerFinished = true; // устанавливаем флаг в значение true
            if (!resultsElem.textContent) {
                const lastPrice = parseFloat(table.rows[1].cells[1].textContent);
                const lastUser = table.rows[1].cells[0].textContent;
                resultsElem.textContent = `Торги окончены. Победитель - ${lastUser} с лучшей предложенной ценой ${lastPrice} рублей.`;
                form.style.display = 'none';
            }
        } else {
            timerElem.textContent = `Времени до окончания: ${timeLeft} сек.`;
        }
    }, 1000);
}


function resetTimer() {
    clearInterval(timerId);
    isTimerFinished = false; // сбрасываем флаг при сбросе таймера
}

startTimer();


form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (isTimerFinished) { // проверяем значение флага
        alert('Торги окончены, нельзя добавлять новые заявки!');
        return;
    }
    const itemName = "Вы";
    const price = parseFloat(document.querySelector('#price').value);
    const lastPrice = parseFloat(table.rows[1].cells[1].textContent);
    const lastUser = table.rows[1].cells[0].textContent;
    if (itemName === lastUser) {
        alert('Ваше предложении и так последнее');
        return;
    } 
    if (price > lastPrice || table.rows.length === 1) {
        const row = table.insertRow(1);
        const itemNameCell = row.insertCell(0);
        const priceCell = row.insertCell(1);
        const timeCell = row.insertCell(2);
        itemNameCell.textContent = itemName;
        priceCell.textContent = price;
        timeCell.textContent = new Date().toLocaleTimeString();
        form.reset();
        resetTimer();
        startTimer();
    } else {
        alert(`Ваша цена должна быть больше ${lastPrice}`);
    }
});

setTimeout(addPersonToTable, 10000);
setTimeout(addPersonToTable, 15000);
setTimeout(addPersonToTable, 25000);

function addPersonToTable() {
    if (isTimerFinished) { // проверяем значение флага
        return;
    }
    const table = document.querySelector('table');
    const lastPrice = parseFloat(table.rows[1].cells[1].textContent);
    const price = lastPrice + Math.floor(Math.random() * 5000);
    const row = table.insertRow(1);
    const itemNameCell = row.insertCell(0);
    const priceCell = row.insertCell(1);
    const timeCell = row.insertCell(2);
    itemNameCell.textContent = "user_id" + Math.floor(Math.random() * 5000);
    priceCell.textContent = price;
    timeCell.textContent = new Date().toLocaleTimeString(); 
    resetTimer();
    startTimer();
}
  


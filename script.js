let timer;
let timeElapsed = 0;
let isRunning = false;
const restTime = 135; // 2m15

const timerDisplay = document.getElementById('display');
const timerBody = document.getElementById('body');

function initTimer() {
    timeElapsed = 0;
    updateDisplay();
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeElapsed);
}

function startTimer() {
    if (isRunning) stopTimer();
    timerBody.classList.remove('blinking');
    timeElapsed = 0;
    isRunning = true;
    timer = setInterval(() => {
        timeElapsed++;
        updateDisplay();
        if (timeElapsed >= restTime) timerBody.classList.add('blinking');
    }, 1000);
    updateDisplay();
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

timerBody.addEventListener('click', startTimer);

initTimer();

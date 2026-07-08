let startTime;
let isRunning = false;
let timer;
const restTime = 135;

const timerDisplay = document.getElementById('display');
const timerBody = document.getElementById('body');

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    if (!isRunning) {
        timerDisplay.textContent = formatTime(0);
        return;
    }
    
    const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = formatTime(timeElapsed);
    
    if (timeElapsed >= restTime) {
        timerBody.classList.add('blinking');
    } else {
        timerBody.classList.remove('blinking');
    }
}

function startTimer() {
    if (isRunning) stopTimer();
    
    timerBody.classList.remove('blinking');
    startTime = Date.now();
    isRunning = true;
    
    timer = setInterval(updateDisplay, 1000);
    updateDisplay();
}

function stopTimer() {
    clearInterval(timer);
    isRunning = false;
    updateDisplay();
}

function resetTimer() {
    stopTimer();
    timerBody.classList.remove('blinking');
    timerDisplay.textContent = formatTime(0);
}

timerBody.addEventListener('click', startTimer);

timerBody.addEventListener('dblclick', (e) => {
    e.preventDefault();
    resetTimer();
});

document.addEventListener('visibilitychange', () => {
    if (!document.hidden && isRunning) {
        updateDisplay();
    }
});

timerDisplay.textContent = formatTime(0);

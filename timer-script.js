let timer;
let timeElapsed = 0;
let isRunning = false;
let restTime = 0;

const timerDisplay = document.getElementById('timer-display');
const timerBody = document.getElementById('timer-body');

// Récupérer le temps de repos depuis localStorage
function initTimer() {
    restTime = parseInt(localStorage.getItem('restTime')) || 90;
    timeElapsed = 0;
    updateDisplay();
}

// Formater le temps
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// Mettre à jour l'affichage
function updateDisplay() {
    timerDisplay.textContent = formatTime(timeElapsed);
}

// Démarrer le chronomètre
function startTimer() {
    // Arrêter le timer précédent s'il existe
    if (isRunning) {
        stopTimer();
    }
    
    // Arrêter le clignotement si actif
    timerBody.classList.remove('blinking');
    
    timeElapsed = 0;
    isRunning = true;
    
    timer = setInterval(() => {
        timeElapsed++;
        updateDisplay();
        
        if (timeElapsed >= restTime) {
            startBlinking();
        }
    }, 1000);
    
    updateDisplay();
}

// Arrêter le chronomètre
function stopTimer() {
    clearInterval(timer);
    isRunning = false;
}

// Démarrer le clignotement
function startBlinking() {
    timerBody.classList.add('blinking');
    // Le timer continue de compter même en clignotant
}

// Gérer le clic sur la page
timerBody.addEventListener('click', function() {
    startTimer();
});

// Initialiser au chargement
initTimer();

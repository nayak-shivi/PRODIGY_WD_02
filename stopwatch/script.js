let startTime;
let updatedTime;
let difference;
let timerId;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const togglePausePlayButton = document.getElementById('togglePausePlay'); // Button for pause/play
const lapsContainer = document.getElementById('laps');

function startTimer() {
  if (!running) {
    startTime = Date.now() - (difference || 0);
    timerId = setInterval(updateDisplay, 10);
    running = true;
  }
}

function stopTimer() {
  if (running) {
    clearInterval(timerId);
    difference = Date.now() - startTime;
    running = false;
  }
}

function togglePausePlayTimer() {
  if (running) {
    clearInterval(timerId);
    difference = Date.now() - startTime;
    running = false;
    togglePausePlayButton.textContent = 'Play';
  } else {
    startTime = Date.now() - difference;
    timerId = setInterval(updateDisplay, 10);
    running = true;
    togglePausePlayButton.textContent = 'Pause';
  }
}

function resetTimer() {
  clearInterval(timerId);
  running = false;
  startTime = 0;
  difference = 0;
  display.textContent = '00:00:00';
  laps = [];
  renderLaps();
}

function updateDisplay() {
  updatedTime = Date.now() - startTime;
  let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
  let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((updatedTime / 1000) % 60);
  let milliseconds = Math.floor((updatedTime % 1000) / 10);

  display.textContent = 
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function addLap() {
  if (running) {
    laps.push(display.textContent);
    renderLaps();
  }
}

function renderLaps() {
  lapsContainer.innerHTML = laps.map(lap => `<li>${lap}</li>`).join('');
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);
togglePausePlayButton.addEventListener('click', togglePausePlayTimer);


let correctCount = 0;
let incorrectCount = 0;
let gameTime = 60;
let gameTimer;
let canClick = true;
let hasPlayedResultSound = false;

// Load game sounds
const playSound = new Audio("/assets/audio/play-sound.mp3");
const resultSound = new Audio("/assets/audio/result.mp3");
const whackSound = new Audio("/assets/audio/whack.mp3");

// Start background music for game
playSound.loop = true;
playSound.volume = 0.3;

window.addEventListener("DOMContentLoaded", () => {
  playSound.play(); // play game background music
  startCountdown();
});

const selectedSubject = localStorage.getItem("selectedSubject");
if (!selectedSubject) {
  alert("No subject selected. Returning to home.");
  window.location.href = "/index.html";
}

const countdownModal = document.getElementById("countdownModal");
const countdownNumber = document.getElementById("countdownNumber");
const answerBoxes = document.querySelectorAll(".answer-box");
const moles = document.querySelectorAll(".mole");
const timerDisplay = document.querySelector(".timer");

// MOLE CLICK SOUND + ANIMATION
moles.forEach((mole) => {
  mole.addEventListener("click", () => {
    whackSound.play(); // play the whack sound

    // Visual whack effect
    mole.src = "/assets/images/whack-mole.png";
    setTimeout(() => {
      mole.src = "/assets/images/mole.png";
    }, 300);
  });
});

// COUNTDOWN
function startCountdown() {
  let count = 3;
  countdownNumber.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
    } else {
      clearInterval(interval);
      countdownModal.style.display = "none";
      showElements(answerBoxes);
      showElements(moles);
      startGame();
    }
  }, 1000);
}

// GAME START
function startGame() {
  startNewQuestion();

  gameTimer = setInterval(() => {
    gameTime--;
    timerDisplay.textContent = `00:${String(gameTime).padStart(2, "0")}`;

    if (gameTime <= 0) {
      clearInterval(gameTimer);
      endGame();
    }
  }, 1000);
}

// NEW QUESTION
function startNewQuestion() {
  const { question, answer: correctAnswer } =
    getRandomQuestion(selectedSubject);
  const answerChoices = generateAnswerChoices(correctAnswer, selectedSubject);

  document.querySelector(".question-box h2").textContent = question;

  answerBoxes.forEach((box, index) => {
    const answer = answerChoices[index];
    box.textContent = answer;
    box.dataset.correct = (answer === correctAnswer).toString();
  });

  moles.forEach((mole) => {
    mole.src = "/assets/images/mole.png";
    mole.classList.remove("pop-up");
    void mole.offsetWidth;
    setTimeout(() => {
      mole.classList.add("pop-up");
      setTimeout(() => mole.classList.remove("pop-up"), 500);
    }, 100);
  });

  canClick = true;
}

// ANSWER CLICK
answerBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!canClick) return;
    canClick = false;

    const isCorrect = box.dataset.correct === "true";
    if (isCorrect) correctCount++;
    else incorrectCount++;

    setTimeout(startNewQuestion, 400);
  });
});

// END GAME
function endGame() {
  if (!hasPlayedResultSound) {
    resultSound.play();
    hasPlayedResultSound = true;
  }

  document.getElementById("resultModal").classList.remove("hidden");

  document.querySelector(".score-item.correct .score-value").textContent =
    correctCount;
  document.querySelector(".score-item.incorrect .score-value").textContent =
    incorrectCount;

  const title = document.querySelector(".modal-title");

  if (correctCount >= 11) {
    title.textContent = "Awesome!";
  } else if (correctCount >= 6) {
    title.textContent = "Good Job!";
  } else {
    title.textContent = "Keep Practicing!";
  }
}

// HELPERS
function showElements(elements) {
  elements.forEach((el) => el.classList.remove("hidden"));
}

// START
window.addEventListener("DOMContentLoaded", startCountdown);

// === BUTTON NAVIGATION ===
document.querySelector(".home-btn").addEventListener("click", () => {
  window.location.href = "/pages/index.html";
});

document.querySelector(".replay-btn").addEventListener("click", () => {
  // Reset score and time
  correctCount = 0;
  incorrectCount = 0;
  gameTime = 60;
  hasPlayedResultSound = false;

  // Hide modal
  document.getElementById("resultModal").classList.add("hidden");

  // Restart game
  startGame();
});

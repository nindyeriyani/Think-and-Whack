// ========== STATE ==========
let correctCount = 0;
let incorrectCount = 0;
let gameTime = 60;
let gameTimer;
let canClick = true;
let hasPlayedResultSound = false;

// ========== AUDIO ==========
const playSound = new Audio("/assets/audio/play-sound.mp3");
const resultSound = new Audio("/assets/audio/result.mp3");
const btnClickSound = new Audio("/assets/audio/btn-click.mp3");

playSound.loop = true;
playSound.volume = 0.3;
resultSound.volume = 0.2;

// ========== ELEMENTS ==========
const selectedSubject = localStorage.getItem("selectedSubject");
const countdownModal = document.getElementById("countdownModal");
const countdownNumber = document.getElementById("countdownNumber");
const answerBoxes = document.querySelectorAll(".answer-box");
const moles = document.querySelectorAll(".mole");
const timerDisplay = document.querySelector(".timer");
const resultModal = document.getElementById("resultModal");
const resultTitle = document.querySelector(".modal-title");
const correctScore = document.querySelector(".score-item.correct .score-value");
const incorrectScore = document.querySelector(".score-item.incorrect .score-value");

// ========== VALIDATION ==========
if (!selectedSubject) {
  alert("No subject selected. Returning to home.");
  window.location.href = "/index.html";
}

// ========== INITIALIZATION ==========
window.addEventListener("DOMContentLoaded", () => {
  playSound.play();
  startCountdown();
});

// ========== COUNTDOWN ==========
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

// ========== GAME LOGIC ==========
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

function startNewQuestion() {
  let questionData, answerChoices;

  if (selectedSubject === "math") {
    questionData = generateMathQuestion();
    answerChoices = generateAnswerChoices(questionData.answer, "math");
  } else if (selectedSubject === "english") {
    questionData = generateEnglishQuestion();
    answerChoices = generateAnswerChoices(questionData.answer, "english");
  }

  const { question, answer: correctAnswer } = questionData;
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

// ========== EVENT: Answer Click ==========
answerBoxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (!canClick) return;
    canClick = false;
    btnClickSound.play();

    const isCorrect = box.dataset.correct === "true";
    isCorrect ? correctCount++ : incorrectCount++;

    setTimeout(startNewQuestion, 400);
  });
});

// ========== END GAME ==========
function endGame() {
  if (!hasPlayedResultSound) {
    resultSound.play();
    hasPlayedResultSound = true;
  }

  resultModal.classList.remove("hidden");
  correctScore.textContent = correctCount;
  incorrectScore.textContent = incorrectCount;

  if (correctCount >= 11) {
    resultTitle.textContent = "Awesome!";
  } else if (correctCount >= 6) {
    resultTitle.textContent = "Good Job!";
  } else {
    resultTitle.textContent = "Keep Practicing!";
  }
}

// ========== NAVIGATION ==========
document.querySelector(".home-btn").addEventListener("click", () => {
  window.location.href = "/index.html";
});

document.querySelector(".replay-btn").addEventListener("click", () => {
  correctCount = 0;
  incorrectCount = 0;
  gameTime = 60;
  hasPlayedResultSound = false;
  resultModal.classList.add("hidden");
  startGame();
});

// ========== HELPERS ==========
function showElements(elements) {
  elements.forEach((el) => el.classList.remove("hidden"));
}
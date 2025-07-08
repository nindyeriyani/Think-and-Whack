let correctCount = 0;
let incorrectCount = 0;
let gameTime = 60; // seconds
let gameTimer;

const countdownModal = document.getElementById('countdownModal');
const countdownNumber = document.getElementById('countdownNumber');
const answerBoxes = document.querySelectorAll('.answer-box');
const moles = document.querySelectorAll('.mole');

// Hide answer boxes initially
answerBoxes.forEach(box => box.classList.add('hidden'));

// Countdown function
function startCountdown() {
  let count = 3;
  countdownNumber.textContent = count;

  const interval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownNumber.textContent = count;
    } else {
      clearInterval(interval);
      countdownModal.style.display = 'none';

      // Show answer boxes
      answerBoxes.forEach(box => box.classList.remove('hidden'));
      // Show moles
      moles.forEach(mole => mole.classList.remove('hidden'));

      // Start the game
      startGame();
    }
  }, 1000);
}

// Start the game logic after countdown
function startGame() {
  startNewQuestion(); // first question

  gameTimer = setInterval(() => {
    gameTime--;

    // Update timer UI
    document.querySelector(".timer").textContent = `00:${String(gameTime).padStart(2, "0")}`;

    if (gameTime <= 0) {
      clearInterval(gameTimer);
      endGame(); // show result modal
    }
  }, 1000);
}

function startNewQuestion() {
  const { question, correctAnswer } = generateMathQuestion();
  const answerChoices = generateAnswerChoices(correctAnswer);

  // Set question
  document.querySelector(".question-box h2").textContent = question;

  // Update moles & answer boxes
  const answerBoxes = document.querySelectorAll('.answer-box');
  const moles = document.querySelectorAll('.mole');

  answerBoxes.forEach((box, index) => {
    const answer = answerChoices[index];
    box.textContent = answer;
    box.dataset.correct = (answer === correctAnswer).toString();
  });

  moles.forEach(mole => mole.classList.remove("hidden")); // Show again if hidden
}

// Start countdown when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});

answerBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const isCorrect = box.dataset.correct === "true";

    if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
    }

    // Immediately go to next question
    startNewQuestion();
  });
});

function endGame() {
  document.getElementById("resultModal").classList.remove("hidden");

  // Set score
  document.querySelector(".score-item.correct .score-value").textContent = correctCount;
  document.querySelector(".score-item.incorrect .score-value").textContent = incorrectCount;
}

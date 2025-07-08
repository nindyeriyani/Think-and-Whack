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
  const selectedSubject = localStorage.getItem("selectedSubject");

  // Validate subject
  if (!selectedSubject || selectedSubject !== "math") {
    alert("Only math is supported now.");
    window.location.href = "/index.html";
    return;
  }

  // Generate question and choices
  const { question, correctAnswer } = generateMathQuestion();
  const answerChoices = generateAnswerChoices(correctAnswer);

  // Set question text
  document.querySelector(".question-box h2").textContent = question;

  // Set answers into answer boxes
  answerBoxes.forEach((box, index) => {
    box.textContent = answerChoices[index];
    box.dataset.correct = (answerChoices[index] === correctAnswer).toString();
  });
}

// Start countdown when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  startCountdown();
});

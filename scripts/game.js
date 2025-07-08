// Make sure questions.js is loaded BEFORE this file in HTML
const selectedSubject = localStorage.getItem("selectedSubject");

// (Optional fallback if you have other subjects later)
if (!selectedSubject || selectedSubject !== "math") {
  alert("Only math is supported now.");
  window.location.href = "/index.html";
}

// Generate question and choices
const { question, correctAnswer } = generateMathQuestion();
const answerChoices = generateAnswerChoices(correctAnswer);

// Set question text
document.querySelector(".question-box h2").textContent = question;

// Set answers into answer boxes
const answerBoxes = document.querySelectorAll(".answer-box");
const moles = document.querySelectorAll(".mole");
answerBoxes.forEach((box, index) => {
  box.textContent = answerChoices[index];
  box.classList.remove("hidden");
  moles[index].classList.remove("hidden");

  if (answerChoices[index] === correctAnswer) {
    box.dataset.correct = "true";
  } else {
    box.dataset.correct = "false";
  }
});

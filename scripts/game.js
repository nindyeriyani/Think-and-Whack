const selectedSubject = localStorage.getItem("selectedSubject");

// Take the list of questions based on the subject
const subjectQuestions = questions[selectedSubject];

// Take 1 random question
const currentQuestion = subjectQuestions[Math.floor(Math.random() * subjectQuestions.length)];

// Display questions to question box
document.querySelector(".question-box h2").textContent = currentQuestion.question;

const startBtn = document.getElementById('startBtn');
const subjectModal = document.getElementById('subjectModal');

startBtn.addEventListener('click', () => {
  subjectModal.classList.remove('hidden');
});

const subjectButtons = document.querySelectorAll('.subject-btn');

subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const subject = button.dataset.subject;
    localStorage.setItem("selectedSubject", subject);
    window.location.href = "/pages/game.html";
  });
});


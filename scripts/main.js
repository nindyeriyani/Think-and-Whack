const startBtn = document.getElementById('startBtn');
const subjectModal = document.getElementById('subjectModal');

// When the “Start” button is clicked, display the subject modal.
startBtn.addEventListener('click', () => {
  subjectModal.classList.remove('hidden');
});

const subjectButtons = document.querySelectorAll('.subject-btn');

subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    const selectedSubject = button.dataset.subject;
    localStorage.setItem('selectedSubject', selectedSubject);
    window.location.href = "/pages/game.html";
  });
});


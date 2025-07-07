const startBtn = document.getElementById('startBtn');
const subjectModal = document.getElementById('subjectModal');

startBtn.addEventListener('click', () => {
  subjectModal.classList.remove('hidden');
});


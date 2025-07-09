const startBtn = document.getElementById('startBtn');
const subjectModal = document.getElementById('subjectModal');
const btnClickSound = new Audio("/assets/audio/btn-click.mp3");
const mainMenuBGM = new Audio("/assets/audio/main-menu.mp3");

// When the “Start” button is clicked, display the subject modal.
startBtn.addEventListener('click', () => {
  subjectModal.classList.remove('hidden');
});

const subjectButtons = document.querySelectorAll('.subject-btn');

subjectButtons.forEach(button => {
  button.addEventListener('click', () => {
    btnClickSound.play(); // Play button click sound
    const selectedSubject = button.dataset.subject;
    localStorage.setItem('selectedSubject', selectedSubject);
    window.location.href = "/pages/game.html";
  });
});

// Loop background music
mainMenuBGM.loop = true;
mainMenuBGM.volume = 0.3;
mainMenuBGM.play();

// Start button click sound
startBtn.addEventListener("click", () => {
  btnClickSound.play();
  subjectModal.classList.remove("hidden");
});
// Generate a random math question with its correct answer
function generateMathQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question = `${num1} ${operator} ${num2}`;
  let correctAnswer;

  switch (operator) {
    case '+': correctAnswer = num1 + num2; break;
    case '-': correctAnswer = num1 - num2; break;
    case '*': correctAnswer = num1 * num2; break;
  }

  return { question, correctAnswer };
}

// Generate 5 answer choices: 1 correct + 4 incorrect
function generateAnswerChoices(correctAnswer) {
  const choices = new Set();
  choices.add(correctAnswer);

  while (choices.size < 5) {
    let fakeAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5;
    if (fakeAnswer >= 0) choices.add(fakeAnswer);
  }

  return [...choices].sort(() => Math.random() - 0.5); // shuffle
}
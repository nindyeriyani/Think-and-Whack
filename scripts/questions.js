// ========== MATH ==========

function generateMathQuestion() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operators = ['+', '-', '*'];
  const operator = operators[Math.floor(Math.random() * operators.length)];

  let question = `${num1} ${operator} ${num2}`;
  let answer;

  switch (operator) {
    case '+': answer = num1 + num2; break;
    case '-': answer = num1 - num2; break;
    case '*': answer = num1 * num2; break;
  }

  return { question, answer: String(answer) };
}

// ========== ENGLISH ==========

const englishQuestions = [
  { question: "Plural of 'Child'", answer: "Children" },
  { question: "Past tense of 'Go'", answer: "Went" },
  { question: "Opposite of 'Hot'", answer: "Cold" },
  { question: "Synonym of 'Happy'", answer: "Joyful" },
  { question: "Antonym of 'Fast'", answer: "Slow" },
  { question: "Translate: 'Apple' (to Indonesian)", answer: "Apel" },
  { question: "Which one is an adjective?", answer: "Beautiful" },
  { question: "Which is a noun?", answer: "Book" },
  { question: "What is the verb in: 'She runs fast'?", answer: "Runs" },
  { question: "Complete: 'I ___ a book.'", answer: "Read" }
];

// ========== UNIVERSAL GETTER ==========

function getRandomQuestion(subject) {
  if (subject === "math") {
    return generateMathQuestion();
  } else if (subject === "english") {
    const random = englishQuestions[Math.floor(Math.random() * englishQuestions.length)];
    return random;
  } else {
    throw new Error("Unsupported subject: " + subject);
  }
}

// ========== UNIVERSAL ANSWER CHOICES ==========

function generateAnswerChoices(correctAnswer, subject) {
  const choices = new Set([correctAnswer]);

  while (choices.size < 5) {
    let fakeAnswer;

    if (subject === "math") {
      fakeAnswer = String(Number(correctAnswer) + Math.floor(Math.random() * 10 - 5));
    } else if (subject === "english") {
      const random = englishQuestions[Math.floor(Math.random() * englishQuestions.length)];
      fakeAnswer = random.answer;
    }

    if (fakeAnswer !== correctAnswer) {
      choices.add(fakeAnswer);
    }
  }

  return [...choices].sort(() => Math.random() - 0.5); // shuffle
}

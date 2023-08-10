const quizContainer = document.getElementById("quiz");
const submitButton = document.getElementById("submit");
const resultsContainer = document.getElementById("results");

const questions = [
  {
    question: "What is the capital of England?",
    answers: {
      a: "London",
      b: "Paris",
      c: "New York",
    },
    correctAnswer: "a",
  },
  {
    question: "How many continents are there?",
    answers: {
      a: "5",
      b: "6",
      c: "7",
    },
    correctAnswer: "c",
  },
  // Adicione mais perguntas aqui
];

function buildQuiz() {
  const output = [];

  questions.forEach((currentQuestion, questionNumber) => {
    const answers = [];
    for (const letter in currentQuestion.answers) {
      answers.push(
        `<label>
          <input type="radio" name="question${questionNumber}" value="${letter}">
          ${letter}: ${currentQuestion.answers[letter]}
        </label>`
      );
    }

    output.push(
      `<div class="question">${currentQuestion.question}</div>
      <div class="answers">${answers.join("")}</div>`
    );
  });

  quizContainer.innerHTML = output.join("");
}

function showResults() {
  const answerContainers = quizContainer.querySelectorAll(".answers");
  let numCorrect = 0;

  questions.forEach((currentQuestion, questionNumber) => {
    const answerContainer = answerContainers[questionNumber];
    const selector = `input[name=question${questionNumber}]:checked`;
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    if (userAnswer === currentQuestion.correctAnswer) {
      numCorrect++;
      answerContainers[questionNumber].style.color = "green"; // Feedback visual
    } else {
      answerContainers[questionNumber].style.color = "red"; // Feedback visual
    }
  });

  const numQuestions = questions.length;
  const scorePercentage = (numCorrect / numQuestions) * 100;

  resultsContainer.innerHTML = `
    <p>Você acertou ${numCorrect} de ${numQuestions} perguntas.</p>
    <p>Sua pontuação: ${scorePercentage.toFixed(2)}%.</p>
  `;

  resultsContainer.style.display = "block";
  submitButton.style.display = "none"; // Esconder botão "Enviar Respostas"
  
  // Adicionando botão "Tentar Novamente"
  const tryAgainButton = document.createElement("button");
  tryAgainButton.innerText = "Tentar Novamente";
  tryAgainButton.id = "try-again";
  tryAgainButton.addEventListener("click", () => {
    // Reiniciar o quiz
    resultsContainer.style.display = "none";
    submitButton.style.display = "block";
    answerContainers.forEach(container => {
      container.style.color = "initial";
    });
    quizContainer.querySelectorAll("input[type=radio]:checked").forEach(input => {
      input.checked = false;
    });
  });
  resultsContainer.appendChild(tryAgainButton);
}

buildQuiz();

submitButton.addEventListener("click", showResults);
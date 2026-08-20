const state = {
  data: {},
  topic: null,
  questions: [],
  currentIndex: 0,
  score: 0,
};

const setupScreen = document.getElementById("setup-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const setupForm = document.getElementById("setup-form");
const topicSelect = document.getElementById("topic-select");
const questionCountInput = document.getElementById("question-count");

const flashcard = document.getElementById("flashcard");
const questionText = document.getElementById("question-text");
const answerText = document.getElementById("answer-text");
const flipBtn = document.getElementById("flip-btn");
const correctBtn = document.getElementById("correct-btn");
const wrongBtn = document.getElementById("wrong-btn");

const scoreText = document.getElementById("score-text");

function showScreen(screen) {
  [setupScreen, quizScreen, resultsScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
}

async function loadData() {
  const response = await fetch("data.json");
  state.data = await response.json();

  Object.keys(state.data).forEach((topic) => {
    const option = document.createElement("option");
    option.value = topic;
    option.textContent = topic;
    topicSelect.appendChild(option);
  });
}

function startQuiz(topic, count) {
  state.topic = topic;
  state.currentIndex = 0;
  state.score = 0;

  const bank = state.data[topic];
  const size = Math.min(count, bank.length);
  state.questions = bank.slice(0, size);

  showScreen(quizScreen);
  renderCard();
}

function renderCard() {
  flashcard.classList.remove("flipped");

  const current = state.questions[state.currentIndex];
  questionText.textContent = current.question;
  answerText.textContent = current.answer;
}

function nextCard() {
  state.currentIndex++;

  if (state.currentIndex >= state.questions.length) {
    showResults();
  } else {
    renderCard();
  }
}

function showResults() {
  showScreen(resultsScreen);
  scoreText.textContent = `You scored ${state.score} out of ${state.questions.length}`;
}

setupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const topic = topicSelect.value;
  const count = parseInt(questionCountInput.value, 10);
  startQuiz(topic, count);
});

flipBtn.addEventListener("click", () => {
  flashcard.classList.add("flipped");
});

correctBtn.addEventListener("click", () => {
  state.score++;
  nextCard();
});

wrongBtn.addEventListener("click", () => {
  nextCard();
});

loadData();

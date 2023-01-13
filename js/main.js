const questions = [
  {
    question: "Яка мова працює в браузері?",
    answer: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Що означає CSS?",
    answer: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Що означає HTML?",
    answer: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motoboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В якому році був створений JavaScript?",
    answer: ["1996", "1995", "1994", "Всі відповіді невірні"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}
function showQuestion() {
  questions[questionIndex]["question"];
  const headerTemplate = `<div class="title">%title%</div>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answer"]) {
    const questionTemplate = `<li class="li">
      <label class="label">
        <input value="%number%" type="radio" class="answer" name="answer" />
        <span>%answer%</span>
      </label>
    </li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}
function checkAnswer() {
  const checkRadio = listContainer.querySelector('input[type="radio"]:checked');
  if (!checkRadio) {
    submitBtn.blur();
    return;
  }
  const userAnswer = parseInt(checkRadio.value);
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}
function showResults() {
  const resultsTemplate = `
  <h2 class="title">%title%</h2>
  <h3 class="summary">%massage%</h3>
  <p class="result">%result%</p>
  `;
  let title, massage;
  if (score === questions.length) {
    title = "Вітаємо!";
    massage = "Ви відповіли вірно на всі питання!";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Непоганий результат";
    massage = "Ви дали більше половини правильних відповідей";
  } else {
    title = "Варто постаратись";
    massage = "Поки що у вас менше половини правильних відповідей";
  }
  let result = `${score} з ${questions.length}`;
  const finalMassage = resultsTemplate
    .replace("%title%", title)
    .replace("%massage%", massage)
    .replace("%result%", result);
  headerContainer.innerHTML = finalMassage;
  submitBtn.blur();
  submitBtn.innerHTML = "Почати заново";
  submitBtn.onclick = () => history.go();
}

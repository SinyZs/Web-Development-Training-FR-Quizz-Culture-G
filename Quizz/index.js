class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle est la capitale du Canada ?",
    ["Toronto", "Montreal", "Ottawa", "Vancouver"],
    "Ottawa",
  ),
  new Question(
    "En quelle année l'Homme a-t-il marché sur la lune pour la premiere fois ?",
    ["1970", "1968", "1971", "1969"],
    "1969",
  ),
  new Question(
    "Quel est le plus gros mamifères du règne animal",
    ["L'Eléphant", "La Baleine", "L'Hippotame", "La Girafe"],
    "La Baleine",
  ),
  new Question(
    "Combien les Etats-Unis D'Amérique compte t'il d'Etat ?",
    ["50", "51", "49", "48"],
    "50",
  ),
];

class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}
// Quiz display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    // Affichage choix + prise en compte du choix
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`,
    );
  },
  endQuiz: function () {
    let endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
    `;
    this.elementShown("quiz", endQuizHTML);
  },
};

// Game Logic
quizApp = () => {
  if (quiz.hasEnded()) {
    display.endQuiz();
  } else {
    display.question();
    display.choices();
    display.progress();
  }
};

// Create Quiz
let quiz = new Quiz(questions);
quizApp();

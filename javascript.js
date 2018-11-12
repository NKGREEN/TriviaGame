var panel = $("#quiz-area");
var countStartNumber = 25;

var questions = [{
	question: "What anime is credited as the inspiration behind several concepts and action sequences in The Matrix?",
	answers: ["Ghost in the Shell", "Akira", "Ninja Scroll", "Sword of the Stranger"],
	correctAnswer: "Ghost in the Shell", image:"assets/images/Motoko.gif"
},{
	question: "What was the first anime to be broadcast in the U.S?",
	answers: ["Dragon Ball", "Sailor Moon","Astro Boy", "Pokemon"],
	correctAnswer: "Astro Boy", image: "assets/images/Astro.gif"
},{
	question: "Which of these Studio Ghibli films was NOT directed by Hayao Miyazaki?",
	answers: ["Spirited Away", "Princess Mononoke", "My Neighbor Totoro", "Grave of the Fireflies"],
	correctAnswer: "Grave of the Fireflies", image:"assets/images/fireflies.gif"
},{
	question: "What is the longest running animated series of all time?",
	answers: ["One Piece", "Sazae-San","Dragon Ball", "Doraemon"],
	correctAnswer: "Sazae-San", image:"assets/images/sazaesan.gif"
},{
	question: "Which anime chronicles the story of the Elrich Brothers and their search for the Philosophers Stone?",
	answers: ["Fullmetal Alchemist","Death Note", "Knights of Sidonia", "Attack on Titan"],
	correctAnswer: "Fullmetal Alchemist", "assets/images/fullmetal.gif"
},{
	question: "Best known for Ranma 1/2 and Inuyasha, which artist is considered by many to be the greatest female comic artist in history?",
	answers: ["Hiromu Arakawa", "Kozue Amano", "Rumiko Takahashi", "Ume Aoki"],
	correctAnswer: "Rumiko Takahashi", "assets/images/rumiko.gif"
},{
	question: "Ryuk, a bored Shinigami who loves apples, appears in which series?",
	answers: ["Ajin:Demi-Human", "Deathnote", "Deadman Wonderland", "Gantz"],
	correctAnswer: "Deathnote", "assets/images/ryuk.gif"
},{
	question: "After quitting her demanding job, Moriko Morioka becomes entranced in the world of Fruits de Mer in what series?",
	answers: ["Gamers!", "Acel World", "Sword Art Online", "Recovery of an MMO Junkie"],
	correctAnswer: "Recovery of an MMO Junkie", "assets/images/MMO.gif"
},{
	question: "This series serves as the backdrop for mankind's struggle against the Guana, a race of shift-shaping aliens who destroyed Earth and forced humanity to flee across the galaxy in seed ships.",
	answers: ["Blue Gender", "Comboy Bebop", "Knights of Sidonia", "Terraformars"],
	correctAnswer: "Knights of Sidonia", "assets/images/sidonia.gif"
},{
	question: "Dr. Atsuko Chiba enters her patients' dreams via an aler-ego and a device called the DC mini in what psychological thriller?",
	answers: [" The Garden of Sinners Ch.5: Paradox Paradigm", "Perfect Blue","Paprika","Steins;Gate:The Movie"],
	correctAnswer: "Paprika", "assets/images/paprika.gif"
}];


// Variable to hold our setInterval
var timer;

var game = {

  questions: questions,
  currentQuestion: 0,
  counter: countStartNumber,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter-number").text(game.counter);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.timeUp();
    }
  },

  loadQuestion: function() {

    timer = setInterval(game.countdown, 1000);

    panel.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
      panel.append("<button class='answer-button' id='button' data-name='" + questions[this.currentQuestion].answers[i]
      + "'>" + questions[this.currentQuestion].answers[i] + "</button>");
    }
  },

  nextQuestion: function() {
    game.counter = countStartNumber;
    $("#counter-number").text(game.counter);
    game.currentQuestion++;
    game.loadQuestion();
  },

  timeUp: function() {

    clearInterval(timer);

    $("#counter-number").html(game.counter);

    panel.html("<h2>Out of Time!</h2>");
    panel.append("<h3>The Correct Answer is: " + questions[this.currentQuestion].correctAnswer);
    panel.append("<img src='" + questions[this.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  results: function() {

    clearInterval(timer);

    panel.html("<h2>Quiz Completed</h2>");

    $("#counter-number").text(game.counter);

    panel.append("<h3>Correct Answers: " + game.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    panel.append("<br><button id='start-over'>Start Over?</button>");
  },

  clicked: function(e) {
    clearInterval(timer);
    if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(timer);

    panel.html("<h2>Incorrect</h2>");
    panel.append("<h3>Correct Answer: " + questions[game.currentQuestion].correctAnswer + "</h3>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(timer);

    game.correct++;

    panel.html("<h2>Correct!</h2>");
    panel.append("<img src='" + questions[game.currentQuestion].image + "' />");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3 * 1000);
    }
    else {
      setTimeout(game.nextQuestion, 3 * 1000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = countStartNumber;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#start-over", function() {
  game.reset();
});

$(document).on("click", ".answer-button", function(e) {
  game.clicked(e);
});

$(document).on("click", "#start", function() {
  $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>30</span> Seconds</h2>");
  game.loadQuestion();
});


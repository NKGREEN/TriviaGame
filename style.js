var content=document.getElementById("content");
var button=document.getElementById("start");
var questionNumber=0;

button.onclick= function(){
  game.start();
}

var all_questions = [{
  question_string: "What anime is credited as the inspiration behind several concepts and action sequences in The Matrix?",
  correct: 0,
  choices: ["Ghost in the Shell", "Akira", "Ninja Scroll", "Sword of the Stranger"]
}, {
  question_string: "What was the first anime to be broadcast in the U.S?",
  correct: 2,
  choices: ["Dragon Ball", "Sailor Moon","Astro Boy", "Pokemon"]
}, {
  question_string: "Which of these Studio Ghibli films was NOT directed by Hayao Miyazaki?",
    correct: 3, 
    choices: ["Spirited Away", "Princess Mononoke", "My Neighbor Totoro", "Grave of the Fireflies"]
}, {
  question_string: 'What is the longest running animated series of all time?',
    correct: 1,
    choices: ["One Piece", "Sazae-San","Dragon Ball", "Doraemon"]
  }, {
  question_string: 'Which anime chronicles the story of the Elrich Brothers and their search for the Philosophers Stone?',
    correct: 0,
    choices: ["Fullmetal Alchemist","Death Note", "Knights of Sidonia", "Attack on Titan"]
  }, {
  question_string: 'Best known for Ranma 1/2 and Inuyasha, which artist is considered to be the greatest female comic artist in history?',
    correct: 2,
    choices: ["Hiromu Arakawa", "Kozue Amano", "Rumiko Takahashi", "Ume Aoki"]
  }      
];
  
  
  var appendQuestionsToPage=function(questionNumber){
  var mainDiv=$("<div>");
  mainDiv.attr("id","mainDiv");
  var question=$("<p>").text(all_questions[questionNumber].question_string);
  mainDiv.append(question);
  orderedList = $("<ol>");
  for (i = 0 ; i < all_questions[questionNumber].choices.length;i++){
      var li = $("<li>").text(all_questions[questionNumber].choices[i]);
      orderedList.append(li);
  }  
  mainDiv.append(orderedList);
  

  for (i = 0 ; i < all_questions[questionNumber].choices.length;i++){
    var answerButton = $("<button>");
    answerButton.addClass("answerButton");
    answerButton.attr("data-answerNumber", i);
    answerButton.text(i + 1);
    mainDiv.append(answerButton);
  }
  $("#questions").append(mainDiv);
}


$(document).on('click','.answerButton',function(){
    var answerNumber = $(this).attr("data-answerNumber");
    console.log("answerNumber: " + answerNumber);
    console.log(all_questions[questionNumber].correct);
    if(answerNumber == all_questions[questionNumber].correct) {
        alert("You got it!!!");
        if (questionNumber === 5) {
            //end game
        }
        questionNumber += 1;
        appendQuestionsToPage(questionNumber);
    } else {
        alert("sorry")
        if (questionNumber === 5) {
            //end game
        }
        questionNumber += 1;
        appendQuestionsToPage(questionNumber);
    }
})


  
  
  // Variable that will hold the setInterval
var game = {

  correct: 0,
  incorrect: 0,
  counter: 240,

  countdown: function() {
    game.counter -= 1;
    var minutes = Math.floor(game.counter / 60);
    var seconds = game.counter - minutes * 60;
    $("#timer").text(minutes + ":" + seconds);
    if (game.counter === 0) {
      console.log("TIME UP");
      game.done();
    }
  },

  start: function() {

     document.getElementById("music").play();
    $("#start").remove();
    $("#timer").css("display","inline")
    timer = setInterval(game.countdown, 1000);
    appendQuestionsToPage(questionNumber);

    // $("#sub-wrapper").prepend("<h2>Time Remaining: <span id='counter-number'>120</span> Seconds</h2>");

    // $("#start").remove();

    // for (var i = 0; i < questions.length; i++) {
    //   panel.append("<h2>" + questions[i].question + "</h2>");
    //   for (var j = 0; j < questions[i].answers.length; j++) {
    //     panel.append("<input type='radio' name='question-" + i +
    //     "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
    //   }
    // }

  },

  done: function() {


    if (true){
      game.correct++;
    }
      
      else { //they lose 
        game.incorrect++;
      }
    },

  result: function() {

    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    panel.html("<h2>All Done!</h2>");
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

// CLICK EVENTS

$(document).on("click", "#done", function() {
  game.done();
});

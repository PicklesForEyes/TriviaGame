$(document).ready(function() {

  var intervalID;

  questionNum = 1;

  var timer = {
    time: 30,

    count: function() {
      timer.time--;
      // console.log(timer.time);
      if(timer.time === 0){
        timer.stop();
      }
      $('#time-left').text('Time Remaining: ' + timer.time);
    },

    start: function() {
      intervalID = setInterval(timer.count, 1000);
    },

    stop: function() {
      clearInterval(intervalID);
      timer.time = 30;
    }

  }

  // timer.start();

  function drawQuestions() {
    var current = questions[questionNum];
    var thisQuestion = $('<p>');
      thisQuestion.text(current.question)
    $('#questions-results').append(thisQuestion);
  }

  drawQuestions();
})

var questions = {
  1: {
    question: 'Question1',
    options: ['true', 'false'],
    answer: 'true'
  },
  2: {
    question: 'Question2',
    options: ['a','b','c','d'],
    answer: 'b'
  }
}
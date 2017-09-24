$(document).ready(function() {

  var intervalID;

  var questionNum = 2;

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
      timer.time = 30;
    },

    stop: function() {
      clearInterval(intervalID);
    }

  }

  // timer.start();

  function drawQuestions() {
    var current = questions[questionNum];
    var thisQuestion = $('<p>');
      thisQuestion.text(current.question);
    $('#questions-results').append(thisQuestion);

    for(var i = 0; i < current.options.length; i++){
      console.log(current.options[i]);
      var answers = $('<input>');
      var label = $('<label>');
        answers.attr('type', 'radio');
        answers.attr('value', current.options[i])
        label.text(current.options[i]);
      $('#questions-results').append(answers, label)
    }
    timer.start();
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
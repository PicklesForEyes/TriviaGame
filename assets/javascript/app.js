$(document).ready(function() {

  var intervalID;

  var questionNum = 2;

  var radioName = '';

  var current = questions[questionNum];

  var timer = {
    time: 30,

    count: function() {
      timer.time--;
      // console.log(timer.time);
      if(timer.time === 0){
        timer.stop();
        gifGrabber('lol');
      }
      $('#time-left').text('Time Remaining: ' + timer.time);
    },

    start: function() {
      // timer.time = 30;
      intervalID = setInterval(timer.count, 1000);
    },

    stop: function() {
      clearInterval(intervalID);
    }

  }

  function drawQuestions() {
    var thisQuestion = $('<p>');
      thisQuestion.text(current.question);
    $('#current-question').append(thisQuestion);

    radioName = current.name;

    for(var i = 0; i < current.options.length; i++){
      // console.log(current.options[i]);
      var answers = $('<input>');
      var label = $('<label>');
        answers.attr('type', 'radio');
        answers.attr('value', current.options[i]);
        answers.attr('name', current.name);
        label.text(current.options[i]);
      $('#current-answers').append(answers, label)
    }
    timer.start();
  }

  $('#done').on('click', function() {
    var userAnswer = $('input[name='+radioName+']:checked', '#current-answers').val();
    if(userAnswer === current.answer){
      console.log('correct answer');
    } else {
      console.log('wrong/undefined');
    }
  })

  function gifGrabber(keyWord) {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + keyWord + "&limit=20";
    var num = Math.floor(Math.random() * 20);
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(obj){
      var imageSrc = obj.data[num].images.downsized.url;
      var image = $('<img>');
        image.attr('src', imageSrc);
      $('#questions-results').append(image);
    })
  }

  drawQuestions();
  // gifGrabber('wrong')

})

var questions = {
  1: {
    question: 'Question1',
    options: ['true', 'false'],
    name: 'first',
    answer: 'true'
  },
  2: {
    question: 'Question2',
    options: ['a','b','c','d'],
    name: 'second',
    answer: 'b'
  }
}
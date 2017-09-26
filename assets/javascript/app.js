$(document).ready(function() {

  var intervalID;

  var questionNum = 0;

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
      $('#time-left').text(timer.time);
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
    timer.time = 30;
    $('#questions-results').empty();
    var thisQuestion = $('<p>');
      thisQuestion.text(questions[questionNum].question);
    $('#questions-results').append(thisQuestion);

    radioName = current.name;

    for(var i = 0; i < questions[questionNum].options.length; i++){
      // console.log(current.options[i]);
      var answers = $('<input>');
      var label = $('<label>');
        answers.attr('type', 'radio');
        answers.attr('value', questions[questionNum].options[i]);
        answers.attr('name', questions[questionNum].name);
        label.text(questions[questionNum].options[i]);
      $('#questions-results').append(answers, label)
    }
    timer.start();
  }

  $('#done').on('click', function() {
    timer.stop();
    var userAnswer = $('input[name='+radioName+']:checked', '#questions-results').val();
    if(userAnswer === current.answer){
      console.log('correct answer');
      correctAnswer();
    } else {
      console.log('wrong/undefined');
    }
    questionNum++;
    // console.log(questionNum);
    // console.log(current);
    drawQuestions();
  })

  function gifGrabber(keyWord) {
    $('#questions-results').empty();
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

  function correctAnswer() {
    setTimeout(drawQuestions, 3000);
    $('#questions-results').empty();
    $('#questions-results').text('Wow! Great Success');
    gifGrabber('Success');
  }

  drawQuestions();
  // gifGrabber('wrong')

})



var questions = {
  0: {
    question: 'Question1',
    options: ['true', 'false'],
    name: 'first',
    answer: 'true'
  },
  1: {
    question: 'Question2',
    options: ['a','b','c','d'],
    name: 'second',
    answer: 'b'
  }
}
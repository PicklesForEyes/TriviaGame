$(document).ready(function() {

  var intervalID;

  // var questionNum = 0;

  var totalCorrect;

  var radioName = '';

  // var current = questions[questionNum];

  var timer = {
    time: 120,

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
    for (var i = 0; i < 2; i++){
      var div = $('<div>');
      var currentQuestion = $('<p>');
        currentQuestion.addClass('question');
        currentQuestion.text(questions[i].question);
      div.append(currentQuestion);
      for(var j = 0; j < questions[i].options.length; j++){
        var answers = $('<input>');
          answers.attr('type', 'radio');
          answers.attr('value', questions[i].options[j]);
          answers.attr('name', questions[i].name);
        var label = $('<label>');
          label.text(questions[i].options[j]);
        div.append(answers, label);
      }
      $('#questions-results').append(div);
    }

    timer.start();
  }

  $('#done').on('click', function() {
    timer.stop();
    var questionNames = ['0', '1',
       // 'third', 'fourth','fifth','sixth','seventh','eigth','ninth','tenth'
       ]
    
    for (var i = 0; i < questionNames.length; i++){
      var userAnswer = $('input[name='+questionNames[i]+']:checked', '#questions-results').val();
      // console.log(userAnswer);
      if(userAnswer === questions[questionNames[i]].answer){
        totalCorrect++;
      }
    }

    $('#questions-results').empty();

    var results = $('<h3>You got ' + totalCorrect + ' out of 10!');

    $('#questions-results').append(results);

    if (totalCorrect > 5){
      gifGrabber('good job');
    } else if (totalCorrect > 3){
      gifGrabber('not bad');
    } else {
      gifGrabber('ouch')
    }
  })

  function gifGrabber(keyWord) {
    $('#questions-results').empty();
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + keyWord + "&limit=20";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(obj){
      console.log(obj)
      var imageSrc = obj.data.fixed_height_downsampled_url;
      // console.log(imageSrc)
      var image = $('<img>');
        image.attr('src', imageSrc);
      $('#questions-results').append(image);
    })
  }

// gifGrabber('good job')

  function correctAnswer() {
    // // setTimeout(drawQuestions, 3000);
    // $('#questions-results').empty();
    // $('#questions-results').text('Wow! Great Success');
    // gifGrabber('Success');
  }

  drawQuestions();
  // gifGrabber('wrong')

})



var questions = {
  0: {
    question: 'Question1',
    options: ['true', 'false'],
    name: '0',
    answer: 'true'
  },
  1: {
    question: 'Question2',
    options: ['a','b','c','d'],
    name: '1',
    answer: 'b'
  }
}
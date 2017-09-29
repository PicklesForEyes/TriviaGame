$(document).ready(function() {

  var intervalID;

  var totalCorrect = 0;

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
    for (var i = 0; i < 10; i++){
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

  $('#done').on('click', function(event) {
    event.preventDefault();
    timer.stop();
    var questionNames = ['0', '1','2','3','4','5','6','7','8','9'];
    
    for (var i = 0; i < questionNames.length; i++){
      var userAnswer = $('input[name='+questionNames[i]+']:checked', '#questions-results').val();
      console.log(userAnswer);
      if(userAnswer === questions[i].answer){
        totalCorrect++;
        console.log('i checked the answer')
        console.log(totalCorrect)
      }
    }


    $('#questions-results').empty();

    var results = $('<h3>You got ' + totalCorrect + ' out of 10 correct!');

    $('#questions-results').append(results);

    if (totalCorrect > 5){
      gifGrabber('good job');
    } else if (totalCorrect > 3){
      gifGrabber('not bad');
    } else {
      gifGrabber('ouch');
    }
  })

  function gifGrabber(keyWord) {
    // $('#questions-results').empty();
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

  drawQuestions();

})



var questions = {
  0: {
    question: "Patrick I don't think that _____ is a real word",
    options: ['howdy', 'wazzup', 'wumbo', 'infernal'],
    name: '0',
    answer: 'wumbo'
  },
  1: {
    question: 'Is _____ an instrument?',
    options: ['mustard','ketchup','ranch','mayonnaise'],
    name: '1',
    answer: 'mayonnaise'
  },
  2: {
    question: 'There once was an ugly barnicle, he was so ugly that everyone _____ ... the end.',
    options: ['left', 'died', 'cried', 'laughed'],
    name: '2',
    answer: 'died'
  },
  3: {
    question: "Now he's gonna kick my _____!",
    options: ['butt','shins', 'snail', 'ball'],
    name: '3',
    answer: 'butt'
  },
  4: {
    question: "I stubbed my toe last week and only cried for __ minutes",
    options: ['10','5','15','20'],
    name: '4',
    answer: '20'
  },
  5: {
    question: "Are you _____ now? That's okay, take your time.",
    options: ['hungry','Squidward','tired','ugly'],
    name: '5',
    answer: 'Squidward'
  },
  6: {
    question: "HAHAHAHA THAT GUY GOT HIT IN THE HEAD WITH (A) _____ HAHAHA.",
    options: ['LAMB CHOP','COCONUT','MAYONNAISE','BOWLING BALL'],
    name: '6',
    answer: 'COCONUT'
  },
  7: {
    question: 'My sandwich tastes like a fried _____! My sandwich is a fried _____!',
    options: ['boot','fish-hook','egg','wumbo'],
    name: '7',
    answer: 'boot'
  },
  8: {
    question: "Ha ha ha ha, it's a _____",
    options: ['elephant','giraffe','porcupine','zebra'],
    name: '8',
    answer: 'giraffe'
  },
  9: {
    question: "This is a load of _____...",
    options: ['balogna','crap','malarkey','barnacles'],
    name: '9',
    answer: 'barnacles'
  }
}
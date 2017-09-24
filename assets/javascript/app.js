$(document).ready(function() {

  var intervalID;

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

  timer.start();

})
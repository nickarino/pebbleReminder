
var UI = require('ui');
var Vibe = require('ui/vibe');
var Vector2 = require('vector2');

//set up cards
var prompt = new UI.Card({
  title: 'Posture',
  //icon: 'images/menu_icon.png',
  //subtitle: '',
  body: 'Did you have proper posture for the last hour? '
});

var answer = new UI.Card({
  //will be set later
});
answer.hide(); //for good measure

//from https://github.com/pebble-hacks/hackathon-watchface/blob/master/src/app.js
var watchFace = new UI.Window({
  fullscreen: true
});

var time_text = new UI.TimeText({
  position: new Vector2(0, 144),
  size: new Vector2(144, 24),
  font: 'gothic-18-bold',
  text: '%H:%M:%S',
  textAlign: 'center'
});

var hackathon_logo = new UI.Image({
  position: new Vector2(0, 0),
  size: new Vector2(144, 144),
  backgroundColor: 'clear',
  image: 'images/pebble.png',
});

watchFace.add(hackathon_logo);
watchFace.add(time_text);
watchFace.show();
//end watchface

prompt.action({
  up: 'images/yes.png',
  down: 'images/no.png',
});

prompt.on('click', 'up', function() {
  //send request to firebase
  //set interval
  showBodyMessage('Good Job');
});

prompt.on('click', 'down', function() {
  //send request to firebase
  showBodyMessage(' Its Ok. Pick back up the next hour');
});

function showBodyMessage(answerBody) {
    answer.body(answerBody);
    prompt.hide();
    answer.show();
    setTimeout(function(){
      watchFace.show();
      //end of the state
    }, 2000);
}



prompt.show();

// Send a long vibration to the user wrist
Vibe.vibrate('long');


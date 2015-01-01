//I need to take a closer look and try a few things, but my coworker (back home)
//said he was able to get Pebble.js to work with Firebase by adding "module.exports = Firebase;" 
//to the end of the firebase.js file. He also included this code snippet from his app.js:

var UI = require('ui');
var Firebase = require('firebase');
var chatMessages = [
    {title:'firebase chat!', subtitle:'with pebble' }
];
var main = new UI.Menu({ sections:[
    { name:'FireChat', items:chatMessages }
] });
var chatRef = new Firebase('https://fiery-fire-2493.firebaseio.com/chat');
chatRef.limit(5).on('child_added', function (snapshot) {
    var message = snapshot.val();
    console.log('Adding message: ' + JSON.stringify(message));
    chatMessages.unshift({ title:message.name, subtitle:message.text });
    main.items(0, chatMessages);
});
main.show();

// Show a menu so that the user can contribute to the conversation
main.on('select', function (e) {
    console.log('pushing another message');
    var replyMenu = new UI.Menu();

    var replies = [ 'Okay!', 'WontFix', 'Nope', 'cool', 'derp' ];
    var replyItems = new Array(0);
    replies.forEach(function (reply) {
        replyItems.push({ title:reply, select:function () {
            chatRef.push({ name:'pebble', text:reply });
            replyMenu.hide();
        } });
    });
    replyMenu.items(0, replyItems);
    replyMenu.show();
});



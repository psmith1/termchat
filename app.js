const term = require('terminal-kit').terminal;
const fs = require('fs');
const firebase = require("firebase");
require("firebase/firestore");
const moment = require('moment');

firebase.initializeApp({
    apiKey: "AIzaSyDkAmpGb1THWbDSQVMiofPh15-teOj_IO8",
    authDomain: "terminally-ill-8bae6.firebaseapp.com",
    databaseURL: "https://terminally-ill-8bae6.firebaseio.com",
    projectId: "terminally-ill-8bae6",
    storageBucket: "terminally-ill-8bae6.appspot.com",
    messagingSenderId: "872121545913",
    appId: "1:872121545913:web:7f66d524c187d90e611768"
  });

const db = firebase.firestore();

const logo = `

████████ ███████ ██████  ███    ███ ████████  █████  ██      ██   ██ 
   ██    ██      ██   ██ ████  ████    ██    ██   ██ ██      ██  ██  
   ██    █████   ██████  ██ ████ ██    ██    ███████ ██      █████  
   ██    ██      ██   ██ ██  ██  ██    ██    ██   ██ ██      ██  ██ 
   ██    ███████ ██   ██ ██      ██    ██    ██   ██ ███████ ██   ██ 
`


term.red(`${logo} \n`);

const user = {
    username: '',
}

const login = () => {
    term.bgBlack('enter a username \n');

    term.inputField({}, (err, input) => {
        if (input === 'Q') {
            process.exit();
        }
        else if (input === 'secret') {
            term.red('\n congratufuckinglations! You found me.\n')
        }
        user.username = input;
        term.green(`\n Your name is ${user.username} \n`);
        listenForMessages();
        chatBox();
    });
}

const chatBox = () => {
    const time = moment(db.collection.created).format('LLL')
    term.green(`> `);
    term.inputField({}, (err, input) => {
        if (input === 'Q') {
            process.exit();
        }
        else if (input === 'secret') {
            term.red('\ncongratufuckinglaions! You found me.')
        }
        else {
            db.collection("messages").add({
                user: user.username,
                message: input,
                created: firebase.firestore.Timestamp.now(),
                time: time
            })
            .then(function(docRef) {
                // console.log("Document written with ID: ", docRef.id);

            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        }
        term('\n');
        chatBox();
    });

}

term('\n');





const listenForMessages = () => {
    db.collection('messages').orderBy('created', 'desc').limit(20)
    .onSnapshot(function(snapshot) {
        term.clear();
        const messages = [];
        snapshot.forEach(doc => messages.push(doc.data()))
        messages.reverse().forEach(msg => {
            term.red(`${msg.user} on ${msg.time}: `);
            term(`${msg.message} \n`);
        })
        term.green(`> `);
    });
};


login();

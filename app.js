const term = require('terminal-kit').terminal;
const fs = require('fs');

const messages = JSON.parse(fs.readFileSync('messages.json'));

const http = require('http');

const hostname = '127.0.0.1';
const port = 2727;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

// term.moveTo( 3, 3 , "My name is %s, I'm %d.\n" , 'Jack' , 32 ) ;

// const dashes = "-----";
// const stars = "*****";
// const stripes = "=====";
// const slash = "/////";
// const backslash = "\\\\\\\\\\";

const logo = `

████████ ███████ ██████  ███    ███ ████████  █████  ██      ██   ██ 
   ██    ██      ██   ██ ████  ████    ██    ██   ██ ██      ██  ██  
   ██    █████   ██████  ██ ████ ██    ██    ███████ ██      █████   
   ██    ██      ██   ██ ██  ██  ██    ██    ██   ██ ██      ██  ██  
   ██    ███████ ██   ██ ██      ██    ██    ██   ██ ███████ ██   ██               
`


// term.clear();
// term.moveTo(1,4, "\\");
// term.moveTo(2,5, "\\");
// term.moveTo(3,6, "\\");
// term.moveTo(4,7, "\\");
// term.moveTo(5,8, "\\");
// term.moveTo(6,9, "\\\n");

term.red(logo);

const user = {
    username: '',
    message: ''
}


const login = () => {
    term.bgCyan('enter a username \n');
    term.inputField({}, (err, input) => {
        if (input === 'Q') {
            process.exit();
        } 
        else if (input === 'secret') { 
            term.red('\ncongratufuckinglations! You found me.')
        }
        user.username = input;
        term.green(`\nYour name is ${user.username} \n`);
        // process.exit();
        printMessages();
        chatBox();
    });

}

const chatBox = () => {
    term.bgCyan('message ->');
    term.inputField({}, (err, input) => {
        if (input === 'Q') {
            process.exit();
        }
        else if (input === 'secret') { 
            term.red('\ncongratufuckinglations! You found me.')
        }
        else {
            messages.messageList.push({
                user: user.username,
                message: input,
            })
            fs.writeFileSync('messages.json', JSON.stringify(messages));
        }
        term('\n');
        printMessages();
        chatBox();
    });

}

term('\n');
const printMessages = () => {
    messages.messageList.forEach(msg => {
        term.red(`${msg.user} : `);
        term(`${msg.message} \n`);
    });
}



login();
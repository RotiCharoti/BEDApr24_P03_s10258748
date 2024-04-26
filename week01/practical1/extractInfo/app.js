const path = require('node:path');

const notes = 'notes.txt';

path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

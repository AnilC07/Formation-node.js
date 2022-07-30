/* Synchrone */

const fs = require('fs');
const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textIn);
const textOut = `This is what we know about the avocado : ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt', textOut, 'utf8');
console.log('File written');

/* Asynchrone */

const fs = require('fs');
const textIn = fs.readFile('./txt/input.txt', 'utf-8', (err, data) => {
  console.log(data);
});
console.log('Reading file...');

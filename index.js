const fs = require('fs');
const http = require('http');

// // Syncronous - blocking 
// const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
// console.log(textInput);
// const textOutput = "Hello Vinoth I am NodeJs"; 
// fs.writeFileSync('./txt/output.txt',textOutput);
// console.log('File written');


// //Async - Non Blocking 

// fs.readFile('./txt/input.txt','utf-8',(err,data) => {
//     console.log(data);
//     fs.writeFile('./txt/output.txt','\n test data to wite','utf-8',(err) => {
//         console.log("file wrote");

//     })
// })



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

const server = http.createServer((req,res) => {
    const pathName = req.url;
    console.log(pathName);
    
    if (pathName === '/') {
        res.end("Root page or Home page");
    } else if(pathName === '/api'){
        fs.readFile(`${__dirname}/data/data.json`,"utf-8",(err,data) =>{
            const productData = JSON.parse(data);
            res.writeHead(200,{'content-type':'application/json'});
            res.end(data);
        })
        
    } else if (pathName === '/overview'){
        res.end("Root page or Overview page");
    }
    else {
        res.end("Page Not Found");
    }
    //res.end("Hello Vinoth I am Node Web Server !!!");
});

server.listen(8600, '127.0.0.1',()=> {
    console.log("Listing to the server Port is 8500");
});







const fs = require('fs');
const server = require('http').createServer();



server.on('request', (req,res)=> {
    // fs.readFile("./txt/input.txt", "utf-8", (err, data) => {
    //     if(err) console.log("Error!!");
    //     res.end(data);
    // });


    const readingFile = fs.createReadStream('./txt/input.txt');
    readingFile.on('data', chunk =>{
        res.write(chunk);
    });

    readingFile.on('end',()=>{
        res.end();
    })
});

server.listen(8000, "localhost",() => {
    console.log("Server Listening...")
})
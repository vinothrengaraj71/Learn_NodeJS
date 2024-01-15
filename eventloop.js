const fs = require('fs');


setTimeout(()=> {
    console.log("Timer 1 is finished"),0;
})

setImmediate(()=> {
    console.log("Immediate Timer is done");
})

const textData = fs.readFile(`${__dirname}/txt/input.txt`,"utf-8",(err,data)=>{
    console.log('Reading the file is done');
    console.log(data);
    setTimeout(()=> {
        console.log("Timer 2 is finished"),3000;
    })
    setTimeout(()=> {
        console.log("Timer 3 is finished"),0;
    })
    setImmediate(()=> {
        console.log("Immediate Timer is done");
    })
    
})

console.log('I should run first');

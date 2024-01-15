const eventEmitter = require('events');

const myEmitter = new eventEmitter();




myEmitter.on("newSale",()=>{
    console.log("There is a new sale")
})

myEmitter.on('newSale',()=>{
    console.log("Who made the sale")
})

myEmitter.on('newSale',(num)=>{
    console.log(`number of sale is ${num}`);
})

myEmitter.emit("newSale", 10);
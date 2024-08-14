const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(()=>{
        console.log('MongoDB connected successfully');
        console.log();
    }).catch((err)=>{
        console.error('Error connecting to MongoDB:', err.message);
        process.exit(1);
    })


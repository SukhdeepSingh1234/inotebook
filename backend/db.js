const mongoose=require('mongoose');
const mongoUri='mongodb://localhost:27017/inotebook'; // creating database inotebook

const connectToMongo= ()=>{
    mongoose.connect(mongoUri,()=>{
        console.log('Connected Successfully');
    })
}
module.exports=connectToMongo; 

// dbConnetioin--dbConnetioin.js
const mongoose=require('mongoose');

const dbConnection=async()=>{
    const mongoUrl='mongodb+srv://dnagender2019:ieRfLyWsWUdXwMto@cluster0.e2cau.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    await mongoose.connect(mongoUrl,{},console.log("mongoDb is connected"))
}

module.exports=dbConnection;



// ieRfLyWsWUdXwMto
const mongoose=require("mongoose");
const colors=require('colors');

const connMongo= async ()=>{
    try{
        let conn= await mongoose.connect(process.env.MONGO_URL)
            console.log(`Connected to the Mongodb database`.bgYellow);
        }
    
    catch(error){
        console.log('Couldnot connect to the database'.bgRed.white)
    }
}
module.exports=connMongo
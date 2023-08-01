const bcrypt=require('bcrypt');
exports.hashingPas= async(password)=>{
   try {
    saltRounds=10
    const hashedPass=await bcrypt.hash(password,saltRounds)
    return hashedPass
   } catch (error) {
    console.log(error)
   }
}


// Comparer
exports.comparePass= async(password,hashedPass)=>{
   try {
      return bcrypt.compare(password,hashedPass)
   } catch (error) {
      console.log(error)
   }
}
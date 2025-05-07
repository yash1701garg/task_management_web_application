const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)

    .then(()=>{console.log("DB CONNECTION SUCCESSFULL")})
    .catch((error)=>{console.log("Failed to connect database")
          console.log(error.mongoose)
          process.exit(1)
    })
}
module.exports= dbConnect;
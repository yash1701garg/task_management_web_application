const express = require('express');
const app = express();

require("dotenv").config();
 PORT = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

// app.use('/' , (req,res)=>{
//     res.send('Hello from backend Side');
// });

app.use(express.json());

const dbConnect = require('./config/database');
dbConnect();

const userRoute = require('./routes/user');
app.use('/api/v1', userRoute);



app.listen(PORT, ()=>{
    console.log(`Server started Successfully at port ${PORT}`);
})
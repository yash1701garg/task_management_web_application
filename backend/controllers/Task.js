const userInfo = require('../models/user');
const taskInfo = require('../models/task');

exports.userTask = async(req,res)=>{

    try{
         const {title,desc}= req.body;
         const userid = req.headers.id; 

        const newTask = await taskInfo.create({title,desc});

        

        const updateTask = await userInfo.findByIdAndUpdate(userid ,{$push:{tasks:newTask._id}}, {new:true} )
            .populate('tasks')
            .exec();

        res.status(200).json({
            success:true,
            message:"Task Created",
            task:updateTask
        })
    }

    catch(err){

        console.log(err);
        return res.status(400).json({
            success:false,
            message:"Internal Server Error"
        })


    }

   


}
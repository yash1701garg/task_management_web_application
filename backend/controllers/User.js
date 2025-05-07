const userInfo = require('../models/user');
const taskinfo= require('../models/task');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
 

exports.signIn = async(req,res)=>{

    try{
        const {username , email, password}= req.body
        const existingUser = await userInfo.findOne({username});
        const existingEmail = await userInfo.findOne({email});
        

        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User already exist'
            })
        }
        else if(username.length<4){
            return res.status(400).json({
                success:false,
                message:'Username must have at least 4 characters'
            })
        }

        
        if(existingEmail){
            return res.status(400).json({
                success:false,
                message:'Email already ragisterd ! Please Login'
            })
        }

        const hashedPass = await bcrypt.hash(password,10);

        const newUser = await userInfo.create({
            username,email,password:hashedPass
        })

        return res.status(200).json({
            success:true,
            message:'Signed In'
        })
       
     }
     catch(err){

        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Internal Server Error"
        });

     }

   
}

exports.logIn = async(req,res)=>{
    const {username, password}= req.body;

    const existingUser = await userInfo.findOne({username});

    if(!existingUser){
        return res.status(400).json({
            success:false,
            message:'Username or password is incorrect'
        })
    }

    if(await bcrypt.compare(password,existingUser.password)){

        //provide jwt token 

       const payload={
        name:username,
        jti: jwt.sign({}, "Tcm123")
       }
       
       

        
        const token = jwt.sign(payload, "Tcm123" , {expiresIn:"2d"});
        res.status(200).json({
            id:existingUser._id,
            token:token
        });
        // existingUser.email= undefined;
        // existingUser.password= undefined

    }
    else {

        return res.status(400).json({
            success:false,
            message:'Username or password is incorrect'
        })

    }
 
}

exports.getAllTasks= async(req,res)=>{

    try{
         
        const{id}= req.headers;
        const {email, password}= req.body;

        // const existingUser = await userInfo.findOne({email});
        const userData = await userInfo.findById(id).populate({path:'tasks', options:{sort:{createdAt:-1}}} );
      
        userData.password = undefined;
        

        res.status(200).json({
            alltasks:userData
        })


    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:'Username or password is incorrect'
        })


    }
}


exports.deleteTasks= async(req,res)=>{

    try{
         
        const id= req.params.id;
        const userId = req.headers.id;

         const deleteTask=  await taskinfo.findByIdAndDelete(id);

        await userInfo.findByIdAndUpdate(userId, {$pull:{tasks:deleteTask._id}} , {new:true});


  
        res.status(200).json({
            message:"Task Deleted"
        })


    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server Error in Deletion'
        })
    }
}


exports.updateTasks= async(req,res)=>{

    try{
         
        const id= req.params.id;
        const {title,desc}= req.body;
       
         const updateTask=  await taskinfo.findByIdAndUpdate(id , {title,desc});
          
        res.status(200).json({

            message:"Task Updated",
            updatedTask:updateTask
            
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server Error in Updation'
        })
    }
}


//importatnt task

exports.importantTasks= async(req,res)=>{

    try{
         
        const id= req.params.id;
        const taskData = await taskinfo.findById(id);
        const impTask = taskData.important;

        
       
          await taskinfo.findByIdAndUpdate(id , {important: !impTask});
          
        res.status(200).json({

            message:" Imp Task Updated",         
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server Error in Updation of imp task'
        })
    }
}

//completed task

exports.completeTasks= async(req,res)=>{

    try{
         
        const id= req.params.id;
        const taskData = await taskinfo.findById(id);
        const compTask = taskData.complete;
     
         await taskinfo.findByIdAndUpdate(id , {complete: !compTask});
          
        res.status(200).json({

            message:" comp Task Updated",         
        })

    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server Error in Updation of complete task'
        })
    }
}

//get imp tasks

exports.getimpTasks= async(req,res)=>{

    try{
         
        const{id}= req.headers; 
        const data = await userInfo.findById(id).populate({path:'tasks', match:{important:true}, options:{sort:{createdAt:-1}}} );

        const impTaskData = data.tasks;
        

        res.status(200).json({
            success:true,
            imptasks:impTaskData
        })


    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server error in getting imp task'
        })


    }
}

 
//get comp task

exports.getCompTasks= async(req,res)=>{

    try{
         
        const{id}= req.headers; 
        const data = await userInfo.findById(id).populate({path:'tasks', match:{complete:true}, options:{sort:{createdAt:-1}}} );
        
        const compTaskData = data.tasks;

       

        res.status(200).json({
            success:true,
            comptasks:compTaskData
        })


    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server error in getting comp task'
        })


    }
}


//get incomplete tasks 

exports.getinCompTasks= async(req,res)=>{

    try{
         
        const{id}= req.headers; 
        const data = await userInfo.findById(id).populate({path:'tasks', match:{complete:false}, options:{sort:{createdAt:-1}}} );
        
        const IncompTaskData = data.tasks;
        res.status(200).json({
            success:true,
            Incomptasks:IncompTaskData
        })


    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:'Server error in getting comp task'
        })


    }
}


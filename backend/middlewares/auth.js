const jwt = require('jsonwebtoken');

exports.auth=(req,res,next)=>{

    try{

        const token = req.headers['authrization'];
        if(!token){
            return res.status(401).json({
                message:"token missing"
            });
        }

        try{

            const decode = jwt.verify(token , "Tcm123");

            req.user = decode;
            next();

        }
        catch(err){

            return res.status(401).json({
                message:"token incorrect"
            });
        }

    }
    catch(err){

        return res.status(401).json({
            message:"Internal Server error"
        });

    }
}
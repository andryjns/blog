const jwt = require('jsonwebtoken')
const user = require('./../models/user')


function isLogin(req,res,next){
    jwt.verify(req.headers.access_token, process.env.JWT_SECRET, function(err, decoded) {
        console.log(decoded);
        
        user.findOne({
            _id : decoded._id,
            name : decoded.name,
            email : decoded.email,    
            password : decoded.password  
        })
        .then(data=>{
            if(data!==null||data!==undefined){
                req.decoded = decoded;
                next();
            }
            else{
                res.status(204).json({
                    msg : "Not yet login"
                })
            }
            
        })
    });
}

module.exports = isLogin;
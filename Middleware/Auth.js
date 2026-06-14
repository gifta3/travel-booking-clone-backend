const jwt=require('jsonwebtoken');

const auth=(req,res,next)=>{
const token=req.headers.authorization;
console.log(token);
if(token){
    const ogtoken=auth.split(" ")[1];
    const data = jwt.verify(ogtoken,process.env.JWT_SECRET);
    console.log(data);
    req.user=data;
    next();
}else{
return res.send('log in');
}
}

module.exports=auth;
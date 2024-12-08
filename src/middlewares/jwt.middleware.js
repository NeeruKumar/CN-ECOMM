import jwt from "jsonwebtoken";
const jwtAuth=(req,res,next)=>{
    const token=req.headers['authorization'];

    if(!token){
        return res.status(401).send("Unauthorized");
    }

    try{
        const payload=jwt.verify(token,"gmjNiExB~8,8O&E");
        console.log(payload);
        req.userId=payload.userID;
    }catch(err){
        console.log(err);
        return res.status(401).send("Unauthorized");
    }
    next();
}

export default jwtAuth;//671a611907ace758f0934feb //671a611907ace758f0934feb
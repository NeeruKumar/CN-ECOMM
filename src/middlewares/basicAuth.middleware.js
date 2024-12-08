import UserModel from "../features/user/user.model.js";
const basicAuth=(req,res,next)=>{

    const authHeader=req.headers["authorization"];
    console.log(req.headers);
    console.log(authHeader);
//Basic YWJjQGdtYWlsLmNvbToxMjM0
    if(!authHeader){
        return res.send("Header details not found");
    }
    const base64Creds=authHeader.replace('Basic ','');

    const decodedData=Buffer.from(base64Creds,'base64').toString('utf8');
    console.log(decodedData);
    //abc@gmail.com:1234
    const creds=decodedData.split(":");

    const user=UserModel.signIn(creds[0],creds[1]);
    if(user){
        next();
    }else{
        return res.status(400).send("Incorrect Creds");
    }
}

export default basicAuth;
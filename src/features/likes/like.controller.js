import { LikeRepository } from "./like.repository.js";


export class LikeController{

    async likeItem(req,res){
        try{
            const {id,type}=req.body;
            if(type=='products'){
                await LikeRepository.likeProduct(req.userId,id);
            }else{
                await LikeRepository.likeCategory(req.userId,id);
            }
            return res.status(200).send("Liked item Added");
            
        }catch(err){
            console.log(err);
        }
    }

}
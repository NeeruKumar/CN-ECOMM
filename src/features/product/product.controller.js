import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController{

    async getAllProducts(req,res,next){
        try{
            const products=await ProductRepository.getAll();
            return res.status(200).send(products);
          }catch(err){
            console.log(err);
            next(err);
          }
    }

    async addProduct(req,res,next){
      try{
        const {name, price, desc, categories,sizes}=req.body;
        const newProduct=new ProductModel(name,desc,parseFloat(price),"/upload/"+req.file.filename,categories,sizes.split(','));
        const createdProduct=await ProductRepository.add(newProduct);
        res.status(200).send(createdProduct);
      }catch(err){
        console.log(err);
        next(err);
      }
    }

    async getOneProduct(req,res){
        const id=req.params.id;
        const product=await ProductRepository.get(id);
        if(!product){
            res.status(404).send("Product Not Found")
        }else{
            return res.status(200).send(product);
        }
    }

    
    async filterProduct(req,res){
        const minPrice=req.query.minPrice;
        const category=req.query.category;
        const filteredprod=await ProductRepository.filter(minPrice,category);
        res.status(200).send(filteredprod);
    }

    async rateProduct(req,res,next){
        try{
            const userId=req.userId;
            const productId=req.query.productId;
            const rating=req.query.rating;
            await ProductRepository.rateProduct(userId,productId,rating);
            return res.status(200).send("Rating added successfully")
        }catch(err){
            
            next(err);
        }
        
    
        // const data=ProductModel.rateProduct(userId,productId,rating);
        // console.log(data);
        // if(data){
        //     return res.status(400).send(data);
        // }else{
        //     res.status(200).send("Rating added successfully");
        // }

    }
    async averagePrice(req,res,next){
      try{
        const result=await ProductRepository.averageProductPricePerCategory();
        res.status(200).send(result);
      }catch(err){
        next(err);
      }
    }
}
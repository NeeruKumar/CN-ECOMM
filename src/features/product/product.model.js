import { ApplicationError } from "../../error-handler/applicationError.js";
import UserModel from "../user/user.model.js";
export default class ProductModel{
    constructor( name, desc, price, imageUrl, category, sizes,id){
        this._id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageUrl=imageUrl;
        this.category=category;
        this.sizes=sizes;
    }

    static GetAll(){
        return products;
    }
    static add(productObj){
      productObj.ide=products.length+1;
      products.push(productObj);
      return productObj;
    }

    static get(id){
      const product=products.find((prod)=>prod.ide==id);
      return product;
    }


    
    static filter(minPrice, maxPrice){
      const result=products.filter((prod)=>{
        return (prod.price >= minPrice && prod.price <= maxPrice)
      });
      return result;
    }



    static rateProduct(userId,productId,rating){
      const user=UserModel.getAll().find((user)=>user.id==userId);
      if(!user){
        throw new ApplicationError("User not found",404);
      }

      const product=products.find((prod)=>prod.ide==productId);
      if(!product){
        //return "Product not found";
        //throw new Error("Product not found");
        throw new ApplicationError("Product not found",400);
      }
      if(!product.ratings){
        product.ratings=[];
        product.ratings.push({
          userId:userId,
          rating:rating,
        });
      }else{
        product.ratings.push({
          userId:userId,
          rating:rating,
        });
      }
      console.log(product);
    }

    
} 

var products = [
    new ProductModel(
      1,
      'Product 1',
      'Description for Product 1',
      19.99,
      'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
      'Cateogory1',
      ['M', 'XL']
    ),
    new ProductModel(
      2,
      'Product 2',
      'Description for Product 2',
      29.99,
      'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
      'Cateogory2',
      ['M', 'XL']
    ),
    new ProductModel(
      3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
      'Cateogory3',
      ['M', 'XL','S']
    )];
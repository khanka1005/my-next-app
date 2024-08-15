import { fetchProducts } from '@/app/lib/data';
import { connectToDB } from '@/app/lib/utils';

export const fetchProduct =async (id)=>{
    try{
        connectToDB()
        const product=await Product.findById(id);
        return product;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch product!");
    }
};
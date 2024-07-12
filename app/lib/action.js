"use server"
import { revalidatePath } from "next/cache";
import {User,Product} from "./models"
import { redirect } from "next/navigation";
import {connectToDB} from "./utils"
import bcrypt from "bcrypt";
export const addUser=async (formData)=>{
    
    const {username, email, password, phone, address, isAdmin, isActive}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        const salt= await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newUser=new User({
            username, email, password:hashedPassword, phone, address, isAdmin, isActive
        });
        await newUser.save();
    }catch(err){
        console.log(err);
        throw new Error("Failed to create user");
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
};
export const uptadeUser=async (formData)=>{
    
    const {id,username, email, password, phone, address, isAdmin, isActive}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        
        const uptadeFields={
            username, email, password, phone, address, isAdmin, isActive
        }
        Object.keys(uptadeFields).forEach(
            key=>
            (uptadeFields[key]==="" || undefined) && delete uptadeFields[key]);

            await User.findByIdAndUpdate(id,uptadeFields);


    }catch(err){
        console.log(err);
        throw new Error("Failed to uptade user");
    }
    revalidatePath("/dashboard/users")
    redirect("/dashboard/users")
};
export const uptadeProduct=async (formData)=>{
    
    const {id,title,desc,price,stock,color,size}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        
        const uptadeFields={
            title,desc,price,stock,color,size
        }
        Object.keys(uptadeFields).forEach(
            key=>
            (uptadeFields[key]==="" || undefined) && delete uptadeFields[key]);

            await User.findByIdAndUpdate(id,uptadeFields);
            

    }catch(err){
        console.log(err);
        throw new Error("Failed to uptade product");
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
};

export const addProduct=async (formData)=>{
    
    const {title,desc,price,stock,color,size}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        

        const newProduct=new Product({
            title,desc,price,stock,color,size
        });
        await newProduct.save();
    }catch(err){
        console.log(err);
        throw new Error("Failed to create product");
    }
    revalidatePath("/dashboard/products")
    redirect("/dashboard/products")
};

export const deleteProduct=async (formData)=>{
    
    const {id}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        
        await Product.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
        throw new Error("Failed to delete product");
    }
    revalidatePath("/dashboard/products")
   
};

export const deleteUser=async (formData)=>{
    
    const {id}=
    Object.fromEntries(formData);
    try{
        connectToDB();
        
        await Product.findByIdAndDelete(id)
    }catch(err){
        console.log(err);
        throw new Error("Failed to delete user");
    }
    revalidatePath("/dashboard/users")
   
};
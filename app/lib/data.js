
import {User, Product} from "./models"
import {connectToDB} from "./utils"

  
export const fetchUsers =async (q, page) =>{
    
    const regex= new RegExp(q,"i");
    const ITEM_PER_PAGE=2;
    try{
        connectToDB()
        const count=await User.find({username:{$regex:regex}}).count();

        const users= await User.find({username:{$regex:regex}}).limit(ITEM_PER_PAGE).skip(ITEM_PER_PAGE*(page-1));
        return {count,users};
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};
export const fetchUser =async (id)=>{
    try{
        connectToDB()
        const user=await User.findById(id);
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch users!");
    }
};

export const fetchProducts =async (q, page)=>{
    
    const regex= new RegExp(q,"i");
    const ITEM_PER_PAGE=2;
    try{
        connectToDB()
        const count=await Product.find({title:{$regex:regex}}).count();
        const products= await Product.find({title:{$regex:regex}})
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE*(page-1));

        return {count,products};
    }catch(err){
        console.log(err);
        throw new Error("Failed to fetch products!");
    }
};

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
export const fetchCardProducts = async (q, page) => {
    const regex = new RegExp(q, "i");
    const ITEM_PER_PAGE = 1;
  
    try {
      connectToDB();
      const count = await Product.find({ title: { $regex: regex } }).count();
      const products = await Product.find({ title: { $regex: regex } })
        .limit(ITEM_PER_PAGE)
        .skip(ITEM_PER_PAGE * (page - 1))
        .lean()
        .exec(); // Convert Mongoose documents to plain objects
        const plainProducts = products.map(product => ({
            _id: product._id.toString(),
            title: product.title,
            desc: product.desc,
            price: product.price,
            createdAt: product.createdAt.toISOString(),
            stock: product.stock,
            img: product.img,
          }));
      
          return { count, products: plainProducts };
    } catch (err) {
      console.log(err);
      throw new Error("Failed to fetch products!");
    }
  };
  // Update fetchAProducts function in your data fetching file
  // lib/data.ts
export const fetchAProducts = async (q, page, cat) => {
    const regex = new RegExp(q, "i");
    const ITEMS_PER_PAGE = 2;

    try {
        await connectToDB();

        const query = { title: { $regex: regex } };
        if (cat && cat !== "all") {
            query.cat = cat;
        }

        const count = await Product.countDocuments(query);
        const products = await Product.find(query)
            .limit(ITEMS_PER_PAGE)
            .skip(ITEMS_PER_PAGE * (page - 1))
            .lean()
            .exec();

        const formattedProducts = products.map(product => ({
            _id: product._id.toString(),
            title: product.title,
            desc: product.desc,
            price: product.price,
            createdAt: product.createdAt.toISOString(),
            stock: product.stock,
            img: product.img || "",
        }));

        return { count, products: formattedProducts };
    } catch (err) {
        console.error("Error fetching products:", err);
        throw new Error("Failed to fetch products!");
    }
};



export { Product };

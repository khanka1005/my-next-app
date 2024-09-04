import React from 'react';

import styles from '@/app/ui/dashboard/products/addProduct/addProduct.module.css';
import { addProduct } from '@/app/lib/action';

const AddProductPage = () => {
  return (
    <div className={styles.container}>
      <form action={addProduct} className={styles.form}>
        <input type="text" placeholder='title' name='title' required />
        <input type="text" placeholder='cat' name='cat' required />
        <input type="number" name="price" placeholder='price' />
        <input type="number" name="stock" placeholder='stock' />
        <input type="text" name="color" placeholder='color' />
        <input type="text" name="size" placeholder='size' /> 
        <textarea name="desc" id="desc" rows={8} placeholder='Description'></textarea>
        
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;
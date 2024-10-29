'use client';
import React, { useState } from 'react';
import styles from '@/app/ui/dashboard/products/addProduct/addProduct.module.css';

const AddProductPage = () => {
  const [state, setState] = useState('ready');
  const [file, setFile] = useState<File | undefined>();

  async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Handle image upload to Cloudinary
    let imgUrl = '';
    if (file) {
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default'); // Ensure this preset exists in Cloudinary
      
      try {
        const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dd2vmdtav/image/upload', {
          method: 'POST',
          body: formData,
        }).then((r) => r.json());
  
        console.log('Cloudinary upload result:', uploadResponse);
        imgUrl = uploadResponse.secure_url; // Use this URL
      } catch (error) {
        console.error('Error uploading image:', error);
        setState('error');
        return;
      }
    }
  
    // Prepare data to send to your API route
    const productData = {
      title: formData.get('title'),
      cat: formData.get('cat'),
      desc: formData.get('desc'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      color: formData.get('color'),
      size: formData.get('size'),
      img: imgUrl,
    };
  
    // Submit product data to your API route
    try {
      const response = await fetch('/api/add-product', {
        method: 'POST',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Product added result:', result);
        setState('sent');
        // Redirect to products page after successful submission
        window.location.href = '/dashboard/products'; // Client-side redirection
      } else {
        throw new Error('Product submission failed');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setState('error');
    }
  }
  

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & { files: FileList };
    setFile(target.files ? target.files[0] : undefined);
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <input type="text" placeholder='title' name='title' required />
        <input type="text" placeholder='cat' name='cat' required />
        <input type="number" name="price" placeholder='price' />
        <input type="number" name="stock" placeholder='stock' />
        <input type="text" name="color" placeholder='color' />
        <input type="text" name="size" placeholder='size' />
        <textarea name="desc" id="desc" rows={8} placeholder='Description'></textarea>
        
        <input type="file" name='image' onChange={handleOnChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default AddProductPage;

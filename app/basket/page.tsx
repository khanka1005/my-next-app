"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useBasket } from '@/app/context/BasketContext';
import Navbar from '@/app/components/Basketnav';
import styles from '@/app/basket/basket.module.css';

export interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: string;
  stock: number;
  img?: string;
}

const Basket: React.FC = () => {
  const { basket, quantities, removeFromBasket, updateQuantity } = useBasket();
  const router = useRouter();

  const handleQuantityChange = (productId: string, newQuantity: number | string) => {
    if (newQuantity === '' || isNaN(Number(newQuantity))) {
      updateQuantity(productId, '');
    } else {
      const quantity = Math.max(1, parseInt(newQuantity.toString(), 10));
      updateQuantity(productId, quantity);
    }
  };

  const handleProceedToPayment = () => {
    router.push('/qpay');
  };

  const getTotalPrice = () => {
    return basket.reduce((total, product) => {
      const quantity = parseInt(quantities[product._id] as string, 10) || 1;
      return total + product.price * quantity;
    }, 0);
  };

  return (
    <div>
      <div className={styles.Navbar}><Navbar /></div>
      
      <div className={`container ${styles.container}`}>
       
        {basket.length === 0 ? (
          <p className={styles.para}>Your basket is empty.</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              {basket.map((product: Product) => (
                <div key={product._id} className={`card mb-4 ${styles.card}`}>
                  <div className="row g-0">
                    <div className="col-md-4">
                      <Image
                        src={product.img || "/noproduct.jpg"}
                        alt={product.title}
                        className={`img-fluid rounded-start ${styles.imgFluid}`}
                        width={320}
                        height={240}
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className={`card-body ${styles.cardBody}`}>
                        <h5 className={`card-title ${styles.cardTitle}`}>{product.title}</h5>
                        <p className={`card-text ${styles.cardText}`}>{product.desc}</p>
                        <p className={`card-text ${styles.cardText}`}><strong>₮{product.price}</strong></p>
                        <div className={`input-group mb-3 ${styles.inputGroup}`}>
                          <input
                            type="number"
                            className="form-control"
                            value={quantities[product._id] === '' ? '' : quantities[product._id]}
                            min={1}
                            max={product.stock}
                            onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                          />
                        </div>
                        <button
                          className={`btn btn-danger ${styles.btnDanger}`}
                          onClick={() => removeFromBasket(product._id)}
                        >
                          Remove from Basket
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h3 className={styles.totalPrice}>Total: ${getTotalPrice().toFixed(2)}</h3>
              <button className={`btn btn-success btn-lg ${styles.btnSuccess}`} onClick={handleProceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;

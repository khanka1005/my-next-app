"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { Image } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import { useBasket } from '@/app/context/BasketContext';
import Navbar from '@/app/components/Navbar';
import styles from '@/app/basket/basket.module.css';

export interface Product {
  _id: string;
  title: string;
  desc: string;
  price: number;
  createdAt: string;
  stock: number;
  img?: string;
  quantity?: number;
}

const Basket: React.FC = () => {
  const { basket, quantities, removeFromBasket, updateQuantity, clearBasket } = useBasket();
  const router = useRouter();

  const handleQuantityChange = (productId: string, newQuantity: number | string) => {
    if (newQuantity === '' || isNaN(Number(newQuantity))) {
      updateQuantity(productId, 1); 
    } else {
      const quantity = Math.max(1, Math.min(Number(newQuantity), basket.find(p => p._id === productId)?.stock || Infinity));
      updateQuantity(productId, quantity);
    }
  };

  const handleProceedToPayment = () => {
    router.push('/qpay');
  };

  const getTotalPrice = () => {
    return basket.reduce((total, product) => {
      const quantity = quantities[product._id] || 1;
      return total + product.price * quantity;
    }, 0);
  };

  return (
    <div>
      <Navbar />

      <div className={`container ${styles.container}`}>
        <h2 className={styles.shoppingCartTitle}>САГС</h2>

        {basket.length === 0 ? (
          <p className={styles.para}>Сагс хоосон байна.</p>
        ) : (
          <div>
            <table className={`table ${styles.table}`}>
              <thead>
                <tr>
                  <th>БҮТЭЭГДЭХҮҮН</th>
                  <th>ҮНИЙН ДҮН</th>
                  <th>ТОО ШИРХЭГ</th>
                  <th>НИЙТ</th>
                </tr>
              </thead>
              <tbody>
                {basket.map((product: Product) => (
                  <tr key={product._id}>
                    <td>
                      <div className={styles.productDetails}>
                        <Image
                          src={product.img || "/noproduct.jpg"}
                          alt={product.title}
                          width={100}
                          height={100}
                          style={{ objectFit: 'cover', borderRadius: '8px' }}
                        />
                        <div>
                          <p className={styles.productTitle}>{product.title}</p>
                          <button
                            className={`btn btn-link ${styles.removeButton}`}
                            onClick={() => removeFromBasket(product._id)}
                            aria-label="Remove item"
                            >
                            <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                        </div>
                      </div>
                    </td>
                    <td>₮{product.price}</td>
                    <td>
                      <div className={styles.quantityControl}>
                        <button 
                          className={styles.quantityButton} 
                          onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) - 1)}
                          disabled={(quantities[product._id] || 1) <= 1}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className={styles.quantityInput}
                          value={quantities[product._id] || 1}
                          onChange={(e) => handleQuantityChange(product._id, e.target.value)}
                        />
                        <button 
                          className={styles.quantityButton} 
                          onClick={() => handleQuantityChange(product._id, (quantities[product._id] || 1) + 1)}
                          disabled={(quantities[product._id] || 1) >= product.stock}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>₮{(product.price * (quantities[product._id] || 1)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.clearCartButtonContainer}>
              <button className={`btn btn-outline-danger ${styles.clearCartButton}`} onClick={clearBasket}>
                Сагсийг устгах
              </button>
            </div>
            <div className={styles.summaryContainer}>
              <h4>Нийт Үнэ: ₮{getTotalPrice().toFixed(2)}</h4>
              <p>Хүргэлт Багтсан Болно</p>
              <button className={`btn btn-outline-primary ${styles.checkoutButton}`} onClick={handleProceedToPayment}>
                Төлөх
              </button>
              <button className={`btn btn-link ${styles.continueShoppingButton}`} onClick={() => router.push('/')}>
                &larr; Үргэлжлүүлэн Худалдаа хийх
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;
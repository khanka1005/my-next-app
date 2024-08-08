"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { useBasket } from '@/app/context/BasketContext'; // Adjust the path as necessary
import Navbar from '@/app/components/Navbar';


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

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    updateQuantity(productId, newQuantity);
  };

  const handleProceedToPayment = () => {
    // Logic to handle proceeding to QPay or another payment method
    router.push('/qpay'); // Adjust the path to your QPay integration page
  };

  const getTotalPrice = () => {
    return basket.reduce((total, product) => total + product.price * (quantities[product._id] || 1), 0);
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <h1>Your Basket</h1>
        {basket.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <div className="row">
            <div className="col-md-8">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total Price</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((product: Product) => (
                    <tr key={product._id}>
                      <td>
                        <Image
                          src={product.img || "/noproduct.jpg"}
                          alt={product.title}
                          style={{ width: '100px', height: 'auto' }}
                        />
                        <p>{product.title}</p>
                      </td>
                      <td>${product.price}</td>
                      <td>
                        <input
                          type="number"
                          className="form-control"
                          value={quantities[product._id]}
                          min={1}
                          max={product.stock}
                          onChange={(e) =>
                            handleQuantityChange(product._id, parseInt(e.target.value))
                          }
                        />
                      </td>
                      <td>${product.price * quantities[product._id]}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => removeFromBasket(product._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Payment Information</h5>
                  <p className="card-text">Total Price: ${getTotalPrice()}</p>
                  <button className="btn btn-primary" onClick={handleProceedToPayment}>
                    Proceed to QPay
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basket;

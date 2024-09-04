import React from 'react';
import Image from 'next/image';
import { FaShoppingBasket } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

import { Product } from '@/app/scroll/scroll'; 

import {truncateText} from '../lib/truncateText';
import styles from './ProductCard.module.css'; 

interface ProductCardProps {
  product: Product;
  onAddToBasket: (product: Product, e: React.MouseEvent) => void;
  addedToBasket: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToBasket, addedToBasket }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div
      className={styles.cardContainer} 
      style={{
        transition: 'transform 0.3s ease-in-out', 
      }}
    >
      <div
        className="card"
        style={{
          height: '400px',
          width: 'auto',
          borderRadius: '15px',
          overflow: 'hidden',
          cursor: 'pointer',
          margin: '0 auto',
          textAlign: 'center',
        }}
        onClick={handleCardClick}
      >
        <div style={{ height: '270px', overflow: 'hidden' }}>
          <Image
            className="card-img-top"
            src={product.img || "/noproduct.jpg"}
            alt={product.title}
            width={350}
            height={270}
            style={{ objectFit: 'cover', height: '100%' }}
          />
        </div>

        <div className="card-body">
          <h5
            className="card-title"
            style={{
              fontSize: '1.25rem',
              fontWeight: 'bold',
              height: '2.5rem', 
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {truncateText(product.title)}
          </h5>
          <p
            className="card-text"
            style={{ fontSize: '1.1rem', fontWeight: 'bold', height: '1.5rem' }}
          >
            {product.price}₮
          </p>
         
          <hr />
          <button
            className="btn btn-success"
            style={{
              borderRadius: '30px',
              width: '70%',
              backgroundColor: 'green',
              fontSize: '1rem',
              height: '2.5rem', 
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
            onClick={(e) => onAddToBasket(product, e)}
            disabled={addedToBasket}
          >
            <FaShoppingBasket size={20} /> {addedToBasket ? 'Сагсанд Орсон' : 'Сагс-руу Хийх'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

import React from 'react';
import { Image, Rate } from 'antd';

import ShopNavbar from '@/app/components/Navbar';
import { fetchProduct } from '@/app/lib/data';

const SingleProductPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const product = await fetchProduct(id);
  
  return (
    <div>
      <ShopNavbar />
      <div className="container mt-5">
        <div className="d-flex align-items-center mb-4">
          <p className="text-muted mb-0">
            {product.category} / <strong>{product.category}</strong>
          </p>
        </div>
        <div className="row">
          <div className="col-md-6">
            <Image
              src={product.img || "/noproduct.jpg"}
              alt={product.title}
              width={320}
              height={240}
              style={{ objectFit: 'cover', borderRadius: '10px' }}
            />
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between align-items-center">
              <h2 style={{ fontWeight: 'bold' }}>{product.title}</h2>
              <div
                style={{
                  fontWeight: 'bold',
                  backgroundColor: '#f8f9fa',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                Үнэ: ${product.price}
              </div>
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: product.desc.replace(/\n/g, '<br />')
              }}
            />
            <Rate disabled defaultValue={4} />
            <p>Үлдэгдэл бараа: {product.stock}ш</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;

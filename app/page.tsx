// pages/index.js
"use client";

import React from 'react';
import { Container } from 'react-bootstrap';

import ShopNavbar from '@/app/components/Navbar';
import Footer from '@/app/components/footer';
import ProductCarousel from '@/app/components/ProductCarousel';
import styles from "@/app/components/viewPro.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <ShopNavbar />
      <Container className="mt-5">
        <h1>Welcome to My Online Shop</h1>
        <ProductCarousel />
        
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;

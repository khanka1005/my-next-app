// page.tsx
import React from 'react';
import { Container } from 'react-bootstrap';

import ShopNavbar from '@/app/components/Navbar';
import Footer from '@/app/components/footer';
import styles from "@/app/components/viewPro.module.css";
import ProductView from "@/app/productView/page";

export interface SearchParams {
  page?: number;
  q?: string;
}
interface HomePageProps {
  searchParams: SearchParams;
}

const HomePage: React.FC<HomePageProps> = ({ searchParams }) => {
  return (
    <div className={styles.container}>
      <ShopNavbar />
      
      <Container className="mt-5">
        <h1>Welcome to My Online Shop</h1>
        <ProductView searchParams={searchParams} />
      </Container>
      
    </div>
  );
};

export default HomePage;

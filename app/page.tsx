
import React from 'react';

import Container  from '@/app/Container';
import ShopNavbar from '@/app/components/Navbar';
import styles from "@/app/components/viewPro.module.css";
import ProductView from "@/app/productView/page";

import HomeBanner from './nav/HomeBanner';
import Category from './ui/dashboard/category/category';

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
      <Category/>
      <Container>
      <HomeBanner/>
        <ProductView searchParams={searchParams} />
      </Container>
      
    </div>
  );
};

export default HomePage;

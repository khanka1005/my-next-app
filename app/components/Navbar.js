"use client";
import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaShoppingBasket, FaSignInAlt} from 'react-icons/fa';
import Image from 'next/image';
import { Affix } from 'antd';

import Container  from '@/app/Container';
import { useBasket } from '@/app/context/BasketContext'; 
import styles from "@/app/components/ShopNavbar.module.css";



const ShopNavbar = () => {
  const router = useRouter();
  const { basket } = useBasket();

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleBasketClick = () => {
    router.push('/basket');
  };

  return (
    <div>
      
 <Affix>      
        {/* Logo and Icons Container */}
        <div className={styles.logoAndIconsContainer}>
       
          <Navbar variant="light" expand="lg" className={styles.navbar}>
           
              <Navbar.Brand href="/" className={styles.navbarBrand}>
                <Image 
                src="/logo.png"
                width={0} 
                height={0}
                 sizes="100vw"
                style={{ width: '180', height: 'auto' }} 
                alt="Logo" 
                className={styles.logo} />

              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>
                <Nav>
                
                  <Nav.Link onClick={handleLoginClick}>
                    <FaSignInAlt className={styles.loginIcon} size={24} />
                  </Nav.Link>
                  <Nav.Link onClick={handleBasketClick} className={styles.basketIcon}>
                    <FaShoppingBasket size={24} />
                    {basket.length > 0 && (
                      <span className={styles.basketCounter}>{basket.length}</span>
                    )}
                    
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
           
            
          </Navbar>
        </div>
      </Affix>
      
    </div>
  );
};

export default ShopNavbar;

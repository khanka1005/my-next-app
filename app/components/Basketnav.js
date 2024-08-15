"use client";
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import { FaShoppingBasket, FaSignInAlt, FaFacebookF, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';

import { useBasket } from '@/app/context/BasketContext'; // Adjust the path as necessary
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
    <div className={styles.mainContainer}>
      {/* Overlay Content */}
      <div >
        {/* Logo and Icons Container */}
        <div className={styles.logoAndIconsContainer}>
          <Navbar variant="light" expand="lg" className={styles.navbar}>
            <Container>
              <Navbar.Brand href="/" className={styles.navbarBrand}>
                <Image
                 src="/logo.png"
                 alt="Logo"
                 width={180}
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
            </Container>
          </Navbar>
        </div>
      </div>
    </div>
  );
};

export default ShopNavbar;

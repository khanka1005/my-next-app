// components/Navbar.js
"use client";
import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useRouter } from 'next/navigation';

const ShopNavbar = () => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <Navbar style={{ backgroundColor: '#add8e6' }} variant="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">My Online Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ShopNavbar;

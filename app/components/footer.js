// components/Footer.js
"use client";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#add8e6' }} className="text-light py-3">
      <Container>
        <Row>
          <Col>&copy; 2024 My Online Shop</Col>
          <Col className="text-end">Contact: info@myonlineshop.com</Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

'use client'

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from "./menuLink.module.css";
import PropTypes from 'prop-types';

const MenuLink = ({ item }) => {
  const pathname = usePathname();

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  );
};

MenuLink.propTypes = {
  item: PropTypes.shape({
    path: PropTypes.string.isRequired,
    icon: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default MenuLink;

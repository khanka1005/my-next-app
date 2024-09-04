import React from 'react';
import Image from 'next/image';

import styles from './HomeBanner.module.css';

const HomeBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerContent}>
        <div className={styles.textContainer}>
          <h1 className={styles.bannerTitle}>Mombella Mongolia</h1>
          <p className={styles.bannerSubtitle}>Хүүхдийн бараанууд</p>
          <p className={styles.bannerHighlight}>Үнэгүй түргэн шуурхай хүргэлт</p>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src='/main.png'
            fill
            alt='Banner Image'
            className={styles.bannerImage}
          />
        </div>
      </div>
    </div>
  );
}

export default HomeBanner;

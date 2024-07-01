import React from 'react'
import styles from './card.module.css'

const card = ({ icon, number, detail }:{
  icon: React.ReactNode;
  number: string;
  detail: string;
}) => {
    return (
      <div className={styles.container}>
        {icon}
        <div className={styles.texts}>
          <span className={styles.number}>{number}</span>
          <span className={styles.detail}>{detail}</span>
        </div>
      </div>
    );
  };
export default card

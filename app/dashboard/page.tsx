'use client'
import Card from "../ui/dashboard/card/card"
import styles from "../ui/dashboard/dashboard.module.css"
import Transactions from "../ui/dashboard/transactions/transactions"
import Chart from "../ui/dashboard/chart/chart"
import { FaUser, FaShopify } from "react-icons/fa";
import { CiCircleCheck } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

const Dashboard = async () => {
    return (
    
     <div className={styles.wrapper}>
        <div className={styles.main}></div>
        <div className={styles.cards}>
          <Card icon={<FaUser size={24} />} number="714k" detail="Weekly Sales" />
          <Card icon={<FaShopify size={24} />} number="1.35m" detail="New Users" />
          <Card icon={<FaCartShopping size={24} />} number="1.72m" detail="Items Ordered" />
          <Card icon={<CiCircleCheck size={24} />} number="234" detail="Bug Reports" />
        </div>
        <Transactions />
        <Chart />
      </div>
      
    );
  };
export default Dashboard
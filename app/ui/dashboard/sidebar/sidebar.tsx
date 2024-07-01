// components/sidebar.tsx
'use client'
import React from 'react';
import styles from './sidebar.module.css';
import MenuLink from './menuLink/menuLink';
import Image from 'next/image';
import { MdDashboard, MdSupervisedUserCircle, MdLogout, MdShoppingBag } from 'react-icons/md';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';

const menuItems = [
  {
    title: 'Pages',
    list: [
      {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <MdDashboard />,
      },
      {
        title: 'Users',
        path: '/dashboard/users',
        icon: <MdSupervisedUserCircle />,
      },
      {
        title: 'Products',
        path: '/dashboard/products',
        icon: <MdShoppingBag />,
      },
    ],
  },
];

const Sidebar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  if (!user) {
    return <p>Loading...</p>; // or a loading spinner
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/avatar.png" alt="" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>Khanka</span>
          <span className={styles.usertitle}>Admin</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
      <p className={styles.logout} onClick={handleSignOut}>
        <MdLogout />
        Logout
      </p>
    </div>
  );
};

export default Sidebar;

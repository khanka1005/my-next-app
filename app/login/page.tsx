// app/ui/dashboard/login/LoginPage.js

import React from 'react';
import styles from "@/app/ui/dashboard/login/login.module.css";
import { authenticate } from '@/app/lib/action';

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <form action={authenticate} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="username" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

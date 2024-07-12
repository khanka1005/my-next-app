'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import styles from '@/app/home.module.css'

const Home = () => {
  const { user, googleSignIn, emailSignIn } = useAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const handleSignin = async (event) => {
    event.preventDefault();
    try {
      await emailSignIn(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    }
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (user && pathname === '/') {
      router.push('/dashboard');
    }
  }, [user, router, pathname]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Our App</h1>
        {loading ? (
          <p>Loading...</p>
        ) : !user ? (
          <form onSubmit={handleSignin}>
            <div>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
            <button
              type="submit"
              className={`${styles.button} ${styles.buttonBlue}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={handleGoogleSignin}
              className={`${styles.button} ${styles.buttonRed}`}
            >
              Sign in with Google
            </button>
          </form>
        ) : null}
      </div>
    </main>
  );
};

export default Home;

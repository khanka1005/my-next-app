"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/context/AuthContext";
import styles from "@/app/home.module.css";

const LoginPage = () => {
  const { user, googleSignIn, emailSignIn, emailSignUp } = useAuth();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);  // Toggle between sign-in and sign-up
  const router = useRouter();

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await emailSignIn(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await emailSignUp(email, password);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50)); // Simulate loading state
      setLoading(false);
    };
    checkAuthentication();
  }, []);

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Нэвтрэх</h1>
        {loading ? (
          <p>Loading...</p>
        ) : !user ? (
          <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
            <div>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
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
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
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
              {isSignUp ? "Хаяг үүсгэх" : "Нэвтрэх"}
            </button>
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className={`${styles.button} ${styles.buttonRed}`}
            >
              Google ашиглаж нэвтрэх
            </button>
            <p className={styles.sign}
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? "Хаягтай юу? Нэвтрэх" : "Хэрэглэгч үүсгэх?"}
            </p>
          </form>
        ) : null}
      </div>
    </main>
  );
};

export default LoginPage;

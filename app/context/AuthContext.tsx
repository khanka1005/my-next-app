'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface AuthContextType {
  user: any;
  username: string | null;  // Add username to context
  googleSignIn: () => Promise<void>;
  emailSignIn: (email: string, password: string) => Promise<void>;
  emailSignUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string | null>(null);  // Initialize username state
  const router = useRouter();
  const pathname = usePathname();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUsername(result.user.email?.split('@')[0] || null);  // Extract username from email
      router.push('/dashboard');
    } catch (error) {
      console.error("Error during sign in:", error);
    }
  };

  const emailSignIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUsername(email.split('@')[0]);  // Extract username from email
      router.push('/dashboard');
    } catch (error) {
      console.error("Error during email sign in:", error);
    }
  };

  const emailSignUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUsername(email.split('@')[0]);  // Extract username from email
      router.push('/dashboard');
    } catch (error) {
      console.error("Error during email sign up:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setUsername(null);  // Reset username on logout
      router.push('/');
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        setUsername(currentUser.email?.split('@')[0] || null);  // Extract username from email
      } else {
        setUsername(null);
      }
      if (currentUser && pathname === '/') {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [pathname, router]);

  return (
    <AuthContext.Provider value={{ user, username, googleSignIn, emailSignIn, emailSignUp, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};

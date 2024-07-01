'use client'
import React, { useEffect, useState } from "react";
import { useAuth } from '@/app/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

const Home = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const handleSignin = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
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
    <main>
      <h1>Hello world</h1>
      {loading ? null : !user ? (
        <ul className="flex">
          <li onClick={handleSignin} className="p-2 cursor-pointer">
            Login
          </li>
        
        </ul>
      ) : (
        <div>
          <p>Welcome {user.displayName}</p>
          <p className="cursor-pointer" onClick={handleSignOut}>Signout</p>
        </div>
      )}
    </main>
  );
};

export default Home;

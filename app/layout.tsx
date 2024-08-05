
import React from 'react';
import { Inter } from "next/font/google";

import { AuthContextProvider } from '@/app/context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body className={inter.className}>
      
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </body>
  </html>
);

export default RootLayout;
 
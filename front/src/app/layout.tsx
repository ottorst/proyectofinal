import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from '@auth0/nextjs-auth0/client';

//Components
import RenderNavbarFooter from "../components/renderNavbarFooter/RenderNavbarFooter";
import { AuthProvider } from "../components/AuthContext";
import { CrudProvider } from "../components/CrudContext";
const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sacramento&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        <UserProvider>
          <CrudProvider>
          <AuthProvider>
            <RenderNavbarFooter>
              {children}
            </RenderNavbarFooter>
          </AuthProvider>
          </CrudProvider>
        </UserProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./NavBar";
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes'
import '../../theme-config.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter', // <-- RadixUI typography
});

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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <Theme appearance="light" accentColor="violet" >
          <NavBar />
          <main className="p-5">
            {children}
          </main>
        </Theme>
      </body>
    </html>
  );
}

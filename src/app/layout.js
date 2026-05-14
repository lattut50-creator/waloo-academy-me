 import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Waloo Academy - Learn Economics, Data Analysis & Programming in Ethiopia",
  description: "Expert-led courses in Economics (Grade 9-12), Data Analysis, Programming, Digital Marketing & Graphic Design.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://formspree.io" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
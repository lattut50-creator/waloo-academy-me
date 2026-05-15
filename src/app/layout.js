 import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata = {
  title: "Waloo Academy - Learn Economics, Data Analysis & Programming in Ethiopia",
  description: "Expert-led courses in Economics, Data Analysis, Programming, Digital Marketing & Graphic Design. Get certified and start your learning journey today!",
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
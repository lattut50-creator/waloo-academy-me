 import "./globals.css";

export const metadata = {
  title: "Waloo Academy - Learn Economics in Ethiopia",
  description: "Expert-led courses in Macro Economics, Micro Economics, and Civic Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://formspree.io" />
      </head>
      <body>{children}</body>
    </html>
  );
}
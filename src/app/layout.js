import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PreloaderWrapper from "./component/PreloaderWrapper"; // New client wrapper

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon1.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <PreloaderWrapper>{children}</PreloaderWrapper>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stacks AMM",
  description: "Trade any token on Stacks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-8 w-full">
          <Navbar />
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 5000, // 5 seconds so users have time to click
              style: {
                background: "#fff",
                color: "#363636",
                borderRadius: "12px",
                padding: "16px",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
              },
            }}
          />
        </div>
      </body>
    </html>
  );
}

'use client';

import { useSignalR } from '@/hooks/useSignalR';
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });


// export const metadata: Metadata = {
//   title: "Imagined Worlds",
//   description: "Create you dream world with timelapse and with, of course, AI.",
// };


function SignalRProvider({ children }: { children: React.ReactNode }) {
  // This hook will run once and establish the connection for the entire app.
  useSignalR();
  return <>{children}</>;
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-slate-900 antialiased`}
      >
        <SignalRProvider>
          {children}
        </SignalRProvider>
      </body>
    </html>
  );
}

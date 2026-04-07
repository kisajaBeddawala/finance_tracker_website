import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import NextAuthProvider from "@/components/NextAuthProvider";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Finance Tracker",
  description: "A simple finance tracker built with Next.js and Tailwind CSS.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-50 dark:bg-[#050505] transition-colors duration-300`}
      >  
        <ThemeProvider>
          <NextAuthProvider>
            <AuthProvider>
              {children}
            </AuthProvider> 
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

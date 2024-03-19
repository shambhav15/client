import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Twitter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId="369157823517-mhs55febvsafoe97v1n82aprts2f1a13.apps.googleusercontent.com">
      <html lang="en">
        <body className={inter.className}>
          {children} <Toaster position="bottom-right" />
        </body>
      </html>
    </GoogleOAuthProvider>
  );
}

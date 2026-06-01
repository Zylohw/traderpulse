import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TraderPulse - AI SaaS Dashboard",
  description: "AI-powered trading dashboard with gamification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

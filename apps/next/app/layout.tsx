import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  description: "Next.js example for react-classname",
  title: "react-classname Next.js example"
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

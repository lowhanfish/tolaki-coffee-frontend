import type { Metadata } from "next";
import "./globals.css";
import "../../public/styles/bg.css"
import "../../public/styles/main.css"
import "../../public/styles/button.scss"
import "../../public/styles/sun-editor.scss"
import "../../public/styles/color.scss"
import "../../public/styles/fonts.scss"

export const metadata: Metadata = {
  title: "Kopi-Tolaki",
  description: "Distributor Resmi Kopi Khas Tolaki",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="min-h-full h-full flex flex-col bg">
        {children}
      </body>
    </html>
  );
}

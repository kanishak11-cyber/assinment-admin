import { Inter } from "next/font/google";
import "./globals.css";
// import "@radix-ui/themes/styles.css";
// import { Theme, ThemePanel } from "@radix-ui/themes";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          {children}
        
      </body>
    </html>
  );
}

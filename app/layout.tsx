import Navbar from "@/components/layout/navbar/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata = {
  title: "Shop-Website",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${poppins.className} pt-16 bg-white`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

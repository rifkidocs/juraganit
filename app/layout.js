import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Juragan IT",
  description: "PT Juragan Karya Digital Teknologi",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head>
        <script src='https://unpkg.com/alpinejs' defer></script>
      </head>
      <body className={`${font}`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

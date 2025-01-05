import { Metadata } from "next";
import PortfolioShowcase from "@/components/portfolio-showcase";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

export const metadata = {
  title: "Portfolio Showcase",
  description: "Showcase of our latest web development projects",
};

export default function Page() {
  return (
    <main className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <PortfolioShowcase />
      <FooterBlog />
    </main>
  );
}

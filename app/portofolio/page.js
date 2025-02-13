import { Metadata } from "next";
import PortfolioShowcase from "@/components/portfolio-showcase";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

export const metadata = {
  title: "Portfolio Showcase",
  description: "Showcase of our latest web development projects",
};

export default async function Page() {
  async function getPortfolios() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}api/portofolios?populate=*`);

    if (!res.ok) {
      throw new Error("Failed to fetch portfolios");
    }

    const data = await res.json();
    return data;
  }

  const portfoliosData = await getPortfolios();

  return (
    <main className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <PortfolioShowcase portfolioData={portfoliosData} />
      <FooterBlog />
    </main>
  );
}

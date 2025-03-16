export const dynamic = "force-dynamic";
import PortfolioShowcase from "@/components/portfolio-showcase";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

export const metadata = {
  title: "Portfolio - JuraganIT",
  description:
    "Lihat portofolio proyek-proyek terbaik kami di JuraganIT. Kami telah membantu berbagai bisnis dengan solusi digital yang inovatif.",
  openGraph: {
    title: "Portfolio - JuraganIT",
    description:
      "Lihat portofolio proyek-proyek terbaik kami di JuraganIT. Kami telah membantu berbagai bisnis dengan solusi digital yang inovatif.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/portofolio`,
    siteName: "JuraganIT",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Portfolio JuraganIT&description=Portofolio Proyek Terbaik Kami`,
        width: 1200,
        height: 630,
        alt: "Portfolio - JuraganIT",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - JuraganIT",
    description: "Lihat portofolio proyek-proyek terbaik kami di JuraganIT",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Portfolio JuraganIT&description=Portofolio Proyek Terbaik Kami`,
    ],
    creator: "@juraganit",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function Page() {
  async function getPortfolios() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${apiUrl}/api/portofolios?populate=*`);

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

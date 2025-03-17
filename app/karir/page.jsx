export const dynamic = "force-dynamic";
import JobListings from "@/components/job-listings";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

export const metadata = {
  title: "Peluang Karir - JuraganIT",
  description:
    "Temukan berbagai kesempatan kerja dan bergabunglah dengan tim yang sesuai dengan minat serta keahlian Anda di JuraganIT.",
  openGraph: {
    title: "Peluang Karir - JuraganIT",
    description:
      "Temukan berbagai kesempatan kerja dan bergabunglah dengan tim yang sesuai dengan minat serta keahlian Anda di JuraganIT.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/karir`,
    siteName: "JuraganIT",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Peluang Karir&description=Temukan berbagai kesempatan kerja di JuraganIT`,
        width: 1200,
        height: 630,
        alt: "Peluang Karir - JuraganIT",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Peluang Karir - JuraganIT",
    description: "Temukan berbagai kesempatan kerja di JuraganIT",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Peluang Karir&description=Bergabung dengan Tim JuraganIT`,
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
  async function getJobs() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(
      `${apiUrl}/api/karirs?pagination[pageSize]=9&sort=createdAt:desc`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }

    const data = await res.json();
    return data;
  }

  const jobsData = await getJobs();

  return (
    <main className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <div className='max-w-7xl mx-auto mb-24'>
        <div className='space-y-4 mb-12'>
          <h1 className='text-4xl font-bold'>Peluang Karir</h1>
          <p className='text-lg text-muted-foreground'>
            Temukan berbagai kesempatan kerja dan bergabunglah dengan tim yang
            sesuai dengan minat serta keahlian Anda.
          </p>
        </div>
        <JobListings jobsData={jobsData} />
      </div>
      <FooterBlog />
    </main>
  );
}

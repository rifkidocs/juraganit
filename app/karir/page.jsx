export const dynamic = "force-dynamic";
import JobListings from "@/components/job-listings";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

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

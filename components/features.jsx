import PortfolioHome from "./portfolio-home";

export async function Features() {
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
    <section className='w-full'>
      <PortfolioHome portfolioData={portfoliosData} />
    </section>
  );
}

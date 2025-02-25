import { Features } from "@/components/features";
import { Testimonials } from "@/components/testimonials";
import { Footer } from "@/components/footer";
import { Navigation } from "@/components/navigation";
import { Spotlight } from "@/components/spotlight-new";
import Hero from "@/components/hero";
import FeaturesGrid from "@/components/features-grid";
import PricingCards from "@/components/pricing-cards";
import Image from "next/image";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/homepage?pLevel`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();
  console.log(data);

  return (
    <div className='min-h-screen bg-black text-white'>
      <Navigation />
      <div className='w-full h-[1250px] flex absolute inset-0 overflow-hidden'>
        <Spotlight />
        <img src='/blue_1.png' alt='Image' className='w-full' />
      </div>

      <section className='relative overflow-hidden pt-16'>
        <div className='relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
          <Hero />
          <FeaturesGrid data={data.data} />
          <PricingCards data={data.data} />

          {/* Trusted By */}
          <div className='py-20'>
            <div className='text-center mb-16'>
              <h2 className='text-4xl font-bold text-white mb-4'>
                {data.data.DipercayaiJudul}
              </h2>
              <p className='text-gray-300 text-lg mb-6'>
                {data.data.DipercayaiSubJudul}
              </p>
              <div className='w-20 h-1 bg-blue-500 mx-auto rounded-full'></div>
            </div>

            <div
              x-data='{}'
              x-init={`
                $nextTick(() => {
                    const content = $refs.content;
                    const item = $refs.item;
                    const clone = item.cloneNode(true);
                    content.appendChild(clone);
                });
              `}
              className='relative w-full bg-gray-900 container-block'>
              <div className='relative w-full py-3 mx-auto overflow-hidden text-lg italic tracking-wide text-white uppercase bg-black max-w-7xl sm:text-xs md:text-sm lg:text-base xl:text-xl 2xl:text-2xl'>
                <div className='absolute left-0 z-20 w-40 h-full bg-gradient-to-r from-black to-transparent'></div>
                <div className='absolute right-0 z-20 w-40 h-full bg-gradient-to-l from-black to-transparent'></div>
                <div x-ref='content' className='flex animate-marquee'>
                  <div
                    x-ref='item'
                    className='flex items-center justify-around flex-shrink-0 w-full py-2 space-x-2 text-white'>
                    {data.data.Dipercayai.map((item, index) => (
                      <div key={index} className='flex items-center space-x-2'>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${item.Logo.url}`}
                          alt='logo'
                          width={500}
                          height={500}
                          className='h-10 w-full'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Features data={data} />
          <Testimonials data={data} />
        </div>
      </section>
      <Footer />
    </div>
  );
}

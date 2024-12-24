import Image from "next/image";

export function Features() {
  const features = [
    {
      title: "Generate prototypes",
      description:
        "Generate high-fidelity, production-ready screens, editable prototypes instantly using your text.",
      image: "/placeholder.svg",
    },
    {
      title: "Modify any component",
      description:
        "Fine-tune your designs with precise control. Change any element, and let AutoDesign do the hard work.",
      image: "/placeholder.svg",
    },
    {
      title: "Screenshot scanner",
      description:
        "Transform any screenshot into editable designs instantly. It's never been easier to iterate and improve.",
      image: "/placeholder.svg",
    },
    {
      title: "Generate themes",
      description:
        "Create new themes in seconds — generate a color theme for your product instantly.",
      image: "/placeholder.svg",
    },
  ];

  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='text-center'>
          <div className='inline-block rounded-full bg-purple-900/50 px-4 py-1 text-sm'>
            we're magical here!
          </div>
          <h2 className='mt-4 text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent sm:text-4xl'>
            UI design for disruptive product teams
          </h2>
          <p className='mx-auto mt-4 max-w-2xl '>
            Collaborate in real-time with AI and your entire product team. In
            Uizard, everyone can contribute to building the next big thing.
          </p>
        </div>

        <div className='mt-20 grid gap-16 lg:grid-cols-2'>
          {features.map((feature) => (
            <div key={feature.title} className='relative'>
              <div className='space-y-4'>
                <h3 className='text-xl font-semibold text-white'>
                  {feature.title}
                </h3>
                <p className='text-gray-400'>{feature.description}</p>
                <div className='relative mt-6 rounded-xl border border-white/10 overflow-hidden'>
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={600}
                    height={400}
                    className='w-full'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

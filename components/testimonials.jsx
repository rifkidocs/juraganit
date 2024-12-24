export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "John D.",
      role: "Product Designer",
      company: "Tech Co",
    },
    {
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Sarah M.",
      role: "UX Lead",
      company: "Design Inc",
    },
    {
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Mike R.",
      role: "Product Manager",
      company: "Innovation Labs",
    },
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "John D.",
      role: "Product Designer",
      company: "Tech Co",
    },
    {
      quote:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      author: "Sarah M.",
      role: "UX Lead",
      company: "Design Inc",
    },
    {
      quote:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Mike R.",
      role: "Product Manager",
      company: "Innovation Labs",
    },
  ];

  return (
    <section className='bg-black py-20'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-white text-center mb-16'>
          What our customers say about us
        </h2>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className='rounded-xl bg-white/5 p-6 backdrop-blur-sm border border-white/10'>
              <blockquote className='text-gray-400 mb-6'>
                "{testimonial.quote}"
              </blockquote>
              <div className='flex items-center gap-4'>
                <div className='h-10 w-10 rounded-full bg-purple-600/20' />
                <div>
                  <div className='font-medium text-white'>
                    {testimonial.author}
                  </div>
                  <div className='text-sm text-gray-400'>
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

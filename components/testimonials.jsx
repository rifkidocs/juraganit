import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const PlatformIcon = ({ platform }) => {
  const iconClasses = "w-4 h-4 text-gray-400";

  return (
    <div className='absolute top-4 right-4'>
      {platform === "linkedin" && (
        <svg className={iconClasses} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      )}
    </div>
  );
};

const ReviewCard = ({ name, username, body, platform }) => {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-xl p-6 mb-4",
        "bg-black border border-gray-800 hover:bg-gray-900/50 transition-colors",
        "shadow-[0_-12px_25px_-12px_rgba(0,0,0,0.8)]",
        "shadow-[0_12px_25px_-12px_rgba(0,0,0,0.8)]"
      )}>
      <PlatformIcon platform={platform} />
      <div className='flex flex-col'>
        <figcaption className='text-base font-semibold text-white'>
          {name}
        </figcaption>
        <p className='text-sm text-gray-400 mb-3'>{username}</p>
      </div>
      <blockquote className='text-sm text-gray-300 leading-relaxed'>
        {body}
      </blockquote>
    </figure>
  );
};

export function Testimonials({ data }) {
  const reviews = data.data.Testimonial.map((item) => ({
    name: item.Nama,
    username: item.Sebagai,
    body: item.Pesan,
    platform: "linkedin", // Using LinkedIn as default platform
  }));

  // Calculate dynamic column distribution
  const totalReviews = reviews.length;
  const columnsCount = 3; // Maximum number of columns for desktop
  const itemsPerColumn = Math.ceil(totalReviews / columnsCount);

  // Distribute reviews evenly across columns
  const columns = Array.from({ length: columnsCount }, (_, i) =>
    reviews.slice(i * itemsPerColumn, (i + 1) * itemsPerColumn)
  ).filter((column) => column.length > 0); // Remove empty columns

  return (
    <div>
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold text-white mb-4'>
          {data.data.TestiJudul}
        </h2>
        <p className='text-gray-300 text-lg mb-6'>{data.data.TestiSubJudul}</p>
        <div className='w-20 h-1 bg-blue-500 mx-auto rounded-full'></div>
      </div>

      {/* Mobile view (sm) - single column */}
      <div className='sm:hidden relative flex h-[600px] w-full justify-center overflow-hidden bg-black px-4'>
        <Marquee vertical className='[--duration:40s] max-w-sm'>
          {[...reviews, ...reviews].map((review, idx) => (
            <ReviewCard key={`mobile-${review.username}-${idx}`} {...review} />
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>

      {/* Tablet view (sm-lg) - two columns */}
      <div className='hidden sm:flex lg:hidden relative h-[600px] w-full justify-center gap-8 overflow-hidden bg-black px-4'>
        {columns.slice(0, 2).map((columnReviews, columnIndex) => (
          <Marquee
            key={`tablet-${columnIndex}`}
            vertical
            reverse={columnIndex % 2 === 1}
            className='[--duration:35s] max-w-sm'>
            {[...columnReviews, ...columnReviews].map((review, idx) => (
              <ReviewCard
                key={`tablet-${columnIndex}-${review.username}-${idx}`}
                {...review}
              />
            ))}
          </Marquee>
        ))}
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>

      {/* Desktop view (lg+) - three columns */}
      <div className='hidden lg:flex relative h-[600px] w-full justify-center gap-8 overflow-hidden bg-black px-4'>
        {columns.map((columnReviews, columnIndex) => (
          <Marquee
            key={`desktop-${columnIndex}`}
            vertical
            reverse={columnIndex % 2 === 1}
            className='[--duration:35s] max-w-sm'>
            {[...columnReviews, ...columnReviews].map((review, idx) => (
              <ReviewCard
                key={`desktop-${columnIndex}-${review.username}-${idx}`}
                {...review}
              />
            ))}
          </Marquee>
        ))}
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>
    </div>
  );
}

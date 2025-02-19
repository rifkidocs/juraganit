import React from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "./magicui/marquee";

const reviews = [
  {
    name: "Elizabeth",
    username: "@DesignerUp",
    body: "I can't believe I just watched AI turn a boring text prompt into a complete UI design and flow right before my eyes in seconds with JuraganIT.",
    platform: "youtube",
  },
  {
    name: "Andre",
    username: "Andre Albuquerque",
    body: "One of the coolest products I've used lately is called JuraganIT. It offers AI-powered solutions to automatically design & create mobile apps, web products, and basically any product experience you can imagine with just a simple English prompt. No code. No design. No effort. It took me 60 seconds to create two products out of nowhere.",
    platform: "linkedin",
  },
  {
    name: "Nolan Perkins",
    username: "@_radnolan",
    body: "@JuraganIT just launched a Figma plugin, and I think it's going to change my UI & UX design process! JuraganIT helps bridge the gap from idea to visualization, allowing designers to move faster and product managers to communicate better with their teams.",
    platform: "instagram",
  },
  {
    name: "Joelle",
    username: "@joelledesigner",
    body: "JuraganIT isn't your average AI tool that overpromises and underdelivers – it has actually useful features designed to speed up your design process.",
    platform: "instagram",
  },
  {
    name: "Carl",
    username: "@carlvellotti",
    body: "I'm so freaking impressed with JuraganIT. Design tool + AI = Magic ✨",
    platform: "twitter",
  },
  {
    name: "Samantha",
    username: "@sam_creates",
    body: "JuraganIT is a total game changer! I went from a rough idea to a fully developed app in minutes. No coding skills needed!",
    platform: "twitter",
  },
  {
    name: "David",
    username: "DavidMillerUI",
    body: "As a UX designer, I’m always skeptical about AI tools. But JuraganIT? It genuinely speeds up my workflow without compromising creativity.",
    platform: "medium",
  },
  {
    name: "Marco",
    username: "@marco_dev",
    body: "JuraganIT's AI-powered software solutions are insane. I built a fully functional prototype without writing a single line of code!",
    platform: "linkedin",
  },
  {
    name: "Rachel",
    username: "@rachelux",
    body: "Honestly, JuraganIT blew my mind 🤯. It’s like having a personal development team available 24/7. Highly recommend it!",
    platform: "tiktok",
  },
  {
    name: "Liam",
    username: "@liam_tech",
    body: "I was skeptical at first, but JuraganIT delivered. From simple prompts to a fully working app, it’s the real deal!",
    platform: "reddit",
  },
  {
    name: "Sophia",
    username: "@sophiadesigns",
    body: "Never thought developing an app could be this easy. JuraganIT turned my rough concept into something real in minutes!",
    platform: "dribbble",
  },
  {
    name: "Tom",
    username: "@tom_the_dev",
    body: "Tried JuraganIT for the first time today. Wow. The speed and accuracy of their AI blew me away. Perfect for quick prototyping!",
    platform: "facebook",
  },
  {
    name: "Mia",
    username: "@mia_creates",
    body: "If you’re struggling with software development, JuraganIT is a must-try. It’s intuitive, fast, and surprisingly efficient!",
    platform: "tiktok",
  },
  {
    name: "Jake",
    username: "@jakeinnovates",
    body: "I used to spend weeks developing ideas. With JuraganIT, it takes days. This software house is the future of app and web development!",
    platform: "youtube",
  },
];

const PlatformIcon = ({ platform }) => {
  const iconClasses = "w-4 h-4 text-gray-400";

  return (
    <div className='absolute top-4 right-4'>
      {platform === "youtube" && (
        <svg className={iconClasses} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' />
        </svg>
      )}
      {platform === "linkedin" && (
        <svg className={iconClasses} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
        </svg>
      )}
      {platform === "instagram" && (
        <svg className={iconClasses} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' />
        </svg>
      )}
      {platform === "twitter" && (
        <svg className={iconClasses} viewBox='0 0 24 24' fill='currentColor'>
          <path d='M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' />
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

export function Testimonials() {
  // Split reviews for different views
  const firstColumn = reviews.slice(0, 2);
  const secondColumn = reviews.slice(2, 4);
  const thirdColumn = reviews.slice(4);

  return (
    <div>
      <h2 className='text-3xl font-bold text-white text-center mb-16'>
        What our customers say about us
      </h2>

      {/* Mobile view (sm) - single column */}
      <div className='sm:hidden relative flex h-[600px] w-full justify-center overflow-hidden bg-black px-4'>
        <Marquee vertical className='[--duration:40s] max-w-sm'>
          {[...reviews, ...reviews, ...reviews].map((review, idx) => (
            <ReviewCard key={`mobile-${review.username}-${idx}`} {...review} />
          ))}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>

      {/* Tablet view (sm-lg) - two columns */}
      <div className='hidden sm:flex lg:hidden relative h-[600px] w-full justify-center gap-8 overflow-hidden bg-black px-4'>
        <Marquee vertical className='[--duration:40s] max-w-sm'>
          {[
            ...firstColumn,
            ...secondColumn,
            ...firstColumn,
            ...secondColumn,
          ].map((review, idx) => (
            <ReviewCard
              key={`tablet-1-${review.username}-${idx}`}
              {...review}
            />
          ))}
        </Marquee>

        <Marquee vertical reverse className='[--duration:35s] max-w-sm'>
          {[...thirdColumn, ...firstColumn, ...thirdColumn, ...firstColumn].map(
            (review, idx) => (
              <ReviewCard
                key={`tablet-2-${review.username}-${idx}`}
                {...review}
              />
            )
          )}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>

      {/* Desktop view (lg+) - three columns */}
      <div className='hidden lg:flex relative h-[600px] w-full justify-center gap-8 overflow-hidden bg-black px-4'>
        <Marquee vertical className='[--duration:40s] max-w-sm'>
          {[...firstColumn, ...firstColumn, ...firstColumn].map(
            (review, idx) => (
              <ReviewCard
                key={`desktop-1-${review.username}-${idx}`}
                {...review}
              />
            )
          )}
        </Marquee>

        <Marquee vertical reverse className='[--duration:35s] max-w-sm'>
          {[...secondColumn, ...secondColumn, ...secondColumn].map(
            (review, idx) => (
              <ReviewCard
                key={`desktop-2-${review.username}-${idx}`}
                {...review}
              />
            )
          )}
        </Marquee>

        <Marquee vertical className='[--duration:45s] max-w-sm'>
          {[...thirdColumn, ...thirdColumn, ...thirdColumn, ...thirdColumn].map(
            (review, idx) => (
              <ReviewCard
                key={`desktop-3-${review.username}-${idx}`}
                {...review}
              />
            )
          )}
        </Marquee>
        <div className='pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black'></div>
        <div className='pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black'></div>
      </div>
    </div>
  );
}

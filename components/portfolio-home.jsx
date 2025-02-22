"use client";
import React from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PortfolioShowcase({ portfolioData, data }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const portfolioItems =
    portfolioData?.data?.map((item) => ({
      id: item.id,
      title: item.judul,
      category: item.jenis,
      image: item.thumbnail?.url || "/placeholder.svg?height=600&width=800",
      description: item.deskripsi,
      link: item.link,
    })) || [];

  // Take only the first 8 items
  const displayedItems = portfolioItems.slice(0, 8);

  return (
    <div className='w-full py-20'>
      <div className='text-center mb-16'>
        <h2 className='text-4xl font-bold text-white mb-4'>
          {data.data.PortofolioJudul}
        </h2>
        <p className='text-gray-300 text-lg mb-6'>
          {data.data.PortofolioSubJudul}
        </p>
        <div className='w-20 h-1 bg-blue-500 mx-auto rounded-full'></div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {displayedItems.map((item) => (
          <div
            key={item.id}
            className='group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-950/20 backdrop-blur-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2'>
            <div className='aspect-video relative overflow-hidden'>
              <Image
                src={`${apiUrl}${item.image}`}
                alt={item.title}
                fill
                className='object-cover transition-transform duration-300 group-hover:scale-110'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
                <div className='translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex gap-4'>
                  {item.link && (
                    <a
                      href={item.link}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300'>
                      <ExternalLink className='h-5 w-5' />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className='p-6'>
              <div className='mb-2'>
                <span className='text-blue-400 text-sm font-medium bg-blue-500/10 px-3 py-1 rounded-full'>
                  {item.category}
                </span>
              </div>
              <h3 className='text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300'>
                {item.title}
              </h3>
              <p className='text-gray-300 text-sm line-clamp-2'>
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {portfolioItems.length > 8 && (
        <div className='flex justify-center mt-12'>
          <Link href='/portofolio'>
            <Button className='bg-blue-500 hover:bg-blue-600 text-white gap-2'>
              Lihat Semua Portfolio
              <ArrowRight className='h-5 w-5' />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

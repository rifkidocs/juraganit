"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio-grid";

export default function PortfolioShowcase({ portfolioData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Transform API data to match the expected format
  const portfolioItems =
    portfolioData?.data?.map((item) => ({
      id: item.id,
      title: item.judul,
      category: item.jenis,
      image: item.thumbnail?.url || "/placeholder.svg?height=600&width=800",
      description: item.deskripsi,
      link: item.link,
    })) || [];

  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  const currentItems = portfolioItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4'>
        <PortfolioGrid items={currentItems} />

        {totalPages > 1 && (
          <div className='flex justify-center items-center gap-2 md:mt-8 my-8'>
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size='icon'
                onClick={() => setCurrentPage(page)}>
                {page}
              </Button>
            ))}
            <Button
              variant='outline'
              size='icon'
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

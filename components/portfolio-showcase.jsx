"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PortfolioGrid } from "@/components/portfolio-grid";

const portfolioItems = [
  {
    id: 1,
    title: "Tanagayo Coffee",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Coffee company website with warm earth tones",
  },
  {
    id: 2,
    title: "Jericho Helmets",
    category: "Web Toko Online Otomatis",
    image: "/placeholder.svg?height=600&width=800",
    description: "Helmet and protective gear e-commerce",
  },
  {
    id: 3,
    title: "YK Publishing",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Publishing company website",
  },
  {
    id: 4,
    title: "Poc Poc Nyp",
    category: "Web Landing Page",
    image: "/placeholder.svg?height=600&width=800",
    description: "Creative landing page design",
  },
  {
    id: 5,
    title: "Digital Winner Synergy",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Digital solutions company website",
  },
  {
    id: 6,
    title: "Xclusivmedia",
    category: "Web Toko Online Otomatis",
    image: "/placeholder.svg?height=600&width=800",
    description: "Media equipment e-commerce platform",
  },
  {
    id: 7,
    title: "Exotic Aroid",
    category: "Web Toko Online Otomatis",
    image: "/placeholder.svg?height=600&width=800",
    description: "Exotic plants e-commerce website",
  },
  {
    id: 8,
    title: "Bebas Kirim",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Shipping company website",
  },
  // Add more items to demonstrate pagination
  {
    id: 9,
    title: "Tech Innovators",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Innovative technology solutions company",
  },
  {
    id: 10,
    title: "Green Earth",
    category: "Web Landing Page",
    image: "/placeholder.svg?height=600&width=800",
    description: "Environmental awareness campaign landing page",
  },
  {
    id: 11,
    title: "Fitness Gear",
    category: "Web Toko Online Otomatis",
    image: "/placeholder.svg?height=600&width=800",
    description: "Fitness equipment e-commerce store",
  },
  {
    id: 12,
    title: "Gourmet Delights",
    category: "Web Company Profile",
    image: "/placeholder.svg?height=600&width=800",
    description: "Gourmet food company showcase",
  },
];

export default function PortfolioShowcase() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(portfolioItems.length / itemsPerPage);

  const currentItems = portfolioItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4'>
        <PortfolioGrid items={currentItems} />

        <div className='flex justify-center items-center gap-2 mt-8'>
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
      </div>
    </div>
  );
}

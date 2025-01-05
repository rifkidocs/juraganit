"use client";
import { Button } from "@/components/ui/button";

export function PortfolioFilters({ currentFilter, onFilterChange }) {
  const filters = [
    { label: "All Projects", value: "all" },
    { label: "Company Profile", value: "Web Company Profile" },
    { label: "E-Commerce", value: "Web Toko Online Otomatis" },
    { label: "Landing Page", value: "Web Landing Page" },
  ];

  return (
    <div className='flex flex-wrap gap-2'>
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          onClick={() => onFilterChange(filter.value)}
          className='whitespace-nowrap'>
          {filter.label}
        </Button>
      ))}
    </div>
  );
}

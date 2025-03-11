"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function JobListings({ jobsData }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    setJobs(jobsData?.data || []);
    setTotalPages(jobsData?.meta?.pagination?.pageCount || 1);
  }, [jobsData]);

  const fetchJobs = async (page) => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(
        `${apiUrl}/api/karirs?pagination[page]=${page}&pagination[pageSize]=${itemsPerPage}`
      );
      if (!res.ok) throw new Error("Failed to fetch jobs");
      const data = await res.json();
      setJobs(data.data || []);
      setTotalPages(data.meta.pagination.pageCount);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchJobs(page);
  };

  return (
    <div className='min-h-screen'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {jobs.map((job) => (
            <Card key={job.id} className='hover:shadow-lg transition-shadow'>
              <CardContent className='p-6'>
                <div className='space-y-4'>
                  <div>
                    <h3 className='text-xl font-semibold text-primary'>
                      {job.posisi}
                    </h3>
                    <p className='text-muted-foreground'>
                      {job.nama_perusahaan}
                    </p>
                  </div>

                  <div className='space-y-2'>
                    <Badge variant='secondary' className='text-sm'>
                      {job.lokasi}
                    </Badge>
                    <p className='text-sm font-medium text-green-600'>
                      {job.gaji}
                    </p>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className='w-full'>Lihat Detail</Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl max-h-[80vh] overflow-y-auto'>
                      <DialogHeader>
                        <DialogTitle>{job.posisi}</DialogTitle>
                      </DialogHeader>
                      <div className='space-y-4 mt-4'>
                        <div className='space-y-1'>
                          <p className='text-lg font-medium'>
                            {job.nama_perusahaan}
                          </p>
                          <p className='text-muted-foreground'>{job.lokasi}</p>
                          <p className='text-green-600 font-medium'>
                            {job.gaji}
                          </p>
                        </div>
                        <div
                          className='prose prose-sm max-w-none'
                          dangerouslySetInnerHTML={{ __html: job.deskripsi }}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {totalPages > 1 && (
          <div className='mt-8 mb-8 cursor-pointer'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1 || isLoading}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => handlePageChange(page)}
                        isActive={currentPage === page}
                        disabled={isLoading}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages || isLoading}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}

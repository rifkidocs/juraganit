export const dynamic = "force-dynamic";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import Share from "@/components/share";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

async function getFaqs() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/faqs?pagination[pageSize]=100`);

  if (!res.ok) {
    throw new Error("Failed to fetch FAQs");
  }

  const data = await res.json();
  return data.data;
}

export default async function FaqPage() {
  const faqs = await getFaqs();

  return (
    <div className='px-4 mt-24'>
      <NavigationBlog />
      <div className='mx-auto max-w-7xl pb-10'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Breadcrumb */}
            <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
              <Link href='/' className='hover:text-primary'>
                Beranda
              </Link>
              <span>/</span>
              <span className='text-muted-foreground'>FAQ</span>
            </nav>

            {/* Header */}
            <header className='mb-8'>
              <h1 className='text-4xl font-bold mb-4'>
                Pertanyaan yang Sering Diajukan
              </h1>
              <p className='text-lg text-muted-foreground'>
                Temukan jawaban untuk pertanyaan umum tentang layanan dan solusi
                JuraganIT.
              </p>
            </header>

            {/* FAQ Content */}
            <div className='space-y-6'>
              <Accordion type='single' collapsible className='w-full'>
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                    <AccordionTrigger className='text-left'>
                      {faq.pertanyaan}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className='prose prose-sm max-w-none'>
                        <p className='text-muted-foreground'>{faq.jawaban}</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

          {/* Sidebar */}
          <aside className='space-y-8'>
            <Share />

            {/* Contact Card */}
            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-semibold mb-4'>
                  Masih ada pertanyaan?
                </h2>
                <p className='text-muted-foreground mb-4'>
                  Tidak menemukan jawaban yang Anda cari? Silakan hubungi tim
                  dukungan kami.
                </p>
                <Link
                  href='/kontak-kami'
                  className='inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90'>
                  Hubungi Dukungan
                </Link>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <FooterBlog />
    </div>
  );
}

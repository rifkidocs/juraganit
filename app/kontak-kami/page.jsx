import { Metadata } from "next";

export const metadata = {
  title: "Kontak Kami - JuraganIT",
  description:
    "Hubungi kami untuk informasi lebih lanjut tentang layanan digital JuraganIT. Kami siap membantu mengembangkan solusi digital untuk bisnis Anda.",
  openGraph: {
    title: "Kontak Kami - JuraganIT",
    description:
      "Hubungi kami untuk informasi lebih lanjut tentang layanan digital JuraganIT. Kami siap membantu mengembangkan solusi digital untuk bisnis Anda.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/kontak-kami`,
    siteName: "JuraganIT",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Kontak Kami&description=Hubungi kami untuk informasi lebih lanjut`,
        width: 1200,
        height: 630,
        alt: "Kontak Kami - JuraganIT",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontak Kami - JuraganIT",
    description:
      "Hubungi kami untuk informasi lebih lanjut tentang layanan digital JuraganIT",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Kontak Kami&description=Hubungi kami untuk informasi lebih lanjut`,
    ],
    creator: "@juraganit",
  },
};

export const dynamic = "force-dynamic";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";

function calculateReadTime(content) {
  const plainText = content.replace(/<[^>]*>/g, "");
  const wordsPerMinute = 180;
  const wordCount = plainText.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

async function getContactContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/kontak-kami`);

  if (!res.ok) {
    throw new Error("Failed to fetch contact content");
  }

  const data = await res.json();
  return data.data;
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

export default async function ContactPage() {
  const contactContent = await getContactContent();
  const readTimeMinutes = calculateReadTime(contactContent.content);

  return (
    <div className='px-4 mt-24'>
      <NavigationBlog />
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* Main Content */}
          <div>
            {/* Breadcrumb */}
            <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
              <Link href='/' className='hover:text-primary'>
                Home
              </Link>
              <span>/</span>
              <span className='text-muted-foreground'>Kontak Kami</span>
            </nav>

            {/* Header */}
            <header className='mb-8'>
              <h1 className='text-4xl font-bold mb-4'>Kontak Kami</h1>
              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>{formatDate(contactContent.publishedAt)}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{readTimeMinutes} menit membaca</span>
                </div>
              </div>
            </header>

            {/* Content */}
            <div
              className='article-content prose prose-lg max-w-none mb-8 
                prose-headings:font-bold prose-headings:text-gray-900 
                prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-strong:font-bold prose-strong:text-gray-900
                prose-ul:list-disc prose-ul:pl-6
                prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-gray-700 prose-li:leading-relaxed'
              dangerouslySetInnerHTML={{ __html: contactContent.content }}
            />
          </div>

          {/* Map Embed */}
          <div className='h-full'>
            <div className='w-full h-full min-h-[600px] rounded-lg overflow-hidden sticky top-24'>
              <div
                className='w-full h-full'
                dangerouslySetInnerHTML={{ __html: contactContent.embed_map }}
              />
            </div>
          </div>
        </div>
      </div>

      <FooterBlog />
    </div>
  );
}

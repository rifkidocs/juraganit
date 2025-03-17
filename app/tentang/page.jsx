export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import Share from "@/components/share";

function calculateReadTime(content) {
  const plainText = content.replace(/<[^>]*>/g, "");
  const wordsPerMinute = 180;
  const wordCount = plainText.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

async function getAboutContent() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/api/tentang-kami`);

  if (!res.ok) {
    throw new Error("Failed to fetch about content");
  }

  const data = await res.json();
  return data.data;
}

async function getRecentPosts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/api/articles?populate=*&sort=createdAt:desc`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch recent posts");
  }

  const data = await res.json();
  return data.data.slice(0, 4); // Get only the 4 most recent posts
}

function getThumbnailUrl(thumbnail, format = "large") {
  if (!thumbnail) return "/placeholder.svg";

  if (thumbnail.formats && thumbnail.formats[format]) {
    return `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.formats[format].url}`;
  }

  return `${process.env.NEXT_PUBLIC_API_URL}${thumbnail.url}`;
}

function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(dateString).toLocaleDateString("id-ID", options);
}

export async function generateMetadata() {
  const aboutContent = await getAboutContent();
  const plainTextDescription =
    aboutContent.content.replace(/<[^>]*>/g, "").slice(0, 160) + "...";
  const ogImageUrl = `${
    process.env.NEXT_PUBLIC_SITE_URL
  }/api/og?title=${encodeURIComponent(
    aboutContent.judul
  )}&description=${encodeURIComponent(plainTextDescription)}`;

  return {
    title: `${aboutContent.judul} | JuraganIT`,
    description: plainTextDescription,
    openGraph: {
      title: aboutContent.judul,
      description: plainTextDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/tentang`,
      siteName: "JuraganIT",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: aboutContent.judul,
        },
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: aboutContent.publishedAt,
      modifiedTime: aboutContent.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title: aboutContent.judul,
      description: plainTextDescription,
      creator: "@juraganit",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/tentang`,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function AboutPage() {
  const aboutContent = await getAboutContent();
  const readTimeMinutes = calculateReadTime(aboutContent.content);
  const recentPosts = await getRecentPosts();

  return (
    <div className='px-4 mt-24'>
      <NavigationBlog />
      <div className='mx-auto max-w-7xl'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Breadcrumb */}
            <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
              <Link href='/' className='hover:text-primary'>
                Home
              </Link>
              <span>/</span>
              <span className='text-muted-foreground'>
                {aboutContent.judul}
              </span>
            </nav>

            {/* Header */}
            <header className='mb-8'>
              <h1 className='text-4xl font-bold mb-4'>{aboutContent.judul}</h1>
              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>{formatDate(aboutContent.publishedAt)}</span>
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
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-table:border-collapse
                prose-th:border prose-th:border-gray-300 prose-th:bg-gray-100 prose-th:p-3
                prose-td:border prose-td:border-gray-300 prose-td:p-3
                prose-img:rounded-lg prose-img:w-full
                prose-figure:my-8
                prose-figcaption:text-center prose-figcaption:text-gray-600'
              dangerouslySetInnerHTML={{ __html: aboutContent.content }}
            />
          </div>

          {/* Sidebar */}
          <aside className='space-y-8'>
            <Share />

            {/* Recent Posts */}
            <Card>
              <CardContent className='p-6'>
                <h2 className='text-xl font-semibold mb-4'>
                  Postingan Terbaru
                </h2>
                <div className='space-y-4'>
                  {recentPosts.map((post) => (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className='group block'>
                      <div className='flex gap-3'>
                        <Image
                          src={getThumbnailUrl(post.thumbnail, "thumbnail")}
                          alt={post.title}
                          width={80}
                          height={80}
                          className='rounded-lg object-cover'
                        />
                        <h3 className='text-sm font-medium group-hover:text-primary'>
                          {post.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>

      <FooterBlog />
    </div>
  );
}

export const dynamic = "force-dynamic";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, User, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";
import Share from "@/components/share";
import { notFound } from "next/navigation";

function calculateReadTime(content) {
  const plainText = content.replace(/<[^>]*>/g, "");
  const wordsPerMinute = 180;
  const wordCount = plainText.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

async function getArticle(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(
    `${apiUrl}/api/articles?filters[slug][$eq]=${slug}&populate=*`
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();
  if (!data.data || data.data.length === 0) {
    notFound();
  }
  return data.data[0];
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

export async function generateMetadata({ params }) {
  const article = await getArticle(params.article);
  const thumbnailUrl = getThumbnailUrl(article.thumbnail, "large");

  const plainTextDescription =
    article.description.replace(/<[^>]*>/g, "").slice(0, 160) + "...";

  return {
    title: `${article.title} | Rifki Docs`,
    description: plainTextDescription,
    authors: [{ name: article.author?.name }],
    openGraph: {
      title: article.title,
      description: plainTextDescription,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`,
      siteName: "Rifki Docs",
      images: [
        {
          url: thumbnailUrl,
          width: article.thumbnail?.formats?.large?.width || 1200,
          height: article.thumbnail?.formats?.large?.height || 630,
          alt: article.title,
        },
      ],
      locale: "id_ID",
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: article.author?.name,
      tags: article.tags
        ? article.tags.split(",").map((tag) => tag.trim())
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: plainTextDescription,
      images: [thumbnailUrl],
      creator: "@rifkidev",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${article.slug}`,
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

export default async function BlogPost({ params }) {
  const article = await getArticle(params.article);

  const readTimeMinutes = calculateReadTime(article.description);
  const recentPosts = await getRecentPosts();

  const tagList = article.tags
    ? article.tags.split(",").map((tag) => tag.trim())
    : [];

  return (
    <div className='px-4 mt-24'>
      <NavigationBlog />
      <div className='mx-auto max-w-7xl'>
        {/* Cover Image Section */}
        <div className='mb-8 w-full aspect-[21/9] relative overflow-hidden rounded-xl'>
          <Image
            src={getThumbnailUrl(article.thumbnail, "large")}
            alt={article.title}
            fill
            className='object-cover'
            priority
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2'>
            {/* Breadcrumb */}
            <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
              <Link href='/blog' className='hover:text-primary'>
                Blog
              </Link>
              <span>/</span>
              {article.category && (
                <>
                  <Link
                    href={`/blog/category/${article.category.slug}`}
                    className='hover:text-primary'>
                    {article.category.name}
                  </Link>
                  <span>/</span>
                </>
              )}
              <span className='text-muted-foreground'>{article.title}</span>
            </nav>

            {/* Header */}
            <header className='mb-8'>
              <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>
              <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground'>
                {article.author && (
                  <>
                    <User className='w-4 h-4' />
                    <span>{article.author.name}</span>
                  </>
                )}
                <div className='flex items-center gap-1'>
                  <Calendar className='w-4 h-4' />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <div className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  <span>{readTimeMinutes} menit membaca</span>
                </div>
                {article.category && (
                  <Link
                    href={`/blog/category/${article.category.slug}`}
                    className='flex items-center gap-1 hover:text-primary'>
                    <Folder className='w-4 h-4' />
                    <span>{article.category.name}</span>
                  </Link>
                )}
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
              dangerouslySetInnerHTML={{ __html: article.description }}
            />
          </div>

          {/* Sidebar */}
          <aside className='space-y-8'>
            {/* Share Section */}
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

            {/* Tags */}
            {tagList.length > 0 && (
              <Card>
                <CardContent className='p-6'>
                  <h2 className='text-xl font-semibold mb-4'>Tags</h2>
                  <div className='flex flex-wrap gap-2'>
                    {tagList.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/blog/tags/${tag
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}>
                        <Badge
                          variant='secondary'
                          className='hover:bg-primary hover:text-primary-foreground'>
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      </div>

      <FooterBlog />
    </div>
  );
}

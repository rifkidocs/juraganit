// app/blog/[article]/page.js
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Share2,
  Mail,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NavigationBlog } from "@/components/navigation-blog";
import { FooterBlog } from "@/components/footer-blog";

// Fungsi untuk menghitung waktu baca
function calculateReadTime(content) {
  // Hapus HTML tags untuk mendapatkan teks murni
  const plainText = content.replace(/<[^>]*>/g, "");

  // Rata-rata kecepatan baca (kata per menit)
  const wordsPerMinute = 225;

  // Hitung jumlah kata
  const wordCount = plainText.trim().split(/\s+/).length;

  // Hitung waktu baca dalam menit
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return readTime;
}

async function getArticle(slug) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}api/articles?filters[slug][$eq]=${slug}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }

  const data = await res.json();
  return data.data[0];
}

export default async function BlogPost({ params }) {
  const article = await getArticle(params.article);
  const readTimeMinutes = calculateReadTime(article.description);

  const recentPosts = [
    {
      title: "Autodesigner 2.0 is here!",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "Uizard joins Miro!",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "A guide to AI wireframing",
      image: "/placeholder.svg",
      link: "#",
    },
    {
      title: "How to quickly iterate when experiencing design bottlenecks",
      image: "/placeholder.svg",
      link: "#",
    },
  ];

  const tags = [
    "AI Design",
    "App Design Guides",
    "Case Studies",
    "Design Strategy",
    "Mockups Guides",
    "Product Management",
    "Prototyping Guides",
    "UI Design",
    "Uizard Guides",
    "UX Design",
    "Web Design Guides",
    "Wireframing Guides",
  ];

  return (
    <div className='px-4 mt-24'>
      <NavigationBlog />
      <div className='mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2'>
          {/* Breadcrumb */}
          <nav className='flex items-center gap-2 text-sm text-muted-foreground mb-6'>
            <Link href='/blog' className='hover:text-primary'>
              Blog
            </Link>
            <span>/</span>
            <span className='text-muted-foreground'>{article.title}</span>
          </nav>

          {/* Header */}
          <header className='mb-8'>
            <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='w-4 h-4' />
                <span>
                  {new Date(article.publishedAt).toLocaleDateString()}
                </span>
              </div>
              <div className='flex items-center gap-1'>
                <Clock className='w-4 h-4' />
                <span>{readTimeMinutes} min read</span>
              </div>
            </div>
          </header>

          {/* Content dengan styling khusus untuk artikel */}
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
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Share</h2>
              <div className='flex flex-wrap gap-2'>
                <Button variant='outline' size='icon'>
                  <Twitter className='w-4 h-4' />
                </Button>
                <Button variant='outline' size='icon'>
                  <Linkedin className='w-4 h-4' />
                </Button>
                <Button variant='outline' size='icon'>
                  <Facebook className='w-4 h-4' />
                </Button>
                <Button variant='outline' size='icon'>
                  <Mail className='w-4 h-4' />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Posts */}
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Recent posts</h2>
              <div className='space-y-4'>
                {recentPosts.map((post, index) => (
                  <Link key={index} href={post.link} className='group block'>
                    <div className='flex gap-3'>
                      <Image
                        src={post.image}
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
          <Card>
            <CardContent className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Tags</h2>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
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
        </aside>
      </div>

      {/* Related Posts */}
      <section className='mt-12 mx-auto max-w-7xl'>
        <h2 className='text-2xl font-bold mb-6'>You might also like</h2>
        <div className='grid md:grid-cols-3 gap-6'>
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className='p-4'>
                <Image
                  src='/placeholder.svg'
                  alt='Related post thumbnail'
                  width={300}
                  height={200}
                  className='object-cover relative w-full h-48 mb-4 rounded-lg overflow-hidden'
                />
                <h3 className='font-semibold mb-2'>Product Leader Awards</h3>
                <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                  <Calendar className='w-4 h-4' />
                  <span>16 April 2024</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
      <FooterBlog />
    </div>
  );
}

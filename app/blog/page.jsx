import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function BlogListing() {
  const categories = [
    { name: "Tutorial", color: "bg-orange-500" },
    { name: "HTML", color: "bg-blue-500" },
    { name: "CSS", color: "bg-blue-600" },
    { name: "JavaScript", color: "bg-purple-500" },
    { name: "React", color: "bg-orange-600" },
    { name: "Next.js", color: "bg-blue-400" },
    { name: "Node.js", color: "bg-yellow-500" },
    { name: "Database", color: "bg-purple-400" },
  ];

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const data = await response.json();
  const posts = data.data;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const createExcerpt = (htmlContent) => {
    const stripHtml = (html) => {
      return html.replace(/<[^>]*>/g, "");
    };
    const plainText = stripHtml(htmlContent);
    return plainText.slice(0, 100) + "...";
  };

  // Helper function to get image URL from the API response
  const getImageUrl = (post) => {
    // Extract image URL from the description
    const imgMatch = post.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      // Return the first image found in the description
      return imgMatch[1];
    }
    // Return placeholder if no image found
    return "/placeholder.svg";
  };

  return (
    <div className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <div className='max-w-4xl mx-auto'>
        <div className='space-y-4 mb-12'>
          <h1 className='text-4xl font-bold flex items-center gap-2'>
            JuraganIT Blog{" "}
            <span role='img' aria-label='book'>
              📚
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Welcome to JuraganIT blog, where you can learn about web
            development, programming, and technology. Whether you're a beginner
            or an experienced developer, there's something here for everyone.
          </p>
        </div>

        <div className='flex flex-wrap gap-2 mb-8'>
          {categories.map((category) => (
            <Badge
              key={category.name}
              variant='secondary'
              className={`${category.color} text-white hover:${category.color}`}>
              {category.name}
            </Badge>
          ))}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className='group'>
              <Card className='overflow-hidden border-0 border-transparent shadow-none bg-transparent'>
                <CardContent className='p-0 space-y-3'>
                  <div className='overflow-hidden rounded-lg'>
                    <Image
                      src={getImageUrl(post)}
                      alt={post.title}
                      width={600}
                      height={400}
                      className='w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <div className='space-y-2'>
                    <h2 className='font-semibold text-xl group-hover:text-blue-500 transition-colors'>
                      {post.title}
                    </h2>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <span>{formatDate(post.createdAt)}</span>
                      <span>•</span>
                      <span>
                        {Math.ceil(post.description.length / 1000)} min read
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                      {createExcerpt(post.description)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className='flex justify-center gap-2 mt-6 mb-16'>
          {[1].map((page) => (
            <Badge
              key={page}
              variant='default'
              className='w-8 h-8 flex items-center justify-center cursor-pointer'>
              {page}
            </Badge>
          ))}
        </div>
      </div>
      <FooterBlog />
    </div>
  );
}

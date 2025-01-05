import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function BlogListing() {
  const categories = [
    { name: "Trending News", color: "bg-orange-500" },
    { name: "AI Design", color: "bg-blue-500" },
    { name: "Wireframing", color: "bg-blue-600" },
    { name: "Mockups", color: "bg-purple-500" },
    { name: "UI Design", color: "bg-orange-600" },
    { name: "UX Design", color: "bg-blue-400" },
    { name: "Prototyping", color: "bg-yellow-500" },
    { name: "App Design", color: "bg-purple-400" },
  ];

  const posts = [
    {
      title: "Autodesigner 2.0 is here!",
      date: "12 June 2024",
      readTime: "4 min read",
      image: "/placeholder.svg",
    },
    {
      title: "Uizard joins Miro!",
      date: "27 May 2024",
      readTime: "3 min read",
      image: "/placeholder.svg",
    },
    {
      title: "A guide to AI wireframing",
      date: "05 May 2024",
      readTime: "4 min read",
      image: "/placeholder.svg",
    },
    {
      title: "How to quickly iterate when experiencing design bottlenecks",
      date: "02 May 2024",
      readTime: "3 min read",
      image: "/placeholder.svg",
    },
    {
      title: "What's New? April Updates",
      date: "30 April 2024",
      readTime: "2 min read",
      image: "/placeholder.svg",
    },
    {
      title: "How to use Uizard's Screenshot Scanner",
      date: "23 April 2024",
      readTime: "2 min read",
      image: "/placeholder.svg",
    },
  ];

  return (
    <div className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <div className='max-w-4xl mx-auto'>
        <div className='space-y-4 mb-12'>
          <h1 className='text-4xl font-bold flex items-center gap-2'>
            The Lizard Blog of Spells{" "}
            <span role='img' aria-label='wand'>
              ✨
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Welcome to the official Lizard blog, where you can learn about all
            things design and read about all the latest magical Uizarding news.
            Whether you are a seasoned pro or a design newcomer, there is
            something for everyone in the Lizard Blog of Spells.
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
          {posts.map((post, index) => (
            <Link key={index} href='/blog/article' className='group'>
              <Card className='overflow-hidden border-0 border-transparent shadow-none bg-transparent'>
                <CardContent className='p-0 space-y-3'>
                  <div className='overflow-hidden rounded-lg'>
                    <Image
                      src={post.image}
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
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className='flex justify-center gap-2 mt-6 mb-16'>
          {[1, 2, 3, 4].map((page) => (
            <Badge
              key={page}
              variant={page === 1 ? "default" : "secondary"}
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

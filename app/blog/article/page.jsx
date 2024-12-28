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

export default function BlogPost() {
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
    "Uizarding News",
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
            <Link href='/blog/uizarding-news' className='hover:text-primary'>
              Uizarding News
            </Link>
          </nav>

          {/* Header */}
          <header className='mb-8'>
            <h1 className='text-4xl font-bold mb-4'>
              Introducing the New Collaboration Features
            </h1>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <div className='flex items-center gap-1'>
                <Calendar className='w-4 h-4' />
                <span>15 October 2024</span>
              </div>
              <div className='flex items-center gap-1'>
                <Clock className='w-4 h-4' />
                <span>3 min read</span>
              </div>
            </div>
          </header>

          {/* Hero Image */}

          <Image
            src='/placeholder.svg?height=400&width=800'
            alt='Collaboration Features'
            width={800}
            height={400}
            className='object-cover relative w-full h-[400px] mb-8 rounded-lg overflow-hidden'
          />

          {/* Content */}
          <div className='prose prose-lg max-w-none mb-8'>
            <h2 className='text-2xl font-semibold mb-4'>
              Real-time Collaboration
            </h2>
            <p className='mb-4'>
              We are excited to introduce real-time collaboration in our design
              tool. Now, multiple team members can work on the same project
              simultaneously, making it easier to share ideas and iterate
              quickly.
            </p>

            <h2 className='text-2xl font-semibold mb-4'>Commenting System</h2>
            <p className='mb-4'>
              Our new commenting system allows you to leave feedback directly on
              the design canvas. You can tag team members, resolve comments, and
              keep track of all discussions in one place.
            </p>
            <h2 className='text-2xl font-semibold mb-4'>Version History</h2>
            <ul className='list-disc list-inside mb-4'>
              <li>Track changes over time</li>
              <li>Revert to previous versions</li>
              <li>See who made specific changes</li>
            </ul>
            <p className='mb-4'>
              With version history, you can easily manage and review the
              evolution of your projects. This feature ensures that you never
              lose important work and can always revert to a previous state if
              needed.
            </p>
          </div>
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

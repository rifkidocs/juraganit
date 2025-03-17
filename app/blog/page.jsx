export const dynamic = "force-dynamic";
import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Blog JuraganIT",
  description:
    "Selamat datang di blog JuraganIT, tempat di mana Anda bisa belajar tentang pengembangan web, pemrograman, dan teknologi.",
  openGraph: {
    title: "Blog JuraganIT",
    description:
      "Selamat datang di blog JuraganIT, tempat di mana Anda bisa belajar tentang pengembangan web, pemrograman, dan teknologi.",
    images: [
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?title=Blog JuraganIT&description=Selamat datang di blog JuraganIT`,
    ],
  },
};

export default async function BlogListing() {
  const getColorForCategory = (categoryName) => {
    const colors = [
      ["bg-blue-500", "hover:bg-blue-600"],
      ["bg-orange-500", "hover:bg-orange-600"],
      ["bg-purple-500", "hover:bg-purple-600"],
      ["bg-green-500", "hover:bg-green-600"],
      ["bg-yellow-500", "hover:bg-yellow-600"],
      ["bg-red-500", "hover:bg-red-600"],
      ["bg-indigo-500", "hover:bg-indigo-600"],
      ["bg-pink-500", "hover:bg-pink-600"],
    ];
    const index = categoryName.length % colors.length;
    return colors[index];
  };
  const categoriesResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
    {}
  );
  const categoriesData = await categoriesResponse.json();
  const categories = categoriesData.data;

  const page = 1;
  const postsPerPage = 6;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/articles?populate=*&sort=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${postsPerPage}`,
    {}
  );
  const data = await response.json();
  const posts = data.data;
  const pagination = data.meta.pagination;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
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

  const getImageUrl = (post) => {
    if (post.thumbnail) {
      const imageUrl =
        post.thumbnail.formats?.medium?.url || post.thumbnail.url;
      return imageUrl.startsWith("http")
        ? imageUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
    }

    const imgMatch = post.description.match(/<img[^>]+src="([^"\>]+)"/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    return "/placeholder.svg";
  };

  return (
    <div className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <div className='max-w-4xl mx-auto'>
        <div className='space-y-4 mb-12'>
          <h1 className='text-4xl font-bold flex items-center gap-2'>
            Blog JuraganIT
            <span role='img' aria-label='book'>
              📚
            </span>
          </h1>
          <p className='text-lg text-muted-foreground'>
            Selamat datang di blog JuraganIT, tempat di mana Anda bisa belajar
            tentang pengembangan web, pemrograman, dan teknologi. Baik Anda
            seorang pemula maupun pengembang berpengalaman, ada sesuatu di sini
            untuk semua orang.
          </p>
        </div>

        <div className='flex flex-wrap gap-2 mb-8'>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className='group'>
              <Badge
                variant='secondary'
                className={`${getColorForCategory(category.name)[0]} ${
                  getColorForCategory(category.name)[1]
                } text-white`}>
                {category.name}
              </Badge>
            </Link>
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
                        {Math.ceil(post.description.length / 1000)} menit baca
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

        {pagination.pageCount > 1 && (
          <div className='mt-8 mb-16'>
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious href={`/blog/page/${page - 1}`} />
                  </PaginationItem>
                )}
                {Array.from(
                  { length: pagination.pageCount },
                  (_, i) => i + 1
                ).map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/blog/page/${pageNumber}`}
                      isActive={pageNumber === page}>
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {page < pagination.pageCount && (
                  <PaginationItem>
                    <PaginationNext href={`/blog/page/${page + 1}`} />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
      <FooterBlog />
    </div>
  );
}

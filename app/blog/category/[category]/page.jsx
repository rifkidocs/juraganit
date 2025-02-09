import { FooterBlog } from "@/components/footer-blog";
import { NavigationBlog } from "@/components/navigation-blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default async function CategoryPage({ params }) {
  // Fetch category data with its articles based on the slug
  const categoryResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/categories?filters[slug][$eq]=${params.category}&populate=*`,
    {
      next: {
        revalidate: 3600,
      },
    }
  );
  const categoryData = await categoryResponse.json();
  const category = categoryData.data[0]; // Get the first (and should be only) category

  if (!category) {
    return <div>Category not found</div>;
  }

  // Generate a consistent color for the category
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

  const getImageUrl = (article) => {
    // Check if article has thumbnail
    if (article.thumbnail) {
      const imageUrl =
        article.thumbnail.formats?.medium?.url || article.thumbnail.url;
      return imageUrl.startsWith("http")
        ? imageUrl
        : `${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`;
    }

    // Fallback to first image in description
    const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    // Default placeholder
    return "/placeholder.svg";
  };

  return (
    <div className='mx-auto px-4 mt-24'>
      <NavigationBlog />
      <div className='max-w-4xl mx-auto mb-24'>
        <div className='space-y-4 mb-12'>
          <div className='flex items-center gap-3'>
            <Badge
              variant='secondary'
              className={`${getColorForCategory(category.name)[0]} ${
                getColorForCategory(category.name)[1]
              } text-white px-4 py-1`}>
              {category.name}
            </Badge>
            {/* <span className='text-muted-foreground'>
              {category.articles.length} articles
            </span> */}
          </div>
          <h1 className='text-4xl font-bold'>Articles in {category.name}</h1>
          {category.description && (
            <p className='text-lg text-muted-foreground'>
              {category.description}
            </p>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {category.articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className='group'>
              <Card className='overflow-hidden border-0 border-transparent shadow-none bg-transparent'>
                <CardContent className='p-0 space-y-3'>
                  <div className='overflow-hidden rounded-lg'>
                    <Image
                      src={getImageUrl(article)}
                      alt={article.title}
                      width={600}
                      height={400}
                      className='w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105'
                    />
                  </div>
                  <div className='space-y-2'>
                    <h2 className='font-semibold text-xl group-hover:text-blue-500 transition-colors'>
                      {article.title}
                    </h2>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground'>
                      <span>{formatDate(article.createdAt)}</span>
                      <span>•</span>
                      <span>
                        {Math.ceil(article.description.length / 1000)} min read
                      </span>
                    </div>
                    <p className='text-muted-foreground text-sm'>
                      {createExcerpt(article.description)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <FooterBlog />
    </div>
  );
}

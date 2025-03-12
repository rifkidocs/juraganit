import NavigationBlogCore from "./navigation-blog-core";

async function getPesan() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pemesanan`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
export async function NavigationBlog() {
  const dataPesan = await getPesan();

  return (
    <>
      <NavigationBlogCore dataPesan={dataPesan.data} />
    </>
  );
}

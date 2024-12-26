import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Clock } from 'lucide-react'

export function BlogPostCard({
  title,
  date,
  image,
  readingTime
}) {
  return (
    (<div className="group cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
        <div
          className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent z-10" />
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105" />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <time className="text-sm text-gray-400">{date}</time>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            {readingTime}
          </div>
        </div>
        <Button variant="link" className="text-white hover:text-purple-300">
          Read more
        </Button>
      </div>
    </div>)
  );
}


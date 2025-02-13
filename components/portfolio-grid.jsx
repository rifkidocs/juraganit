"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export function PortfolioGrid({ items }) {
  return (
    <motion.div
      className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'
      initial='hidden'
      animate='visible'
      variants={containerVariants}>
      {items.map((item) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          className='group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 border border-gray-300'>
          <motion.div
            className='relative aspect-[4/3] overflow-hidden'
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}>
            <Image
              src={`${apiUrl}${item.image}`}
              alt={item.title}
              fill
              className='object-cover transition-transform duration-300 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
              <motion.div
                className='flex h-full items-center justify-center'
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1 }}>
                <a
                  href={item.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-full bg-white p-3 text-gray-900 hover:bg-gray-100'>
                  <ExternalLink className='h-6 w-6' />
                </a>
              </motion.div>
            </div>
          </motion.div>
          <div className='p-4'>
            <span className='inline-block mb-1 text-xs font-medium text-primary'>
              {item.category}
            </span>
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate'>
              {item.title}
            </h3>
            <p className='text-sm text-gray-600 dark:text-gray-300 line-clamp-2'>
              {item.description}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

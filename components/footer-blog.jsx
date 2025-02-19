import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FooterBlog() {
  const footerLinks = {
    "Informasi Umum": ["Karir", "FAQ", "Tentang Kami"],
    "Layanan Pengguna": ["Kontak", "Pemesanan", "Cek Dokumen"],
    "Kebijakan dan Blog": ["Blog", "Syarat Ketentuan", "Kebijakan Privasi"],
  };

  return (
    <footer className='bg-white border-t border-black/10 w-full'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div>
            <div className='flex items-center'>
              <div className='h-8 w-8 rounded-full bg-purple-600' />
              <span className='ml-2 text-xl font-bold text-black'>
                JuraganIT
              </span>
            </div>
            <p className='mt-4 text-sm text-black'>
              Create product ideas that set you up for success
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className='text-sm font-semibold text-white'>{category}</h3>
              <ul className='mt-4 space-y-2'>
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      href='#'
                      className='text-sm text-black hover:text-gray-600 transition-colors'>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between'>
          <p className='md:text-sm text-xs text-black mx-auto text-center'>
            © 2024 PT Juragan Karya Digital Teknologi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

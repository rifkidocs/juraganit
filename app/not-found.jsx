import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-white'>
      <div className='max-w-2xl px-4 py-8 mx-auto text-center'>
        <h1 className='text-9xl font-bold text-blue-600 mb-4'>404</h1>
        <h2 className='text-3xl font-semibold text-gray-900 mb-4'>
          Halaman Tidak Ditemukan
        </h2>
        <p className='text-lg text-gray-600 mb-8'>
          Maaf, halaman yang Anda cari tidak dapat ditemukan. Silakan kembali ke
          halaman utama atau hubungi kami jika Anda memerlukan bantuan.
        </p>
        <div className='flex justify-center gap-4'>
          <Button asChild className='bg-blue-600 hover:bg-blue-700'>
            <Link href='/'>Kembali ke Beranda</Link>
          </Button>
          <Button
            variant='outline'
            asChild
            className='border-blue-600 text-blue-600 hover:bg-blue-50'>
            <Link href='/kontak-kami'>Hubungi Kami</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

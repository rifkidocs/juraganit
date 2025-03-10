"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-md'>
      <nav className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='flex h-16 items-center justify-between'>
          {/* Logo */}
          <div className='flex items-center'>
            <Link href='/' className='flex items-center space-x-2'>
              <div className='h-8 w-8 rounded-full bg-blue-600' />
              <span className='text-xl font-bold text-white'>JuraganIT</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className='hidden md:flex md:items-center md:space-x-8 font-medium'>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='/'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Home
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='/tentang'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Tentang Kami
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='#layanan'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Layanan
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='/portofolio'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Portofolio
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='/blog'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Blog
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      href='#'
                      className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-500/10 hover'>
                      Kontak Kami
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button className='bg-blue-600 hover:bg-blue-700'>Pemesanan</Button>
          </div>

          {/* Mobile menu button */}
          <div className='md:hidden'>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-white'>
              {isMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className='md:hidden'>
            <div className='space-y-1 px-2 pb-3 pt-2'>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <div className='text-base font-semibold'>Home</div>
                </div>
                <div className='space-y-2'>
                  <Link href='/tentang' className='text-base font-semibold'>
                    Tentang Kami
                  </Link>
                </div>
                <div className='space-y-2'>
                  <div className='text-base font-semibold'>Layanan</div>
                </div>
                <div className='space-y-2'>
                  <Link href='/portofolio' className='text-base font-semibold'>
                    Portofolio
                  </Link>
                </div>
                <div className='space-y-2'>
                  <Link href='/blog' className='text-base font-semibold'>
                    Blog
                  </Link>
                </div>
                <div className='space-y-2'>
                  <div className='text-base font-semibold'>Kontak Kami</div>
                </div>
                <div className='px-3 py-2'>
                  <Button className='w-full bg-purple-600 hover:bg-purple-700'>
                    Konsultasi
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

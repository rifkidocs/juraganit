import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Footer() {
  const footerLinks = {
    Product: [
      "AI UI Design",
      "Design Systems",
      "Wireframing",
      "Prototyping",
      "Design to Code",
    ],
    Resources: [
      "UI Design Templates",
      "Mobile App Templates",
      "Web App Templates",
      "Wireframe Examples",
      "Prototype Examples",
    ],
    Company: ["About", "Blog", "Careers", "Pricing", "Contact"],
  };

  return (
    <footer className='bg-black border-t border-white/10'>
      <div className='mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
          <div>
            <div className='flex items-center'>
              <div className='h-8 w-8 rounded-full bg-purple-600' />
              <span className='ml-2 text-xl font-bold text-white'>Uizard</span>
            </div>
            <p className='mt-4 text-sm text-gray-400'>
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
                      className='text-sm text-gray-400 hover:text-white transition-colors'>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='mt-12 border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between'>
          <p className='text-xs text-gray-400'>
            © 2024 Uizard Technologies. All rights reserved.
          </p>
          <div className='mt-4 md:mt-0'>
            <Button className='bg-purple-600 hover:bg-purple-700'>
              Pemesanan
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

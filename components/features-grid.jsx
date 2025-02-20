import React from "react";
import {
  MessageCircle,
  ImageIcon,
  FileText,
  Mail,
  Newspaper,
  Smartphone,
  MailOpenIcon as Envelope,
  Hand,
} from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Siap melayani pengunjung tanpa batas",
    },
    {
      icon: ImageIcon,
      title: "Gallery Foto",
      description: "Menampilkan gallery foto perusahaan anda",
    },
    {
      icon: FileText,
      title: "Page Portofolio",
      description: "Menampilkan bukti nyata kerja perusahaan anda",
    },
    {
      icon: Mail,
      title: "Email Perusahaan",
      description: "Email dengan nama domain bisnis anda",
    },
    {
      icon: Newspaper,
      title: "News & Blog",
      description: "Page yang berisi berita tentang perusahaan",
    },
    {
      icon: Smartphone,
      title: "Mobile Friendly",
      description: "Tampilan yang menyesuaikan perangkat",
    },
    {
      icon: Envelope,
      title: "Email Subscription",
      description: "Mengumpulkan email follower perusahaan",
    },
    {
      icon: Hand,
      title: "Easy Customize",
      description: "Update/perubahan data web sangat mudah",
    },
  ];

  return (
    <div className='w-full'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>Layanan Kami</h2>
          <div className='w-20 h-1 bg-blue-500 mx-auto rounded-full'></div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {features.map((feature, index) => (
            <div
              key={index}
              className='group relative bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:-translate-y-1'>
              <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

              <div className='relative z-10'>
                <div className='mb-6 bg-blue-500/10 p-4 rounded-lg w-16 h-16 mx-auto flex items-center justify-center group-hover:bg-blue-500/20 transition-colors duration-300'>
                  <feature.icon className='h-8 w-8 text-blue-400' />
                </div>

                <h3 className='text-xl font-semibold text-white mb-3'>
                  {feature.title}
                </h3>

                <p className='text-gray-300 text-sm'>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

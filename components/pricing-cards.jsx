"use client";
import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function PricingCards({ data, dataPesan }) {
  const plans = [
    {
      ...data.PricingItem1,
      price: new Intl.NumberFormat("id-ID").format(data.PricingItem1.Harga),
      extension: `Perpanjangan Rp.${new Intl.NumberFormat("id-ID").format(
        data.PricingItem1.Perpanjangan
      )}/thn`,
      headerClass: "bg-gradient-to-r from-blue-600 to-blue-700",
      features: data.PricingItem1.Fitur,
      description:
        "Cocok untuk bisnis UMKM skala kecil, Web Landing page produk, dan lain sebagainya.",
    },
    {
      ...data.PricingItem2,
      price: new Intl.NumberFormat("id-ID").format(data.PricingItem2.Harga),
      extension: `Perpanjangan Rp.${new Intl.NumberFormat("id-ID").format(
        data.PricingItem2.Perpanjangan
      )}/thn`,
      headerClass: "bg-gradient-to-r from-orange-500 to-orange-600",
      isPopular: true,
      features: data.PricingItem2.Fitur,
      description:
        "Cocok untuk company profile perusahaan skala menengah dan kalangan profesional",
    },
    {
      ...data.PricingItem3,
      price: new Intl.NumberFormat("id-ID").format(data.PricingItem3.Harga),
      extension: `Perpanjangan Rp.${new Intl.NumberFormat("id-ID").format(
        data.PricingItem3.Perpanjangan
      )}/thn`,
      headerClass: "bg-gradient-to-r from-blue-600 to-blue-700",
      features: data.PricingItem3.Fitur,
      description:
        "Cocok untuk company profile perusahaan skala besar dan kalangan profesional",
    },
  ];
  return (
    <div className='w-full py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold text-white mb-4'>
            {data.PricingJudul}
          </h2>
          <p className='text-gray-300 text-lg mb-6'>{data.PricingSubJudul}</p>
          <div className='w-20 h-1 bg-blue-500 mx-auto rounded-full'></div>
        </div>

        <div className='grid gap-8 md:grid-cols-3'>
          {plans.map((plan) => (
            <Card
              key={plan.Judul}
              className={`relative overflow-hidden rounded-xl border backdrop-blur-lg bg-white/5 transition-all duration-300 hover:-translate-y-2 ${
                plan.isPopular
                  ? "border-orange-500/50 shadow-xl shadow-orange-500/10"
                  : "border-white/10 hover:border-blue-500/50"
              }`}>
              {plan.isPopular && (
                <div className='absolute -right-12 top-6 rotate-45 bg-orange-500 px-12 py-1 text-sm font-semibold text-white'>
                  Popular
                </div>
              )}
              <CardHeader className={`space-y-1 p-6 ${plan.headerClass}`}>
                <h3 className='text-2xl font-bold text-white'>{plan.Judul}</h3>
              </CardHeader>
              <CardContent className='p-6'>
                <div className='mb-6'>
                  <div className='flex items-baseline text-white'>
                    <span className='text-lg font-medium'>Rp</span>
                    <span className='text-4xl font-bold tracking-tight'>
                      {plan.price}
                    </span>
                  </div>
                  <p className='text-sm text-gray-400'>{plan.extension}</p>
                </div>
                <ul className='mb-6 space-y-3'>
                  {plan.features.map((feature) => (
                    <li key={feature} className='flex items-center gap-3'>
                      <Check className='h-5 w-5 text-blue-400' />
                      <span className='text-gray-300'>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className='flex flex-col gap-4 p-6 pt-0'>
                <Button
                  onClick={() => {
                    const phoneNumber = dataPesan?.nomor;
                    const message = plan.isPopular
                      ? dataPesan?.text_bisnis
                      : plan.price === plans[0].price
                      ? dataPesan?.text_umkm
                      : dataPesan?.text_corporate;
                    if (phoneNumber && message) {
                      window.open(
                        `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                          message
                        )}`,
                        "_blank"
                      );
                    }
                  }}
                  className={`w-full text-white transition-all duration-300 ${
                    plan.isPopular
                      ? "bg-orange-500 hover:bg-orange-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}>
                  Order Sekarang
                </Button>
                <p className='text-center text-sm text-gray-400'>
                  {plan.description}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

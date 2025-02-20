"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Hero() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validateDomain = (domain) => {
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    return pattern.test(domain);
  };

  const getErrorMessage = (error) => {
    if (error.detail?.includes("unknown zone")) {
      const zone = error.detail.split(": ")[1];
      return `Ekstensi domain '${zone}' tidak valid. Gunakan ekstensi yang umum seperti .com, .net, .id, dll.`;
    }
    if (error.message === "Bad request") {
      return "Format domain tidak valid. Pastikan format domain sudah benar (contoh: domain.com)";
    }
    return error.message || "Terjadi kesalahan saat mengecek domain";
  };

  const checkDomain = async () => {
    if (!domain) {
      toast({
        title: "Error",
        description: "Silakan masukkan nama domain terlebih dahulu",
        variant: "destructive",
      });
      return;
    }

    if (!validateDomain(domain)) {
      toast({
        title: "Format Tidak Valid",
        description: "Format domain tidak valid. Contoh: domain.com",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/domain?domain=${encodeURIComponent(domain)}`
      );
      const data = await response.json();

      if (data.errors) {
        const errorMessage = getErrorMessage(data.errors[0]);
        toast({
          title: "Domain Tidak Valid",
          description: errorMessage,
          variant: "destructive",
        });
        return;
      }

      if (data.status && data.status.length > 0) {
        const domainStatus = data.status[0];

        if (domainStatus.summary === "active") {
          toast({
            title: "Domain Tidak Tersedia",
            description: `Domain ${domainStatus.domain} sudah terdaftar`,
            variant: "destructive",
          });
        } else if (domainStatus.summary === "inactive") {
          toast({
            title: "Domain Tersedia!",
            description: `Domain ${domainStatus.domain} tersedia untuk didaftarkan`,
            variant: "default",
          });
        } else {
          toast({
            title: "Status Tidak Diketahui",
            description: `Status domain ${domainStatus.domain} tidak dapat diketahui`,
            variant: "default",
          });
        }
      } else {
        toast({
          title: "Error",
          description: "Tidak dapat menemukan informasi domain",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghubungi server",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8'>
      <div className='text-center'>
        <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl'>
          Bangun bisnis online Anda
          <br />
          <span className='text-white'>dengan mudah bersama </span>
          <span className='bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent'>
            JuraganIT
          </span>
        </h1>
        <p className='mx-auto mt-6 max-w-2xl text-lg text-gray-300'>
          Temukan dan amankan nama domain ideal untuk bisnis Anda. Mulai
          perjalanan digital Anda sekarang.
        </p>
        <div className='mx-auto mt-10 max-w-xl'>
          <div className='flex gap-2 sm:flex-row flex-col'>
            <Input
              type='text'
              placeholder='Masukkan nama domain... (contoh: domain.com)'
              className='bg-black border-white/20 text-white'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && checkDomain()}
            />
            <Button
              className='bg-blue-600 hover:bg-blue-700'
              onClick={checkDomain}
              disabled={loading}>
              {loading ? "Mengecek..." : "Cek Domain"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

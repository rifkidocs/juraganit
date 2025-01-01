import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const domain = searchParams.get("domain");

  if (!domain) {
    return NextResponse.json(
      { error: "Parameter domain diperlukan." },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://jsonwhoisapi.com/api/v1/whois?identifier=${domain}`,
      {
        headers: {
          Authorization:
            "Basic " +
            Buffer.from("168439046:63ZpMVCB2AxwZAdD9LixEg").toString("base64"),
        },
      }
    );

    const data = await response.json();
    console.log(data);

    if (data.registered) {
      // Jika domain terdaftar
      return NextResponse.json({
        domain,
        available: false,
        message: "Domain sudah terdaftar.",
      });
    } else if (data.errors && data.errors.server) {
      // Jika terjadi kesalahan pada server whois
      return NextResponse.json(
        {
          error: "Terjadi kesalahan pada server whois.",
          details: data.errors.server,
        },
        { status: 500 }
      );
    } else {
      // Jika domain tidak terdaftar
      return NextResponse.json({
        domain,
        available: true,
        message: "Domain tersedia.",
      });
    }
  } catch (error) {
    // Jika terjadi kesalahan lain
    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat memeriksa ketersediaan domain.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

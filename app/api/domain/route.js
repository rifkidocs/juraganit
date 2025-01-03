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

  const url = `https://domainr.p.rapidapi.com/v2/status?domain=${encodeURIComponent(
    domain
  )}`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "0dadc79526msh9d91b50596e9cc0p1b4121jsn63b94126f07f",
      "x-rapidapi-host": "domainr.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    // Mengembalikan respons langsung dari API Domainr tanpa perubahan
    return NextResponse.json(data);
  } catch (error) {
    // Jika terjadi kesalahan saat mengakses API
    return NextResponse.json(
      {
        error: "Terjadi kesalahan saat mengakses API Domainr.",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

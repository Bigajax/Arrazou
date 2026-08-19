import type { Metadata } from "next";
import { Jost, Prata } from "next/font/google";
import Header from "@/components/Header";
import { DefsMoldura } from "@/components/Moldura";
import Rodape from "@/components/Rodape";
import WhatsAppFlutuante from "@/components/WhatsAppFlutuante";
import { site } from "@/data/site.config";
import "./globals.css";

const prata = Prata({
  variable: "--font-prata",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "ArraZou! Semijoias — Catálogo de semijoias em Maringá | Ouro 18k e Prata 925",
    template: "%s | ArraZou! Semijoias",
  },
  description: site.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "ArraZou! Semijoias — Ouro 18k e prata 925, com garantia",
    description: site.descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  robots: { index: true, follow: true },
};

const negocio = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: site.nome,
  description: site.descricao,
  url: site.url,
  image: `${site.url}/marca/arrazou-logo.png`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.cidade,
    addressRegion: site.estado,
    postalCode: site.cep,
    addressCountry: "BR",
  },
  areaServed: "Maringá e região, Paraná",
  sameAs: [site.instagramUrl, site.facebookUrl],
  priceRange: "R$ 32 - R$ 349",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${prata.variable} ${jost.variable}`}
    >
      <body className="min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(negocio).replace(/</g, "\\u003c"),
          }}
        />
        <DefsMoldura />
        <Header />
        {children}
        <Rodape />
        <WhatsAppFlutuante />
      </body>
    </html>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import IconeWhatsApp from "@/components/IconeWhatsApp";
import { linkGeral } from "@/lib/whatsapp";

/**
 * Aparece depois de 400px de rolagem. Some na página de produto no mobile,
 * onde já existe a barra fixa com o botão de pedir.
 */
export default function WhatsAppFlutuante() {
  const [visivel, setVisivel] = useState(false);
  const pathname = usePathname();
  const emProduto = pathname.startsWith("/produto/");

  useEffect(() => {
    const aoRolar = () => setVisivel(window.scrollY > 400);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  if (!visivel) return null;

  return (
    <a
      href={linkGeral()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed right-5 bottom-5 z-50 h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_20px_rgba(20,17,15,0.25)] transition-transform duration-200 hover:scale-105 ${
        emProduto ? "hidden md:inline-flex" : "inline-flex"
      }`}
    >
      <IconeWhatsApp className="h-7 w-7" />
    </a>
  );
}

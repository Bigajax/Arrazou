"use client";

import Image from "next/image";
import { useState } from "react";
import Moldura from "@/components/Moldura";

export default function GaleriaProduto({
  imagens,
  alt,
}: {
  imagens: string[];
  alt: string;
}) {
  const [atual, setAtual] = useState(0);

  return (
    <div>
      <Moldura className="aspect-4/5 w-full">
        <Image
          src={imagens[atual]}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 50vw, 440px"
          loading="eager"
          fetchPriority="high"
          className="object-cover"
        />
      </Moldura>

      {imagens.length > 1 && (
        <div className="mt-4 flex gap-3">
          {imagens.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setAtual(i)}
              aria-label={`Ver foto ${i + 1} de ${imagens.length}`}
              aria-current={i === atual}
              className={`relative aspect-4/5 w-16 transition-opacity duration-200 ${
                i === atual ? "opacity-100" : "opacity-55 hover:opacity-100"
              }`}
            >
              <Moldura className="absolute inset-0" fio="leve">
                <Image
                  src={img}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </Moldura>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

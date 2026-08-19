import type { MetadataRoute } from "next";
import { site } from "@/data/site.config";
import { getProdutos } from "@/lib/catalogo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const produtos = await getProdutos();
  return [
    { url: site.url, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/catalogo`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/sobre`, changeFrequency: "monthly", priority: 0.5 },
    ...produtos.map((p) => ({
      url: `${site.url}/produto/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}

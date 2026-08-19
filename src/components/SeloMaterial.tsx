import { NOMES_MATERIAL, type Material } from "@/lib/tipos";

export default function SeloMaterial({
  material,
  className = "",
}: {
  material: Material;
  className?: string;
}) {
  const ouro = material === "ouro18k";
  return (
    <span
      className={`eyebrow inline-flex items-center gap-1.5 ${className}`}
      title={ouro ? "Banho de ouro 18k com garantia" : "Prata 925 legítima"}
    >
      <span
        aria-hidden
        className={`inline-block h-[6px] w-[6px] rotate-45 ${ouro ? "bg-ouro" : "bg-prata"}`}
      />
      {NOMES_MATERIAL[material]}
    </span>
  );
}

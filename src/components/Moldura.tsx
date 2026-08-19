/**
 * A moldura-cartucho.
 *
 * É o recorte de cartela de joalheria: arco em ogiva em cima e embaixo, ombros
 * recuados e laterais retas — a mesma silhueta das etiquetas de veludo antigas.
 * A foto é recortada nessa forma e um fio duplo de ouro contorna a borda.
 *
 * O <path> vive num espaço 200x250 (o mesmo 4:5 dos cards), então o recorte
 * acompanha o elemento sem distorcer. O <defs> é montado uma vez só, no
 * layout, porque o id precisa ser único na página.
 */
export const CARTUCHO =
  "M100 6 C118 8, 142 12, 148 24 C152 34, 162 38, 175 40 C188 43, 194 50, 194 62 L194 188 C194 200, 188 207, 175 210 C162 212, 152 216, 148 226 C142 238, 118 242, 100 244 C82 242, 58 238, 52 226 C48 216, 38 212, 25 210 C12 207, 6 200, 6 188 L6 62 C6 50, 12 43, 25 40 C38 38, 48 34, 52 24 C58 12, 82 8, 100 6 Z";

/** Vai uma vez no layout. Sem isso o clip-path não resolve. */
export function DefsMoldura() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="moldura-cartucho" clipPathUnits="objectBoundingBox">
          <path transform="scale(0.005, 0.004)" d={CARTUCHO} />
        </clipPath>
      </defs>
    </svg>
  );
}

export default function Moldura({
  children,
  className = "",
  fio = "forte",
}: {
  children: React.ReactNode;
  className?: string;
  /** "forte" para card e galeria; "leve" para miniaturas. */
  fio?: "forte" | "leve";
}) {
  return (
    <div className={`relative ${className}`}>
      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#moldura-cartucho)" }}
      >
        {children}
      </div>

      <svg
        viewBox="0 0 200 250"
        preserveAspectRatio="none"
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <path
          d={CARTUCHO}
          fill="none"
          stroke="var(--color-ouro)"
          strokeWidth={fio === "forte" ? 1.6 : 1}
          vectorEffect="non-scaling-stroke"
        />
        {fio === "forte" && (
          <path
            d={CARTUCHO}
            fill="none"
            stroke="rgba(200,162,74,0.45)"
            strokeWidth={0.8}
            vectorEffect="non-scaling-stroke"
            transform="translate(100 125) scale(0.94) translate(-100 -125)"
          />
        )}
      </svg>
    </div>
  );
}

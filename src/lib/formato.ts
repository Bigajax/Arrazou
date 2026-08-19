/** Formata centavos no padrão brasileiro: 21900 -> "R$ 219,00". */
export function formatarBRL(centavos: number): string {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

/** Só o número, para JSON-LD: 21900 -> "219.00". */
export function precoSchema(centavos: number): string {
  return (centavos / 100).toFixed(2);
}

// Tipos compartilhados. Sem runtime — pode ser importado por server e client.

export type Material = "ouro18k" | "prata925";

export type Fornecedor = "Cristali" | "Montesanto";

export type Categoria =
  | "colares"
  | "gargantilhas"
  | "correntes"
  | "pulseiras"
  | "brincos"
  | "earcuff"
  | "aneis"
  | "conjuntos"
  | "chokers"
  | "pingentes";

export interface Produto {
  id: string; // 'ARZ-0001'
  slug: string; // 'colar-perola-coracao'
  nome: string;
  categoria: Categoria;
  material: Material;
  fornecedor: Fornecedor;
  preco: number; // centavos: 21900 = R$ 219,00
  precoPromocional?: number;
  imagens: string[]; // 1 a 4, a primeira é a capa
  alt: string;
  descricao: string;
  medidas?: string;
  disponivel: boolean;
  destaque: boolean;
  tags?: string[];
}

export interface CategoriaResumo {
  id: Categoria;
  nome: string;
  quantidade: number;
}

export type Ordem = "relevancia" | "menor-preco" | "maior-preco";

export interface Filtros {
  categoria?: Categoria;
  material?: Material;
  precoMax?: number; // centavos
  busca?: string;
  apenasDisponiveis?: boolean;
  ordem?: Ordem;
}

/** Projeção enxuta que trafega até o cliente na listagem. */
export type ProdutoResumo = Pick<
  Produto,
  | "id"
  | "slug"
  | "nome"
  | "categoria"
  | "material"
  | "preco"
  | "precoPromocional"
  | "alt"
  | "disponivel"
> & { imagem: string };

export const NOMES_CATEGORIA: Record<Categoria, string> = {
  colares: "Colares",
  gargantilhas: "Gargantilhas",
  correntes: "Correntes",
  pulseiras: "Pulseiras",
  brincos: "Brincos",
  earcuff: "Ear cuff",
  aneis: "Anéis",
  conjuntos: "Conjuntos",
  chokers: "Chokers",
  pingentes: "Pingentes",
};

export const NOMES_MATERIAL: Record<Material, string> = {
  ouro18k: "Ouro 18k",
  prata925: "Prata 925",
};

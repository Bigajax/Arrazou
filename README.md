# ArraZou! Semijoias — catálogo digital (v1)

Catálogo navegável com saída para o WhatsApp. Sem admin, sem carrinho, sem
checkout — mas com a leitura de dados isolada para a v2 (painel + Supabase) não
precisar reescrever nenhuma tela.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · deploy na Vercel.

```bash
npm run dev     # http://localhost:3000
npm run build   # build de produção
npm run lint
```

## O que a loja precisa mexer

| Quero mudar | Arquivo |
|---|---|
| **WhatsApp**, horário, Instagram, cidade | `src/data/site.config.ts` |
| Peças: nome, preço, disponível, destaque | `src/data/produtos.ts` |
| Textos das mensagens do WhatsApp | `src/data/site.config.ts` → `mensagens` |

### ⚠️ Pendências antes de publicar

1. **WhatsApp está com número provisório** (`5544999999999` em
   `src/data/site.config.ts`). Trocar pelo número comercial real — só dígitos,
   com `55` + DDD. É uma linha.
2. **Horário de atendimento** em `site.config.ts` é uma suposição — confirmar.
3. **Preços e disponibilidade** das 28 peças: todos foram lidos das próprias
   fotos do feed (onde a loja escrevia o valor por cima da imagem). Conferir um
   a um antes de publicar.
4. **Fornecedor**: está `Cristali` em todas as peças, porque é a cartela que
   aparece nas fotos. Ajustar as que forem Montesanto.
5. **Medidas** (45cm, aro 18…) não foram preenchidas — só entram quando a loja
   informar. O campo já existe: `medidas` em `src/data/produtos.ts`.
6. **Domínio**: `site.url` está como `arrazousemijoias.com.br`. Trocar pelo
   domínio real antes do deploy (afeta canonical, sitemap e JSON-LD).

## Rotas

- `/` — hero, categorias, destaques, garantias
- `/catalogo` — grade com filtro de categoria, material, preço, busca e ordenação
- `/produto/[slug]` — 28 páginas estáticas, uma por peça
- `/sobre` — quem é a loja, procedência e os 3 passos da compra
- `/sitemap.xml`, `/robots.txt`

## A regra de arquitetura (não quebrar)

**Nenhum componente importa `src/data/produtos.ts`.** Todo acesso passa por
`src/lib/catalogo.ts`, que expõe quatro funções, todas `async`:

```ts
getProdutos(filtros?)      getProdutoPorSlug(slug)
getCategorias()            getDestaques(limite?)
```

Na v2 troca-se só o corpo dessas funções por consultas ao Supabase — nenhuma
tela do catálogo é reescrita. Duas travas protegem isso:

- `import "server-only"` no topo de `lib/catalogo.ts` — se um componente client
  importar, o build quebra;
- regra `no-restricted-imports` no `eslint.config.mjs`.

`src/lib/filtros.ts` é a lógica de filtro **isomórfica**: o servidor usa no
primeiro render, o cliente usa nas interações. Uma implementação só, então o
que o servidor pinta e o que o cliente repinta nunca divergem.

### Por que `/catalogo` é a única rota dinâmica

Ela lê `searchParams` para já entregar o HTML filtrado (bom para LCP e para o
link que a loja manda no WhatsApp). Depois da hidratação, filtrar é local:
`useState` + `history.replaceState`, sem ida ao servidor a cada tecla.
`/`, `/sobre` e as 28 páginas de produto são estáticas.

## Fotos

As fotos vêm do próprio Instagram da loja, em 1080px, e foram **recortadas
fechadas na peça** — isso isola a joia e, de quebra, tira da imagem o preço que
estava escrito por cima. O preço agora vive só no dado, dentro do componente
`<Etiqueta>`: mudou o preço, muda no site, sem refazer foto.

- `public/img/*.webp` — 1000×1250 (4:5), o que o site usa
- `public/marca/arrazou-logo.png` — logo circular com fundo transparente
- `public/og.jpg` — imagem de compartilhamento
- `_raw-ig/` — originais baixados, **fora do build e fora do git**

Para trocar ou acrescentar fotos:

```bash
node scripts/fotos.mjs     # recorta de _raw-ig/ para public/img/
node scripts/auditar.mjs   # folha de conferência em _raw-ig/_auditoria.jpg
node scripts/logo.mjs      # logo circular
node scripts/og.mjs        # imagem de compartilhamento
```

Os recortes ficam na lista `PECAS` em `scripts/fotos.mjs`, em porcentagem da
foto original: `box: [x0, y0, x1, y1]`. `scripts/grade.mjs` gera uma folha com
grade percentual por cima das fotos, para escolher o recorte sem chutar.

## Design

- **Ônix** `#14110F` ancora hero e rodapé, **pérola** `#F6F1E7` domina, **ouro**
  `#C8A24A` é só fio de 1px e etiqueta. **Rubi** `#7E1F2B` aparece no máximo uma
  vez por tela (promoção e esgotado).
- Display **Prata**, texto **Jost**. Preço sempre com `tabular-nums`.
- Elemento-assinatura: `<Etiqueta>` — a cartela furada da loja virou componente,
  com furo recortado de verdade (máscara CSS), e é o único ornamento do projeto.
- Ouro nunca como texto pequeno sobre pérola (reprova contraste) — nesse caso,
  grafite.

## v2 (não está aqui)

Painel em `/admin` com login e Supabase: cadastrar peça, subir foto, editar
preço, marcar esgotado e destaque. Como toda leitura já passa por
`lib/catalogo.ts`, a v2 é: criar as tabelas, trocar o corpo das funções e
construir o painel.

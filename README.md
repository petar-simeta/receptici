# Receptići

Privatna, potpuno statička zbirka recepata za dvoje ljudi. Aplikacija je izrađena u Astrou, a recepti su verzionirani MDX dokumenti u repozitoriju. Nema baze, prijave, administratorskog sučelja ni runtime API-ja.

## Lokalni razvoj

```bash
npm install
npm run dev
```

Provjere prije predaje:

```bash
npm run check
npm run build
npm run preview
```

Astro generira gotove HTML, CSS i JavaScript datoteke u direktoriju `dist/`.

## Struktura

- `src/content/recipes/` — jedan MDX dokument po receptu
- `src/content.config.ts` — obavezna shema i validacija recepata
- `src/pages/` — Obroci, Slastice i statičke stranice recepata
- `src/components/` — prikaz, shopping lista, skaliranje i Wake Lock
- `public/images/recipes/` — stvarne ili privremene slike recepata
- `public/fonts/` — lokalno posluženi Manrope variable font i licenca
- `docs/recipe-authoring.md` — pravila za dodavanje i uređivanje recepata
- `templates/recipe.mdx` — početni predložak novog recepta

## Dodavanje recepta

Recepti se ne dodaju kroz aplikaciju. Novi recept treba dodati kao MDX datoteku prema uputama u [`docs/recipe-authoring.md`](docs/recipe-authoring.md), a zatim pokrenuti `npm run build`. Git služi kao povijest promjena i sigurnosna kopija sadržaja.

## Kategorije

- `meal` — prikazuje se na naslovnici **Obroci**
- `dessert` — prikazuje se na stranici **Slastice**

Tagovi su dodatne, fleksibilne oznake i ne zamjenjuju glavnu kategoriju.

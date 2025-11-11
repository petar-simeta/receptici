// lib/slug.ts
export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD") // ukloni dijakritike
    .replace(/[\u0300-\u036f]/g, "") // ukloni kombinirane znakove
    .replace(/[^a-z0-9]+/g, "-") // sve što nije slovo/broj -> -
    .replace(/^-+|-+$/g, "") // trim - s početka/kraja
    .slice(0, 60); // sigurnosni limit duljine
}

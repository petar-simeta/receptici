# Receptići

## Kontekst projekta

- Ovo je osobna zbirka recepata vlasnika i njegove supruge.
- Najvažniji tok je brzo pronaći recept, provjeriti sastojke i pratiti upute u kuhinji.
- Projekt je potpuno statička Astro aplikacija bez baze, autentikacije i runtime API-ja.
- Recepti se dodaju isključivo kao verzionirane MDX datoteke uz pomoć Codexa.
- Očekuje se približno 15–20, a najviše oko 50 recepata.

## Prioriteti

- Brzina i mobilni UX imaju prednost pred vizualnim redizajnom.
- Održavati aplikaciju jednostavnom i statičkom.
- Ne uvoditi bazu, CMS, administratorsko sučelje, login ili CRUD bez izričitog zahtjeva.
- Čuvati postojeće slugove kako se ne bi lomili spremljeni URL-ovi.
- Shopping lista, skaliranje i Wake Lock moraju raditi bez React runtimea.

## Pravila sadržaja

- Prije dodavanja ili uređivanja recepta obavezno pročitati `docs/recipe-authoring.md`.
- Svaki recept mora imati glavnu kategoriju `meal` ili `dessert`.
- Svaki recept mora imati broj osoba, kriški, keksa ili drugu praktičnu količinu prinosa.
- Svaki recept mora imati sliku i alternativni tekst; do dostave stvarne fotografije koristiti odgovarajuću zadanu ilustraciju.
- Ocjene ne postoje i ne smiju se vraćati.
- Cijena i kalorije ostaju iskazane po porciji.
- Shopping sastojci u frontmatteru i količine u uputama namjerno su odvojeni i smiju se ponavljati.
- Shopping sastojci moraju biti ravan popis svega što treba kupiti ili provjeriti kod kuće.
- Upute moraju biti samostalne: tijekom kuhanja moraju navoditi potrebne sastojke i precizne količine.
- Začini u shopping popisu mogu biti općeniti, dok upute moraju sadržavati konkretne količine.
- Koraci se pišu hrvatskim infinitivom i moraju biti konzistentni unutar cijelog recepta.

## Skaliranje mesa

- Skaliranje je opcionalno i ne uključuje se automatski za svaki recept s mesom.
- Kod svakog novog recepta s mesom obavezno pitati korisnika želi li mogućnost skaliranja.
- Ako se skaliranje koristi, osnovni recept se u pravilu priprema za 1000 g ukupnog mesa.
- Početne opcije su 500 g, 1000 g i 1500 g.
- Skalirati samo količine označene komponentom `Amount` ili strukturiranim `scaled` podatkom.
- Nikada automatski ne skalirati temperaturu, trajanje, veličinu posude ili tekstualne vrijednosti poput „po ukusu”.
- Nakon skaliranja moraju se uskladiti shopping popis, količine u uputama i broj osoba.

## Implementacija i provjera

- Kod, komentari, identifikatori i nazivi CSS klasa pišu se na engleskom.
- Korisničko sučelje i recepti pišu se prirodnim hrvatskim jezikom.
- Klikljive kontrole moraju imati pointer cursor, vidljiv fokus i dovoljno velik mobilni touch target.
- Nakon promjene sadržaja ili koda pokrenuti `npm run check` i `npm run build`.
- Ne pushati niti objavljivati promjene bez izričitog zahtjeva korisnika.

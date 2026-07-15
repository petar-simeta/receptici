# Upute za dodavanje i uređivanje recepata

Ovaj dokument definira obavezni format i stil svih recepata u projektu. Cilj je da recept koji doda AI izgleda i ponaša se kao postojeći recepti, bez ručnog popravljanja u aplikaciji.

## Postupak prije dodavanja

1. Prikupiti naziv, opis, sastojke, upute i izvorne količine.
2. Odabrati glavnu kategoriju: `meal` za Obroke ili `dessert` za Slastice.
3. Procijeniti ili provjeriti za koliko osoba, kriški ili komada je recept.
4. Ako recept sadrži meso, **obavezno pitati korisnika želi li skaliranje prema količini mesa**. Ne zaključivati to samostalno.
5. Razjasniti svaku nejasnu količinu koja bi mogla promijeniti rezultat recepta.
6. Napraviti novu datoteku prema `templates/recipe.mdx`.
7. Pokrenuti `npm run check` i `npm run build`.

## Obavezni podaci

Svaki recept mora imati:

- naslov i kratki podnaslov;
- putanju do slike i smislen alternativni tekst;
- kategoriju `meal` ili `dessert`;
- ukupno trajanje u minutama;
- cijenu i kalorije po porciji;
- očekivani broj osoba, kriški, keksa ili komada;
- tagove;
- ravan shopping popis sastojaka;
- potpune upute za kuhanje.

Slug nastaje iz naziva MDX datoteke. Koristiti mala slova, ASCII znakove i crtice. Ne mijenjati slug postojećeg recepta samo zato što je promijenjen prikazani naslov.

## Slika recepta

Svaki recept mora imati `image` i `imageAlt`. Dok nemamo stvarnu fotografiju koristiti jednu od neutralnih ilustracija:

```yaml
image: /images/recipes/default-meal.svg
imageAlt: Privremena ilustracija za naziv recepta
```

- Obroci koriste `/images/recipes/default-meal.svg`.
- Slastice koriste `/images/recipes/default-dessert.svg`.
- Kod zamjene fotografijom spremiti optimiziranu datoteku u `public/images/recipes/` i ažurirati oba polja.
- Alternativni tekst mora kratko opisati ono što je stvarno prikazano na fotografiji.

## Shopping sastojci i upute nisu ista stvar

Ovo je najvažnije domensko pravilo projekta.

### Shopping sastojci u frontmatteru

Služe za:

- brzu provjeru imamo li sve kod kuće;
- izradu popisa za kupnju;
- pretragu recepata po sastojku.

Moraju biti jedan ravan popis. Ne dijeliti ih na grupe za tijesto, umak ili prilog. Količina može biti približna ili izostavljena za osnovne začine i namirnice koje samo treba imati kod kuće.

### Sastojci i količine u uputama

Upute moraju biti potpuno samostalne. Korisnik na mobitelu treba moći kuhati bez vraćanja na shopping sidebar. Zato u koracima ponovno navesti sastojke i precizne količine u trenutku kada se koriste.

Ponavljanje između sidebara i uputa je namjerno i ne smije se automatski uklanjati.

## Stil pisanja

- Pisati na hrvatskom.
- Sve korake pisati infinitivom: „Dodati”, „Promiješati”, „Peći”.
- Koristiti `°C`, `g`, `kg`, `ml`, `dl`, „žličica” i „žlica” konzistentno.
- Decimalne vrijednosti u prikazu pisati hrvatskim zarezom.
- Koristiti „čili”, „sojin umak” i „riblji umak”.
- Jasno označiti čekanje, hlađenje i paralelne radnje.
- Istaknuti kritičnu napomenu samo kada stvarno utječe na rezultat.
- Ne uljepšavati ili mijenjati kulinarski postupak bez opravdanog razloga.

## Broj osoba ili komada

Polje `yield` opisuje stvarni prinos:

```yaml
yield:
  amount: 4
  unit: osoba
  oneUnit: osobu
  fewUnit: osobe
```

`unit` je oblik za 5 i više, `fewUnit` za brojeve koji završavaju na 2–4 (osim 12–14), a opcionalni `oneUnit` za jedan. Kod jedinica koje se ne mijenjaju dovoljno je navesti samo `unit`.

Za slastice koristiti praktičnu jedinicu:

```yaml
yield:
  amount: 10
  unit: kriški
```

Ako broj nije poznat, pronaći vjerodostojan izvor ili procijeniti prema ukupnoj količini. U samom prikazu koristiti realnu, praktičnu vrijednost.

## Opcionalno skaliranje prema mesu

Skaliranje se dodaje samo nakon potvrde korisnika.

Osnovni primjer:

```yaml
scaling:
  label: Količina mesa
  baseGrams: 1000
  defaultGrams: 500
  options:
    - 500
    - 1000
    - 1500
```

`baseGrams` uvijek opisuje količinu prema kojoj su zapisane izvorne MDX vrijednosti. Opcionalni `defaultGrams` određuje količinu koja će biti odabrana pri prvom otvaranju recepta; mora biti jedna od vrijednosti u `options`. Ako se izostavi, zadana je vrijednost jednaka `baseGrams`.

### Skaliranje shopping sastojka

`quantity` je fallback za čitanje datoteke, a `scaled` daje aplikaciji brojčanu vrijednost:

```yaml
- name: Mljevena junetina
  quantity: 500 g
  scaled:
    value: 500
    unit: g
```

Dostupna zaokruživanja:

- `smart` — do dvije decimale;
- `whole` — cijeli komadi;
- `half` — koraci od pola;
- `tenth` — jedna decimala.

Primjer cijelih komada:

```yaml
- name: Luk
  quantity: "4"
  scaled:
    value: 4
    unit: kom
    rounding: whole
```

### Skaliranje u uputama

U MDX datoteku uvesti komponentu:

```mdx
import Amount from "../../components/Amount.astro";
```

Označiti samo količine koje se smiju mijenjati:

```mdx
Dodati <Amount value={500} unit="g" /> mljevene junetine.
```

Temperaturu, vrijeme i veličinu posude ostaviti kao običan tekst:

```md
Peći 30 minuta na 180 °C.
```

Nikada ne koristiti skalabilnu komponentu za temperaturu ili vrijeme. Vrijednosti poput „po ukusu” i „po potrebi” također ostaju fiksan tekst.

Ako recept koristi više vrsta mesa, `baseGrams` predstavlja njihovu ukupnu količinu. Omjeri pojedinih vrsta mesa moraju ostati isti.

Kada je skaliranje uključeno, označiti svaku brojčanu količinu koja ovisi o veličini recepta — i u shopping popisu i u uputama. Fiksni smiju ostati samo temperatura, trajanje, veličina posude te količine poput „po ukusu” i „po potrebi”. Shopping količina mora predstavljati ukupno potrebno za sve dijelove recepta, primjerice glavno jelo i umak zajedno.

## Završna provjera

Prije predaje provjeriti:

- pojavljuje li se recept na ispravnoj stranici;
- vodi li kartica na ispravan slug;
- sadrži li shopping popis sve potrebne namirnice;
- može li se kuhati samo čitajući upute;
- radi li kopiranje shopping liste;
- ako postoji scaling, mijenjaju li se sidebar, upute i broj osoba;
- koristi li broj osoba ili komada ispravan gramatički oblik nakon skaliranja;
- ostaju li temperature i trajanja nepromijenjeni;
- prolaze li `npm run check` i `npm run build`.

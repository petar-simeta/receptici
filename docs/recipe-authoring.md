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
- aktivno vrijeme pripreme (`prepTime`), vrijeme kuhanja ili pečenja (`cookTime`) i ukupno vrijeme (`totalTime`);
- vrijeme odmaranja (`restTime`) ili hlađenja (`chillTime`) kada utječe na to kada je recept stvarno spreman;
- cijenu i kalorije po osobi, kriški, keksu ili drugoj prikazanoj jedinici;
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
- Fotografije spremati kao WebP, najviše 960 px široke. Kartice se prikazuju do približno 560 px širine samo na rubnom mobilnom breakpointu, a u uobičajenim prikazima 360–430 px, pa 960 px ostavlja dobru rezervu i za ekrane visoke gustoće.
- Ne čuvati PNG/JPEG izvornike ili neiskorištene varijante u `public/` ni u repozitoriju.
- Alternativni tekst mora kratko opisati ono što je stvarno prikazano na fotografiji.

## Shopping sastojci i upute nisu ista stvar

Ovo je najvažnije domensko pravilo projekta.

### Shopping sastojci u frontmatteru

Služe za:

- brzu provjeru imamo li sve kod kuće;
- izradu popisa za kupnju;
- pretragu recepata po sastojku.

Moraju biti jedan ravan popis. Ne dijeliti ih na grupe za tijesto, umak ili prilog. Količina može biti približna ili izostavljena za osnovne začine i namirnice koje samo treba imati kod kuće.

Količine zapisivati onako kako se namirnica stvarno kupuje i koristi u kuhinji:

- luk, mrkvu, krumpir, paprike, tikvice i slično navoditi u komadima uz korisnu veličinu, primjerice `2 velika luka`, `3 srednje mrkve` ili `5 srednjih krumpira`;
- konzervirane namirnice navoditi ukupnom masom potrebnom za recept, primjerice `800 g sjeckane rajčice`, jer veličina pakiranja nije uvijek jednaka; kod graha i sličnih namirnica jasno napisati odnosi li se masa na sadržaj prije ili nakon cijeđenja;
- grame zadržati za meso, brašno, šećer, maslac, čokoladu, rižu, tjesteninu i druge namirnice kod kojih je masa precizna ili uobičajena mjera;
- ne pretvarati precizne slastičarske količine u šalice ili proizvoljne komade.

Ako se povrće skalira, procijeniti praktičan broj komada za svaku ponuđenu količinu. Rezultat mora biti realan i ne smije od korisnika tražiti vaganje cijelog povrća.

### Sastojci i količine u uputama

Upute moraju biti potpuno samostalne. Korisnik na mobitelu treba moći kuhati bez vraćanja na shopping sidebar. Zato u koracima ponovno navesti sastojke i precizne količine u trenutku kada se koriste.

Ponavljanje između sidebara i uputa je namjerno i ne smije se automatski uklanjati.

## Veliki recepti i spremanje ostataka

Kada se umak, gulaš ili drugo glavno jelo namjerno priprema u većoj količini za više obroka, upute moraju jasno odvojiti količinu koja se jede odmah od ostatka:

- navesti koliko svježeg priloga treba pripremiti za dvije osobe; za suhu tjesteninu u pravilu koristiti oko `160 g` ukupno, osim ako recept opravdava drukčiju količinu;
- ne upućivati korisnika da unaprijed skuha sav prilog; tjesteninu i slične priloge pripremiti svježe samo za trenutačni obrok;
- umak ili glavno jelo koje se sprema odvojiti prije miješanja sa svježim prilogom;
- najkasnije unutar 2 sata rasporediti ostatke u manje, plitke posude i spremiti ih u hladnjak na temperaturu nižu od 5 °C;
- zbog strože hrvatske preporuke u receptu navesti najviše 2 dana čuvanja u hladnjaku;
- kada je jelo prikladno za zamrzavanje, zamrznuti ga u pojedinačnim porcijama bez svježeg priloga; za kuhane mesne umake, gulaše i slična jela u pravilu navesti 2–3 mjeseca;
- zamrznutu porciju odmrznuti u hladnjaku i podgrijati samo potrebnu količinu, samo jednom, dok cijelo jelo ne bude vruće i dok se iz njega ne počne dizati para.

Ove preporuke temelje se na [uputama HZJZ-a za pripremu i čuvanje hrane](https://www.hzjz.hr/sluzba-zdravstvena-ekologija/pravilan-pristup-pripremi-hrane/), [preporukama HAPIH-a za temperaturu hladnjaka i podgrijavanje](https://www.hapih.hr/sigurnost-hrane-tijekom-ljeta/) te [USDA smjernicama za zamrzavanje gotovih jela](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/freezing-and-food-safety).

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

## Vremena

Vremena se ne smiju svesti na jednu nejasnu vrijednost. Svaki recept mora imati `prepTime`, `cookTime` i `totalTime`, a prema potrebi i `restTime` ili `chillTime`. Kartice i filtri koriste `totalTime`, dok stranica recepta prikazuje cijelu razradu.

Jedna vrijednost zapisuje se u minutama:

```yaml
prepTime: 20
cookTime: 45
restTime: 15
totalTime: 80
```

Kada vrijeme stvarno ovisi o veličini komada, broju tura ili broju limova, koristiti raspon:

```yaml
prepTime:
  min: 60
  max: 90
totalTime:
  min: 300
  max: 420
```

`prepTime` predstavlja aktivan rad. `totalTime` predstavlja stvarno proteklo vrijeme do posluživanja i ne mora biti zbroj ostalih polja kada se radnje odvijaju paralelno.

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
  quantity: 4 velika
  scaled:
    value: 4
    unit: velikih
    oneUnit: veliki
    fewUnit: velika
    rounding: whole
```

`oneUnit` i `fewUnit` koristiti kada se jedinica mora gramatički mijenjati. Gornji primjer prikazuje `1 veliki`, `2 velika` i `5 velikih`, dok naziv sastojka daje puni kontekst „Luk”. Ista polja dostupna su komponenti `Amount` u uputama kada treba ispisati cijeli pravilno sklonjeni naziv namirnice.

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

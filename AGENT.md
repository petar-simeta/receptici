# Receptici

## Project Context

- This is a private recipe app used only by the owner and his wife.
- The main purpose is a personal recipe archive with quick access and shopping help.
- The app is hosted on Vercel at `receptici.vercel.app`.
- Recipes are entered manually in most cases.
- Losing recipes would be painful, so data safety matters, but this is not a high-security app.

## Product Priorities

- Prioritize UX improvements over visual redesign.
- Preserve and improve the mobile experience.
- Prefer changes that improve perceived and real performance.
- Keep the app simple; avoid unnecessary features and complexity.
- Treat occasional slow page loads as a real product concern worth investigating.

## Domain Rules

- Recipe fields like subtitle, duration, price, rating, and calories can stay optional.
- Slugs may change when the recipe title changes.
- Tags should stay flexible and user-created, but duplicates that differ only by casing should be avoided.
- Current tag UX is good: pick existing tags or add a new one inline.
- The current shopping list feature is sufficient and does not need expansion unless a clear issue appears.

## Usage Profile

- The app currently has 5 recipes and is expected to stay under 50 total, realistically around 15-20.
- The main usage flow is: find a recipe, check ingredients, and follow the cooking instructions.
- The user does not care about recipe import or print features.

## Operational Notes

- There is no backup flow set up for the database yet.
- Data loss would be annoying, so backup improvements are valuable, but this is not a high-security system.

## Language And Writing

- The app UI can mix Croatian and some natural-sounding English labels when that feels better.
- Code, comments, identifiers, and class names should be in English.

## Working Notes

- Do not add unnecessary process or documentation.
- Keep changes pragmatic and aligned with the real use case of a two-person household app.

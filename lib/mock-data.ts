export interface Recipe {
  id: string
  title: string
  subtitle: string
  tags: string[]
  duration: number // in minutes
  pricePerPortion: number // in euros
  rating: number // 0-5
  ingredients: Ingredient[]
  content: string // Markdown
}

export interface Ingredient {
  label: string
  quantity: string
}

export const MOCK_RECIPES: Recipe[] = [
  {
    id: "1",
    title: "Classic Spaghetti Carbonara",
    subtitle: "Creamy Italian pasta with bacon and eggs",
    tags: ["Italian", "Pasta", "Quick"],
    duration: 25,
    pricePerPortion: 3.5,
    rating: 5,
    ingredients: [
      { label: "Spaghetti", quantity: "400g" },
      { label: "Bacon", quantity: "200g" },
      { label: "Eggs", quantity: "4" },
      { label: "Parmesan cheese", quantity: "100g" },
      { label: "Black pepper", quantity: "to taste" },
    ],
    content: `## Preparation

Bring a large pot of salted water to boil for the pasta.

## Cooking the bacon

Cut the bacon into small strips and fry in a large pan over medium heat until crispy. Remove from heat but keep warm.

## Making the sauce

In a bowl, whisk together the eggs and grated Parmesan cheese. Add plenty of black pepper.

## Combining everything

Cook the spaghetti according to package instructions until al dente. Reserve 1 cup of pasta water, then drain.

Add the hot pasta to the pan with the bacon. Remove from heat and quickly stir in the egg mixture, adding pasta water as needed to create a creamy sauce.

### Serving

Serve immediately with extra Parmesan and black pepper on top.`,
  },
  {
    id: "2",
    title: "Thai Green Curry",
    subtitle: "Aromatic and spicy coconut curry",
    tags: ["Thai", "Curry", "Spicy", "Vegetarian"],
    duration: 35,
    pricePerPortion: 4.2,
    rating: 4,
    ingredients: [
      { label: "Green curry paste", quantity: "3 tbsp" },
      { label: "Coconut milk", quantity: "400ml" },
      { label: "Bell peppers", quantity: "2" },
      { label: "Bamboo shoots", quantity: "200g" },
      { label: "Thai basil", quantity: "1 bunch" },
      { label: "Lime", quantity: "1" },
      { label: "Jasmine rice", quantity: "200g" },
    ],
    content: `## Preparing the rice

Start cooking the jasmine rice according to package instructions.

## Making the curry

Heat a large pan or wok over medium-high heat. Add the green curry paste and fry for 1-2 minutes until fragrant.

Pour in the coconut milk and bring to a simmer. Add the sliced bell peppers and bamboo shoots.

## Simmering

Simmer for 15-20 minutes until vegetables are tender. Add Thai basil and lime juice just before serving.

### Tips

Adjust the spice level by adding more or less curry paste. Serve over fluffy jasmine rice.`,
  },
  {
    id: "3",
    title: "Mushroom Risotto",
    subtitle: "Creamy Italian rice dish with wild mushrooms",
    tags: ["Italian", "Rice", "Vegetarian", "Comfort Food"],
    duration: 45,
    pricePerPortion: 5.0,
    rating: 5,
    ingredients: [
      { label: "Arborio rice", quantity: "300g" },
      { label: "Mixed mushrooms", quantity: "400g" },
      { label: "Vegetable stock", quantity: "1.5L" },
      { label: "White wine", quantity: "150ml" },
      { label: "Parmesan cheese", quantity: "100g" },
      { label: "Butter", quantity: "50g" },
      { label: "Onion", quantity: "1" },
      { label: "Garlic", quantity: "2 cloves" },
    ],
    content: `## Preparation

Heat the vegetable stock in a pot and keep it warm on low heat.

Slice the mushrooms and finely chop the onion and garlic.

## Cooking the mushrooms

In a large pan, melt half the butter and sauté the mushrooms until golden. Set aside.

## Making the risotto

In the same pan, add a bit more butter and cook the onion and garlic until soft.

Add the rice and stir for 1-2 minutes until lightly toasted.

### Building the risotto

Pour in the white wine and stir until absorbed.

Add the stock one ladle at a time, stirring frequently and waiting for each addition to be absorbed before adding more.

## Finishing touches

After about 20-25 minutes, when the rice is creamy and al dente, stir in the mushrooms, remaining butter, and Parmesan.

Season with salt and pepper, and serve immediately with extra Parmesan.`,
  },
  {
    id: "4",
    title: "Quick Chicken Stir-Fry",
    subtitle: "Healthy and fast weeknight dinner",
    tags: ["Asian", "Quick", "Healthy", "Chicken"],
    duration: 20,
    pricePerPortion: 4.5,
    rating: 4,
    ingredients: [
      { label: "Chicken breast", quantity: "500g" },
      { label: "Broccoli", quantity: "300g" },
      { label: "Bell pepper", quantity: "1" },
      { label: "Soy sauce", quantity: "3 tbsp" },
      { label: "Garlic", quantity: "3 cloves" },
      { label: "Ginger", quantity: "1 inch" },
      { label: "Rice", quantity: "200g" },
    ],
    content: `## Preparation

Start cooking the rice. Cut chicken into bite-sized pieces and vegetables into chunks.

## Stir-frying

Heat a wok or large pan over high heat with oil.

Add chicken and cook until golden and cooked through, about 5-6 minutes.

### Adding vegetables

Add minced garlic and ginger, stir for 30 seconds.

Add all vegetables and stir-fry for 3-4 minutes until tender-crisp.

## Sauce

Pour in soy sauce and toss everything together. Serve hot over rice.`,
  },
  {
    id: "5",
    title: "Homemade Margherita Pizza",
    subtitle: "Classic Italian pizza with fresh mozzarella",
    tags: ["Italian", "Pizza", "Comfort Food"],
    duration: 90,
    pricePerPortion: 3.0,
    rating: 5,
    ingredients: [
      { label: "Pizza dough", quantity: "500g" },
      { label: "Tomato sauce", quantity: "200ml" },
      { label: "Fresh mozzarella", quantity: "250g" },
      { label: "Fresh basil", quantity: "1 bunch" },
      { label: "Olive oil", quantity: "2 tbsp" },
    ],
    content: `## Preparing the dough

If using store-bought dough, let it come to room temperature. Roll out on a floured surface.

Preheat your oven to the highest setting (usually 250°C/480°F).

## Assembly

Spread tomato sauce evenly over the dough, leaving a border for the crust.

Tear the mozzarella and distribute evenly over the sauce.

### Baking

Bake for 10-12 minutes until the crust is golden and cheese is bubbly.

## Finishing

Remove from oven and immediately top with fresh basil leaves and a drizzle of olive oil.`,
  },
  {
    id: "6",
    title: "Greek Salad",
    subtitle: "Fresh Mediterranean salad",
    tags: ["Greek", "Salad", "Healthy", "Vegetarian", "Quick"],
    duration: 15,
    pricePerPortion: 3.8,
    rating: 4,
    ingredients: [
      { label: "Tomatoes", quantity: "4" },
      { label: "Cucumber", quantity: "1" },
      { label: "Red onion", quantity: "1" },
      { label: "Feta cheese", quantity: "200g" },
      { label: "Kalamata olives", quantity: "100g" },
      { label: "Olive oil", quantity: "4 tbsp" },
      { label: "Oregano", quantity: "1 tsp" },
    ],
    content: `## Preparation

Chop tomatoes and cucumber into chunks. Slice the red onion thinly.

## Assembly

Combine all vegetables in a large bowl. Add olives and crumble feta on top.

### Dressing

Drizzle with olive oil, sprinkle with oregano, and season with salt and pepper.

Toss gently and serve immediately.`,
  },
]

export const ALL_TAGS = [
  "Italian",
  "Thai",
  "Greek",
  "Asian",
  "Pasta",
  "Rice",
  "Pizza",
  "Salad",
  "Curry",
  "Quick",
  "Healthy",
  "Vegetarian",
  "Spicy",
  "Comfort Food",
  "Chicken",
]

import "dotenv/config";
import connectDB from "@/lib/db";
import MenuItem from "@/models/MenuItem";

const items = [
  // coffee
  {
    name: "Ember Oat Latte",
    slug: "ember-oat-latte",
    description: "Double shot, steamed oat milk, a little cinnamon at the end.",
    price: 450,
    compareAtPrice: 550,
    category: "coffee",
    servedAs: ["hot", "iced"],
    dietaryTags: ["dairy-free"],
    ingredients: ["Espresso", "Oat milk", "Cinnamon", "Cane sugar"],
    allergens: [],
    calories: 190,
    imageUrl: "/images/menu/ember-oat-latte.jpg",
  },
  {
    name: "Classic Espresso",
    slug: "classic-espresso",
    description: "Single-origin, pulled short and strong.",
    price: 250,
    category: "coffee",
    servedAs: ["hot"],
    dietaryTags: ["vegan", "dairy-free"],
    ingredients: ["Single-origin espresso beans"],
    allergens: [],
    calories: 5,
    imageUrl: "/images/menu/classic-espresso.jpg",
  },
  {
    name: "Vanilla Cold Brew",
    slug: "vanilla-cold-brew",
    description: "Steeped 18 hours, house vanilla syrup, poured over ice.",
    price: 400,
    category: "coffee",
    servedAs: ["iced"],
    dietaryTags: ["vegan", "dairy-free"],
    ingredients: ["Cold brew concentrate", "House vanilla syrup", "Ice"],
    allergens: [],
    calories: 110,
    imageUrl: "/images/menu/vanilla-cold-brew.jpg",
  },
  {
    name: "Flat White",
    slug: "flat-white",
    description: "Ristretto shots, microfoam, no room for anything else.",
    price: 420,
    category: "coffee",
    servedAs: ["hot"],
    dietaryTags: [],
    ingredients: ["Ristretto espresso", "Steamed whole milk"],
    allergens: ["dairy"],
    calories: 150,
    imageUrl: "/images/menu/flat-white.jpg",
  },
  {
    name: "Mocha",
    slug: "mocha",
    description: "Dark chocolate, espresso, steamed milk, no whipped cream unless you ask.",
    price: 480,
    category: "coffee",
    servedAs: ["hot", "iced"],
    dietaryTags: [],
    ingredients: ["Espresso", "Dark chocolate", "Steamed milk"],
    allergens: ["dairy"],
    calories: 260,
    imageUrl: "/images/menu/mocha.jpg",
  },

  // pastry
  {
    name: "Butter Croissant",
    slug: "butter-croissant",
    description: "Laminated in-house, baked twice daily.",
    price: 280,
    category: "pastry",
    dietaryTags: [],
    ingredients: ["Flour", "Butter", "Yeast", "Milk", "Salt"],
    allergens: ["gluten", "dairy"],
    calories: 320,
    imageUrl: "/images/menu/butter-croissant.jpg",
  },
  {
    name: "Almond Croissant",
    slug: "almond-croissant",
    description: "Day-old croissant, reborn with almond cream and toasted flakes.",
    price: 350,
    category: "pastry",
    dietaryTags: [],
    ingredients: ["Butter croissant", "Almond cream", "Sliced almonds", "Powdered sugar"],
    allergens: ["nuts", "dairy", "gluten"],
    calories: 410,
    imageUrl: "/images/menu/almond-croissant.jpg",
  },
  {
    name: "Pain au Chocolat",
    slug: "pain-au-chocolat",
    description: "Two batons of dark chocolate, same dough as the croissant.",
    price: 300,
    category: "pastry",
    dietaryTags: [],
    ingredients: ["Flour", "Butter", "Dark chocolate batons", "Yeast"],
    allergens: ["gluten", "dairy"],
    calories: 350,
    imageUrl: "/images/menu/pain-au-chocolat.jpg",
  },
  {
    name: "Gluten-Free Banana Muffin",
    slug: "gf-banana-muffin",
    description: "Overripe bananas, no gluten, still comes apart in your hands.",
    price: 320,
    category: "pastry",
    dietaryTags: ["gluten-free"],
    ingredients: ["Ripe bananas", "Gluten-free flour blend", "Eggs", "Brown sugar"],
    allergens: ["eggs"],
    calories: 280,
    imageUrl: "/images/menu/gf-banana-muffin.jpg",
  },

  // cake
  {
    name: "Carrot Cake Slice",
    slug: "carrot-cake-slice",
    description: "Walnuts, cream cheese frosting, cinnamon doing most of the work.",
    price: 380,
    category: "cake",
    dietaryTags: [],
    ingredients: ["Carrots", "Walnuts", "Flour", "Cream cheese frosting", "Cinnamon"],
    allergens: ["nuts", "gluten", "dairy", "eggs"],
    calories: 430,
    imageUrl: "/images/menu/carrot-cake-slice.jpg",
  },
  {
    name: "Vegan Chocolate Cake",
    slug: "vegan-chocolate-cake",
    description: "Rich, dense, no eggs or dairy and no one asks either.",
    price: 400,
    category: "cake",
    dietaryTags: ["vegan", "dairy-free"],
    ingredients: ["Flour", "Cocoa", "Plant milk", "Coconut oil", "Cane sugar"],
    allergens: ["gluten", "soy"],
    calories: 390,
    imageUrl: "/images/menu/vegan-chocolate-cake.jpg",
  },
  {
    name: "Lemon Drizzle Cake",
    slug: "lemon-drizzle-cake",
    description: "Sharp lemon syrup soaked into the crumb while it's still warm.",
    price: 360,
    compareAtPrice: 420,
    category: "cake",
    dietaryTags: [],
    ingredients: ["Flour", "Butter", "Eggs", "Lemon", "Sugar"],
    allergens: ["gluten", "dairy", "eggs"],
    calories: 370,
    imageUrl: "/images/menu/lemon-drizzle-cake.jpg",
  },
];

async function seed() {
  await connectDB();

  await MenuItem.deleteMany({});
  console.log("Cleared existing menu items.");

  await MenuItem.insertMany(items);
  console.log(`Seeded ${items.length} menu items.`);

  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
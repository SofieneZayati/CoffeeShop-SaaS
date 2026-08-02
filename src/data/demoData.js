export const ordersSeed = [
  {
    id: "GC-1048",
    table: "T08",
    guest: "Table 08",
    source: "Table QR",
    time: "2 min",
    total: 22,
    status: "new",
    payment: "Paid online",
    items: ["2× Iced coffee", "1× Tiramisu"],
    note: "Light ice in one coffee",
  },
  {
    id: "GC-1047",
    table: "T03",
    guest: "Amel B.",
    source: "Waiter",
    time: "6 min",
    total: 6.5,
    status: "making",
    payment: "Pay at cashier",
    items: ["1× Capucin", "1× Cookie"],
    note: "No sugar",
  },
  {
    id: "GC-1046",
    table: "T11",
    guest: "Table 11",
    source: "Table QR",
    time: "9 min",
    total: 20.5,
    status: "making",
    payment: "Paid • Flouci",
    items: ["2× Strawberry juice", "1× Cheesecake", "1× Espresso"],
    note: "No added sugar in one juice",
  },
  {
    id: "GC-1045",
    table: "T07",
    guest: "Table 07",
    source: "Table QR",
    time: "12 min",
    total: 14,
    status: "ready",
    payment: "Paid • Konnect",
    items: ["2× Capucin", "1× Chocolate fondant"],
    note: "",
  },
  {
    id: "GC-1044",
    table: "T05",
    guest: "Table 05",
    source: "Waiter",
    time: "14 min",
    total: 6,
    status: "ready",
    payment: "Pay at cashier",
    items: ["1× Direct coffee", "1× Croissant"],
    note: "",
  },
];

const menuEntry = (id, details) => ({
  id,
  sales: Math.max(18, 96 - id),
  stock: details.category === "Kids Park" ? 18 : 36,
  active: true,
  featured: false,
  emoji: "☕",
  tone: ["sage", "sand", "clay", "rose", "amber", "berry"][id % 6],
  description: `${details.name}, prepared from the real Green Coffee Games menu.`,
  descriptionFr: `${details.nameFr}, préparé selon la carte réelle Green Coffee Games.`,
  ingredients: "Prepared to order; ask the café team about ingredients and allergies.",
  ingredientsFr: "Préparé à la commande ; demandez à l’équipe les ingrédients et allergènes.",
  tags: ["Real menu"],
  tagsFr: ["Carte réelle"],
  ...details,
});

export const menuItemsSeed = [
  menuEntry(1, { name: "Espresso", nameFr: "Expresso", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 2.5, featured: true, emoji: "☕", ingredients: "Ground coffee and water", ingredientsFr: "Café moulu et eau", tags: ["Short coffee", "Vegan"], tagsFr: ["Café court", "Végan"] }),
  menuEntry(2, { name: "Direct coffee", nameFr: "Direct", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 3.5, emoji: "☕", image: "/menu/v60-ethiopia.webp", alt: "Freshly brewed direct coffee", description: "A smooth, freshly brewed direct coffee", descriptionFr: "Un café direct doux, fraîchement préparé", ingredients: "Ground coffee and water", ingredientsFr: "Café moulu et eau", tags: ["Freshly brewed"], tagsFr: ["Fraîchement préparé"] }),
  menuEntry(3, { name: "Capucin", nameFr: "Capucin", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 3, emoji: "☕", ingredients: "Coffee and steamed milk", ingredientsFr: "Café et lait chaud", tags: ["Milk"], tagsFr: ["Lait"] }),
  menuEntry(4, { name: "Turkish coffee", nameFr: "Café turc", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 5, emoji: "🫖", ingredients: "Finely ground coffee and water", ingredientsFr: "Café finement moulu et eau", tags: ["Traditional"], tagsFr: ["Traditionnel"] }),
  menuEntry(5, { name: "Nescafé", nameFr: "Nescafé", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 3, emoji: "☕", ingredients: "Instant coffee and water", ingredientsFr: "Café soluble et eau" }),
  menuEntry(6, { name: "Americano", nameFr: "Américano", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 2.6, emoji: "☕", ingredients: "Espresso and hot water", ingredientsFr: "Expresso et eau chaude", tags: ["Long coffee", "Vegan"], tagsFr: ["Café long", "Végan"] }),
  menuEntry(7, { name: "Capsule coffee", nameFr: "Capsule", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 4, emoji: "☕", ingredients: "Coffee capsule and water", ingredientsFr: "Capsule de café et eau" }),
  menuEntry(8, { name: "Hot chocolate", nameFr: "Chocolat chaud", category: "Coffee", categoryFr: "Cafés", customerCategory: "Coffee", customerCategoryFr: "Cafés", price: 6, emoji: "🍫", description: "Rich hot chocolate with warm milk", descriptionFr: "Chocolat chaud onctueux au lait", ingredients: "Milk and cocoa", ingredientsFr: "Lait et cacao", tags: ["Milk"], tagsFr: ["Lait"] }),

  menuEntry(9, { name: "Mint tea", nameFr: "Thé à la menthe", category: "Tea & infusions", categoryFr: "Thé et infusion", customerCategory: "Tea & infusions", customerCategoryFr: "Thé et infusion", price: 2.5, emoji: "🍵", ingredients: "Green tea, mint and water", ingredientsFr: "Thé vert, menthe et eau", tags: ["Fresh mint"], tagsFr: ["Menthe fraîche"] }),
  menuEntry(10, { name: "Almond tea", nameFr: "Thé amande", category: "Tea & infusions", categoryFr: "Thé et infusion", customerCategory: "Tea & infusions", customerCategoryFr: "Thé et infusion", price: 6, emoji: "🍵", ingredients: "Tea, almonds and water", ingredientsFr: "Thé, amandes et eau", tags: ["Contains nuts"], tagsFr: ["Contient des fruits à coque"] }),
  menuEntry(11, { name: "Herbal infusion", nameFr: "Thé infusion", category: "Tea & infusions", categoryFr: "Thé et infusion", customerCategory: "Tea & infusions", customerCategoryFr: "Thé et infusion", price: 3.5, emoji: "🌿", ingredients: "Herbal infusion and water", ingredientsFr: "Infusion de plantes et eau", tags: ["Caffeine free"], tagsFr: ["Sans caféine"] }),

  menuEntry(12, { name: "Iced coffee", nameFr: "Café glacé", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 6, featured: true, emoji: "🧊", image: "/menu/iced-caramel-latte.webp", alt: "Iced coffee served over clear ice", description: "Chilled coffee served over ice", descriptionFr: "Café frais servi sur glace", ingredients: "Coffee, milk and ice", ingredientsFr: "Café, lait et glaçons", tags: ["Cold", "Milk"], tagsFr: ["Froid", "Lait"] }),
  menuEntry(13, { name: "Frappuccino — your choice", nameFr: "Frappuccino au choix", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 8, featured: true, emoji: "🥤", image: "/menu/pistachio-cloud.webp", alt: "Creamy iced frappuccino", description: "Blended iced coffee in your choice of flavor", descriptionFr: "Café glacé mixé, parfum au choix", ingredients: "Coffee, milk, ice and selected flavor", ingredientsFr: "Café, lait, glaçons et parfum choisi", tags: ["Choose a flavor", "Milk"], tagsFr: ["Parfum au choix", "Lait"] }),
  menuEntry(14, { name: "Milkshake — your choice", nameFr: "Milkshake au choix", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 7, emoji: "🥤", ingredients: "Milk, ice cream and selected flavor", ingredientsFr: "Lait, glace et parfum choisi", tags: ["Choose a flavor", "Milk"], tagsFr: ["Parfum au choix", "Lait"] }),
  menuEntry(15, { name: "Smoothie — your choice", nameFr: "Smoothie au choix", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 10, emoji: "🥭", ingredients: "Selected fruit and ice", ingredientsFr: "Fruits au choix et glaçons", tags: ["Choose a fruit", "Fresh"], tagsFr: ["Fruit au choix", "Frais"] }),
  menuEntry(16, { name: "Fresh orange juice", nameFr: "Jus d’orange frais", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 5, emoji: "🍊", ingredients: "Fresh orange juice", ingredientsFr: "Jus d’orange frais", tags: ["Fresh", "No added sugar"], tagsFr: ["Frais", "Sans sucre ajouté"] }),
  menuEntry(17, { name: "Lemonade", nameFr: "Citronnade", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 5, emoji: "🍋", ingredients: "Fresh lemon, water and sugar", ingredientsFr: "Citron frais, eau et sucre", tags: ["House-made"], tagsFr: ["Maison"] }),
  menuEntry(18, { name: "Strawberry juice", nameFr: "Jus de fraise", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 6, emoji: "🍓", ingredients: "Strawberries and water", ingredientsFr: "Fraises et eau", tags: ["Fresh fruit"], tagsFr: ["Fruits frais"] }),
  menuEntry(19, { name: "Kiwi juice", nameFr: "Jus de kiwi", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 6, emoji: "🥝", ingredients: "Kiwi and water", ingredientsFr: "Kiwi et eau", tags: ["Fresh fruit"], tagsFr: ["Fruits frais"] }),
  menuEntry(20, { name: "Green Coffee Games juice", nameFr: "Jus Green Coffee Games", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 10, featured: true, emoji: "🥤", description: "The café’s signature fresh juice blend", descriptionFr: "Le mélange de jus frais signature du café", ingredients: "House fruit blend", ingredientsFr: "Mélange de fruits maison", tags: ["House signature"], tagsFr: ["Signature maison"] }),
  menuEntry(21, { name: "Mojito — your choice", nameFr: "Mojito au choix", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 8.5, emoji: "🍹", description: "Alcohol-free mojito in your choice of flavor", descriptionFr: "Mojito sans alcool, parfum au choix", ingredients: "Lime, mint, sparkling water and selected flavor", ingredientsFr: "Citron vert, menthe, eau gazeuse et parfum choisi", tags: ["Alcohol free", "Choose a flavor"], tagsFr: ["Sans alcool", "Parfum au choix"] }),
  menuEntry(22, { name: "Energy mojito", nameFr: "Mojito énergétique", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 12, emoji: "⚡", ingredients: "Lime, mint, energy drink and ice", ingredientsFr: "Citron vert, menthe, boisson énergétique et glaçons", tags: ["Caffeinated", "Alcohol free"], tagsFr: ["Caféiné", "Sans alcool"] }),
  menuEntry(23, { name: "Mineral water 1 L", nameFr: "Eau minérale 1 L", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 3, emoji: "💧", ingredients: "Mineral water", ingredientsFr: "Eau minérale", tags: ["1 litre"], tagsFr: ["1 litre"] }),
  menuEntry(24, { name: "Mineral water 0.5 L", nameFr: "Eau minérale 0,5 L", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 1.5, emoji: "💧", ingredients: "Mineral water", ingredientsFr: "Eau minérale", tags: ["500 ml"], tagsFr: ["500 ml"] }),
  menuEntry(25, { name: "Soda", nameFr: "Soda", category: "Cold drinks", categoryFr: "Boissons froides", customerCategory: "Cold drinks", customerCategoryFr: "Boissons froides", price: 3.5, emoji: "🥤", ingredients: "Bottled soda", ingredientsFr: "Soda en bouteille", tags: ["Served cold"], tagsFr: ["Servi frais"] }),

  menuEntry(26, { name: "Croissant", nameFr: "Croissant", category: "Pastries", categoryFr: "Viennoiserie", customerCategory: "Pastries", customerCategoryFr: "Viennoiserie", price: 2.5, featured: true, emoji: "🥐", image: "/menu/butter-croissant.webp", alt: "Golden flaky croissant", description: "Flaky croissant baked for the café", descriptionFr: "Croissant feuilleté préparé pour le café", ingredients: "Wheat flour, butter, milk, egg and yeast", ingredientsFr: "Farine de blé, beurre, lait, œuf et levure", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(27, { name: "Pain au chocolat", nameFr: "Pain au chocolat", category: "Pastries", categoryFr: "Viennoiserie", customerCategory: "Pastries", customerCategoryFr: "Viennoiserie", price: 3, emoji: "🥐", ingredients: "Wheat flour, butter, chocolate, milk and egg", ingredientsFr: "Farine de blé, beurre, chocolat, lait et œuf", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),

  menuEntry(28, { name: "Cheesecake", nameFr: "Cheesecake", category: "Desserts", categoryFr: "Pâtisserie", customerCategory: "Desserts", customerCategoryFr: "Pâtisserie", price: 6, emoji: "🍰", ingredients: "Cream cheese, biscuit, butter and egg", ingredientsFr: "Fromage frais, biscuit, beurre et œuf", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(29, { name: "Chocolate fondant", nameFr: "Fondant chocolat", category: "Desserts", categoryFr: "Pâtisserie", customerCategory: "Desserts", customerCategoryFr: "Pâtisserie", price: 8, emoji: "🍫", ingredients: "Chocolate, flour, butter and egg", ingredientsFr: "Chocolat, farine, beurre et œuf", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(30, { name: "Tiramisu", nameFr: "Tiramisu", category: "Desserts", categoryFr: "Pâtisserie", customerCategory: "Desserts", customerCategoryFr: "Pâtisserie", price: 10, featured: true, emoji: "🍰", image: "/menu/tiramisu-jar.webp", alt: "Tiramisu with mascarpone layers and cocoa", description: "Mascarpone, cocoa and Green Coffee espresso", descriptionFr: "Mascarpone, cacao et expresso Green Coffee", ingredients: "Mascarpone, sponge, espresso, cocoa and eggs", ingredientsFr: "Mascarpone, biscuit, expresso, cacao et œufs", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(31, { name: "Millefeuille", nameFr: "Millefeuille", category: "Desserts", categoryFr: "Pâtisserie", customerCategory: "Desserts", customerCategoryFr: "Pâtisserie", price: 2.5, emoji: "🍰", ingredients: "Puff pastry, pastry cream, milk and egg", ingredientsFr: "Pâte feuilletée, crème pâtissière, lait et œuf", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(32, { name: "Cookie", nameFr: "Cookies", category: "Desserts", categoryFr: "Pâtisserie", customerCategory: "Desserts", customerCategoryFr: "Pâtisserie", price: 3.5, emoji: "🍪", ingredients: "Wheat flour, butter, egg and chocolate", ingredientsFr: "Farine de blé, beurre, œuf et chocolat", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),

  menuEntry(33, { name: "Nutella crêpe", nameFr: "Crêpe Nutella", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 8, featured: true, emoji: "🍫", ingredients: "Crêpe batter and chocolate-hazelnut spread", ingredientsFr: "Pâte à crêpe et pâte chocolat-noisette", tags: ["Gluten", "Milk", "Egg", "Nuts"], tagsFr: ["Gluten", "Lait", "Œuf", "Fruits à coque"] }),
  menuEntry(34, { name: "Nutella pancake", nameFr: "Pancake Nutella", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 8, emoji: "🥞", ingredients: "Pancake batter and chocolate-hazelnut spread", ingredientsFr: "Pâte à pancake et pâte chocolat-noisette", tags: ["Gluten", "Milk", "Egg", "Nuts"], tagsFr: ["Gluten", "Lait", "Œuf", "Fruits à coque"] }),
  menuEntry(35, { name: "Banana Nutella crêpe", nameFr: "Crêpe banane Nutella", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 10, emoji: "🍌", ingredients: "Crêpe batter, banana and chocolate-hazelnut spread", ingredientsFr: "Pâte à crêpe, banane et pâte chocolat-noisette", tags: ["Gluten", "Milk", "Egg", "Nuts"], tagsFr: ["Gluten", "Lait", "Œuf", "Fruits à coque"] }),
  menuEntry(36, { name: "Chocolate crêpe", nameFr: "Crêpe chocolat", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 6, emoji: "🍫", ingredients: "Crêpe batter and chocolate", ingredientsFr: "Pâte à crêpe et chocolat", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(37, { name: "Sugar waffle", nameFr: "Gaufre sucre", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 4, emoji: "🧇", ingredients: "Waffle batter and sugar", ingredientsFr: "Pâte à gaufre et sucre", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(38, { name: "Honey waffle", nameFr: "Gaufre miel", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 5, emoji: "🧇", ingredients: "Waffle batter and honey", ingredientsFr: "Pâte à gaufre et miel", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(39, { name: "Nutella waffle", nameFr: "Gaufre Nutella", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 8, emoji: "🧇", ingredients: "Waffle batter and chocolate-hazelnut spread", ingredientsFr: "Pâte à gaufre et pâte chocolat-noisette", tags: ["Gluten", "Milk", "Egg", "Nuts"], tagsFr: ["Gluten", "Lait", "Œuf", "Fruits à coque"] }),
  menuEntry(40, { name: "Chocolate-almond waffle", nameFr: "Gaufre chocolat amande", category: "Crepes & waffles", categoryFr: "Crêpes et gaufres", customerCategory: "Crepes & waffles", customerCategoryFr: "Crêpes et gaufres", price: 8, emoji: "🧇", ingredients: "Waffle batter, chocolate and almonds", ingredientsFr: "Pâte à gaufre, chocolat et amandes", tags: ["Gluten", "Milk", "Egg", "Nuts"], tagsFr: ["Gluten", "Lait", "Œuf", "Fruits à coque"] }),

  menuEntry(41, { name: "Tuna & cheese crêpe", nameFr: "Crêpe thon fromage", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 8, emoji: "🐟", ingredients: "Crêpe batter, tuna and cheese", ingredientsFr: "Pâte à crêpe, thon et fromage", tags: ["Gluten", "Milk", "Egg", "Fish"], tagsFr: ["Gluten", "Lait", "Œuf", "Poisson"] }),
  menuEntry(42, { name: "Chicken crêpe", nameFr: "Crêpe poulet", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 10, featured: true, emoji: "🍗", ingredients: "Crêpe batter, chicken and seasoning", ingredientsFr: "Pâte à crêpe, poulet et assaisonnement", tags: ["Gluten", "Milk", "Egg"], tagsFr: ["Gluten", "Lait", "Œuf"] }),
  menuEntry(43, { name: "Mushroom crêpe", nameFr: "Crêpe champignon", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 6, emoji: "🍄", ingredients: "Crêpe batter and mushrooms", ingredientsFr: "Pâte à crêpe et champignons", tags: ["Gluten", "Milk", "Egg", "Vegetarian"], tagsFr: ["Gluten", "Lait", "Œuf", "Végétarien"] }),
  menuEntry(44, { name: "Plain omelette", nameFr: "Omelette nature", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 6, emoji: "🍳", ingredients: "Eggs and seasoning", ingredientsFr: "Œufs et assaisonnement", tags: ["Egg", "Vegetarian"], tagsFr: ["Œuf", "Végétarien"] }),
  menuEntry(45, { name: "Tuna omelette", nameFr: "Omelette thon", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 8, emoji: "🍳", ingredients: "Eggs, tuna and seasoning", ingredientsFr: "Œufs, thon et assaisonnement", tags: ["Egg", "Fish"], tagsFr: ["Œuf", "Poisson"] }),
  menuEntry(46, { name: "Cheese panini with fries", nameFr: "Panini fromage (frites)", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 6, emoji: "🥪", ingredients: "Panini bread, cheese and fries", ingredientsFr: "Pain panini, fromage et frites", tags: ["Gluten", "Milk", "Fries included"], tagsFr: ["Gluten", "Lait", "Frites incluses"] }),
  menuEntry(47, { name: "Chicken panini with fries", nameFr: "Panini poulet (frites)", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 8, featured: true, emoji: "🥪", ingredients: "Panini bread, chicken and fries", ingredientsFr: "Pain panini, poulet et frites", tags: ["Gluten", "Fries included"], tagsFr: ["Gluten", "Frites incluses"] }),
  menuEntry(48, { name: "Tuna panini with fries", nameFr: "Panini thon (frites)", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 6, emoji: "🥪", ingredients: "Panini bread, tuna and fries", ingredientsFr: "Pain panini, thon et frites", tags: ["Gluten", "Fish", "Fries included"], tagsFr: ["Gluten", "Poisson", "Frites incluses"] }),
  menuEntry(49, { name: "Extra: fries or cheese", nameFr: "Supplément : frites ou fromage", category: "Savory snacks", categoryFr: "Snacks salés", customerCategory: "Savory snacks", customerCategoryFr: "Snacks salés", price: 2.5, emoji: "🍟", description: "Add fries or cheese to a savory order", descriptionFr: "Ajoutez des frites ou du fromage à une commande salée", ingredients: "Choice of fries or cheese", ingredientsFr: "Frites ou fromage au choix", tags: ["Choose one"], tagsFr: ["Choisissez une option"] }),

  menuEntry(50, { name: "Speed breakfast", nameFr: "Petit déjeuner Speed", category: "Breakfast", categoryFr: "Petit déjeuner", customerCategory: "Breakfast", customerCategoryFr: "Petit déjeuner", price: 7, featured: true, emoji: "🌅", description: "Coffee + pastry + 0.5 L mineral water + juice", descriptionFr: "Café + viennoiserie + eau minérale 0,5 L + jus", ingredients: "Choice of coffee, pastry, 0.5 L water and juice", ingredientsFr: "Café au choix, viennoiserie, eau 0,5 L et jus", tags: ["Breakfast formula", "Choose your drinks"], tagsFr: ["Formule petit déjeuner", "Boissons au choix"] }),
  menuEntry(51, { name: "Classic breakfast", nameFr: "Petit déjeuner Classique", category: "Breakfast", categoryFr: "Petit déjeuner", customerCategory: "Breakfast", customerCategoryFr: "Petit déjeuner", price: 9, emoji: "🍳", description: "Coffee + pastry + 0.5 L mineral water + juice + omelette", descriptionFr: "Café + viennoiserie + eau minérale 0,5 L + jus + omelette", ingredients: "Speed breakfast formula plus an omelette", ingredientsFr: "Formule Speed avec une omelette", tags: ["Breakfast formula", "Includes omelette"], tagsFr: ["Formule petit déjeuner", "Omelette incluse"] }),
  menuEntry(52, { name: "Green Coffee Games breakfast", nameFr: "Petit déjeuner Green Coffee Games", category: "Breakfast", categoryFr: "Petit déjeuner", customerCategory: "Breakfast", customerCategoryFr: "Petit déjeuner", price: 15, featured: true, emoji: "🌿", description: "Coffee + pastry + water + juice + crêpe + jam + bsissa + charcuterie", descriptionFr: "Café + viennoiserie + eau + jus + crêpe + confiture + bsissa + charcuterie", ingredients: "Coffee, pastry, water, juice, crêpe, jam, bsissa and charcuterie", ingredientsFr: "Café, viennoiserie, eau, jus, crêpe, confiture, bsissa et charcuterie", tags: ["Complete formula", "House breakfast"], tagsFr: ["Formule complète", "Petit déjeuner maison"] }),

  menuEntry(53, { name: "Kids Park access", nameFr: "Accès parc enfants", category: "Kids Park", categoryFr: "Parc enfants", customerCategory: "Kids Park", customerCategoryFr: "Parc enfants", price: 5, featured: true, emoji: "⭐", tone: "berry", description: "Kids Park access for one child during the current café visit", descriptionFr: "Accès au parc pour un enfant pendant la visite au café", ingredients: "Service item — no food included", ingredientsFr: "Service uniquement — aucun aliment inclus", tags: ["5 DT per child", "Current visit"], tagsFr: ["5 DT par enfant", "Visite en cours"] }),
];

export const reservationsSeed = [
  { id: 1, name: "Yasmine Trabelsi", initials: "YT", time: "10:30", date: "Today", guests: 4, table: "T04", status: "confirmed", note: "Birthday brunch", phone: "+216 22 412 880" },
  { id: 2, name: "Mehdi Ben Salem", initials: "MB", time: "13:00", date: "Today", guests: 2, table: "T09", status: "pending", note: "Window seat if possible", phone: "+216 55 103 617" },
  { id: 3, name: "Ines Marzouki", initials: "IM", time: "16:30", date: "Today", guests: 6, table: "—", status: "pending", note: "Kids park access ×2", phone: "+216 29 761 404" },
  { id: 4, name: "Ahmed Jlassi", initials: "AJ", time: "19:45", date: "Today", guests: 4, table: "T08", status: "confirmed", note: "Champions League table", phone: "+216 98 330 152" },
  { id: 5, name: "Sarra Khelifi", initials: "SK", time: "20:15", date: "Tomorrow", guests: 8, table: "Event zone", status: "waitlist", note: "Football night", phone: "+216 52 680 921" },
];

const demoSessionExpiry = (minutes) => new Date(Date.now() + minutes * 60_000).toISOString();

export const tablesSeed = [
  { id: "T01", seats: 4, status: "available", zone: "Customer seating", kind: "standard", x: 25, y: 22, sessionActive: false },
  { id: "T02", seats: 4, status: "occupied", zone: "Customer seating", kind: "standard", x: 47, y: 22, spend: 22, duration: "34m", sessionActive: true, sessionCode: "GREEN-02", sessionExpiresAt: demoSessionExpiry(36) },
  { id: "T03", seats: 4, status: "ordering", zone: "Customer seating", kind: "standard", x: 65, y: 22, spend: 18, duration: "19m", sessionActive: true, sessionCode: "GREEN-03", sessionExpiresAt: demoSessionExpiry(41) },
  { id: "T04", seats: 4, status: "reserved", zone: "Customer seating", kind: "standard", x: 78, y: 22, reservedFor: "10:30" },
  { id: "T05", seats: 4, status: "occupied", zone: "Customer seating", kind: "standard", x: 78, y: 45, spend: 15.5, duration: "27m", sessionActive: true, sessionCode: "GREEN-05", sessionExpiresAt: demoSessionExpiry(33) },
  { id: "T06", seats: 4, status: "available", zone: "Customer seating", kind: "standard", x: 35, y: 84, sessionActive: false },
  { id: "T07", seats: 4, status: "cleaning", zone: "Customer seating", kind: "standard", x: 50, y: 71 },
  { id: "T08", seats: 4, status: "ordering", zone: "Customer seating", kind: "standard", x: 65, y: 71, spend: 32.5, duration: "12m", sessionActive: true, sessionCode: "GREEN-08", sessionExpiresAt: demoSessionExpiry(28) },
  { id: "T09", seats: 6, status: "reserved", zone: "PC lounge", kind: "pc", orientation: "horizontal", x: 22, y: 6, reservedFor: "13:00" },
  { id: "T10", seats: 6, status: "available", zone: "PC lounge", kind: "pc", orientation: "horizontal", x: 37, y: 6, sessionActive: false },
  { id: "T11", seats: 4, status: "occupied", zone: "PC lounge", kind: "pc", orientation: "vertical", x: 14.5, y: 22, spend: 41.5, duration: "42m", sessionActive: true, sessionCode: "GREEN-11", sessionExpiresAt: demoSessionExpiry(44) },
];

export const customers = [
  { name: "Mariem Ben Ali", initials: "MB", tier: "Gold", visits: 38, spent: 824, points: 1280, last: "Today", favorite: "Iced coffee", trend: "+18%", segments: ["VIP & Gold", "Football fans"] },
  { name: "Aziz Gharbi", initials: "AG", tier: "Silver", visits: 24, spent: 517, points: 760, last: "Yesterday", favorite: "Direct coffee", trend: "+9%", segments: ["New guests"] },
  { name: "Rim Kacem", initials: "RK", tier: "VIP", visits: 51, spent: 1236, points: 2420, last: "Jul 8", favorite: "Green Coffee Games juice", trend: "+24%", segments: ["VIP & Gold", "Football fans"] },
  { name: "Wael Mansour", initials: "WM", tier: "Bronze", visits: 9, spent: 188, points: 260, last: "Jul 6", favorite: "Espresso", trend: "+4%", segments: ["New guests", "At risk"] },
  { name: "Lina Ayadi", initials: "LA", tier: "Gold", visits: 32, spent: 705, points: 1105, last: "Jul 5", favorite: "Banana Nutella crêpe", trend: "+14%", segments: ["VIP & Gold", "At risk"] },
];

export const campaigns = [
  { name: "Derby night at Green", type: "WhatsApp", status: "Scheduled", audience: "Football fans", reach: "1,284", conversion: "—", date: "Aug 8 • 18:00" },
  { name: "Your afternoon pick-me-up", type: "Push", status: "Live", audience: "Nearby customers", reach: "846", conversion: "12.8%", date: "Until Aug 14" },
  { name: "We miss you, have 20%", type: "Email", status: "Completed", audience: "Inactive 30d", reach: "392", conversion: "18.4%", date: "Jul 7" },
  { name: "Birthday coffee is on us", type: "Automation", status: "Always on", audience: "Birthdays", reach: "68", conversion: "42.6%", date: "Monthly" },
];

export const feedback = [
  { name: "Anonymous • T04", rating: 5, text: "The iced coffee was perfect and the team was so kind.", time: "12 min ago", tag: "Service" },
  { name: "Mariem B.", rating: 5, text: "Love the QR ordering. Super fast even when the café is full.", time: "1h ago", tag: "Ordering" },
  { name: "Aziz G.", rating: 4, text: "Great direct coffee. The new bilingual menu is very clear.", time: "Yesterday", tag: "Menu" },
];

export const revenueSeries = [42, 48, 44, 58, 54, 68, 63, 71, 69, 82, 78, 89, 84, 96];
export const previousSeries = [36, 39, 42, 41, 50, 49, 56, 57, 61, 65, 66, 69, 72, 75];

export const heatmap = [
  [1, 1, 2, 2, 3, 2, 1],
  [1, 2, 3, 3, 4, 3, 2],
  [2, 3, 4, 4, 4, 4, 3],
  [1, 2, 3, 4, 4, 3, 2],
  [1, 1, 2, 3, 3, 2, 2],
  [2, 2, 3, 4, 4, 4, 3],
  [3, 3, 4, 4, 4, 4, 4],
  [2, 3, 4, 4, 4, 4, 3],
];

export const automationRules = [
  { id: 1, name: "Reservation reminders", detail: "2 hours before every confirmed booking", channel: "WhatsApp + email", runs: "128 this month", active: true, icon: "calendar" },
  { id: 2, name: "Birthday delight", detail: "Send a free-coffee reward at 09:00", channel: "Push + email", runs: "16 this month", active: true, icon: "gift" },
  { id: 3, name: "Win back quiet regulars", detail: "No visit for 30 days → 20% coupon", channel: "WhatsApp", runs: "42 this month", active: true, icon: "heart" },
  { id: 4, name: "Low-stock warning", detail: "Alert when an ingredient falls below par", channel: "Team notification", runs: "7 this month", active: true, icon: "box" },
  { id: 5, name: "Review follow-up", detail: "Thank 4–5★ guests and recover 1–3★ visits", channel: "Email", runs: "96 this month", active: false, icon: "star" },
];

export const events = [
  { title: "Champions League final", date: "SAT • AUG 8", time: "20:00", bookings: 46, capacity: 60, type: "Football night", tone: "green" },
  { title: "Catan community night", date: "WED • AUG 12", time: "18:30", bookings: 18, capacity: 28, type: "Board games", tone: "orange" },
  { title: "Sunday kids workshop", date: "SUN • AUG 16", time: "11:00", bookings: 12, capacity: 18, type: "Kids park", tone: "purple" },
];

export const gamesSeed = [
  { id: "uno", name: "UNO", nameFr: "UNO", type: "Cards", typeFr: "Cartes", players: "2–10", duration: "15–25 min", difficulty: "Easy", difficultyFr: "Facile", symbol: "★ ★", emoji: "🃏", status: "available", className: "uno" },
  { id: "catan", name: "Catan", nameFr: "Catan", type: "Strategy", typeFr: "Stratégie", players: "3–4", duration: "60–90 min", difficulty: "Thinky", difficultyFr: "Réflexion", symbol: "♜", emoji: "🏝️", status: "checked-out", className: "catan" },
  { id: "cards", name: "Playing Cards", nameFr: "Jeu de cartes", type: "Cards", typeFr: "Cartes", players: "2–8", duration: "15–45 min", difficulty: "Classic", difficultyFr: "Classique", symbol: "♠", emoji: "♠️", status: "available", className: "cards" },
  { id: "chess", name: "Chess", nameFr: "Échecs", type: "Classic", typeFr: "Classique", players: "2", duration: "20–45 min", difficulty: "Classic", difficultyFr: "Classique", symbol: "♞", emoji: "♟️", status: "available", className: "chess" },
  { id: "scrabble", name: "Scrabble", nameFr: "Scrabble", type: "Words", typeFr: "Mots", players: "2–4", duration: "45–75 min", difficulty: "Social", difficultyFr: "Convivial", symbol: "A Z", emoji: "🔤", status: "available", className: "catan" },
  { id: "dominoes", name: "Dominoes", nameFr: "Dominos", type: "Classic", typeFr: "Classique", players: "2–4", duration: "20–40 min", difficulty: "Easy", difficultyFr: "Facile", symbol: "••", emoji: "🁫", status: "checked-out", className: "cards" },
];

export const staff = [
  { name: "Sofiene", role: "Owner", initials: "SZ", status: "Online", shift: "08:00–18:00" },
  { name: "Malek", role: "Manager", initials: "MK", status: "On shift", shift: "10:00–20:00" },
  { name: "Aya", role: "Barista", initials: "AY", status: "On shift", shift: "08:00–16:00" },
];

export const moduleGroups = [
  {
    title: "Customer experience",
    features: ["Responsive café website", "English/French digital & QR menu", "53 real products, options and allergens", "Customer accounts & favourites", "Games and 5 DT Kids Park access", "Map, contact, social links and opening hours"],
  },
  {
    title: "Service & operations",
    features: ["Scan-started, expiring table ordering", "Live barista / kitchen display", "Accurate 8-table + 3-PC-table floor map", "Reservations, waitlist and reminders", "Daily cash and shift close", "Order-ready customer display"],
  },
  {
    title: "Revenue & retention",
    features: ["Online payments & digital receipts", "Points, coupons and happy hours", "Receipt QR loyalty sync", "Rewards wallet, birthdays and VIP tiers", "Campaign broadcasts and referrals", "Events and big-match notifications"],
  },
  {
    title: "Intelligence & control",
    features: ["Sales, QR and reservation reports", "Peak-hour and behaviour insights", "Session abuse controls and audit", "Optional AI-assisted concepts", "Low-stock and message automations", "Roles, activity log, backup and export"],
  },
];

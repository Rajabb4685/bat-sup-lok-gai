const { openDb } = require("./db");

const db = openDb();

const seed = [
  {
    name: "HK Tea and Sushi",
    category: "Restaurant",
    description: "Casual spot for tea + sushi.",
    address: "86th St, Brooklyn, NY",
    neighborhood: "Bensonhurst",
    phone: "",
    website: "",
    instagram: "",
    imageUrl: "",
    tags: ["sushi", "tea"],
  },
  {
    name: "Pinky Salon",
    category: "Beauty",
    description: "Hair + nails + more.",
    address: "86th St, Brooklyn, NY",
    neighborhood: "Bensonhurst",
    tags: ["hair", "nails"],
  },
];

const insert = db.prepare(`
  INSERT INTO businesses (name, category, description, address, neighborhood, phone, website, instagram, imageUrl, tags)
  VALUES (@name, @category, @description, @address, @neighborhood, @phone, @website, @instagram, @imageUrl, @tags)
`);

db.transaction(() => {
  for (const b of seed) {
    insert.run({
      name: b.name,
      category: b.category,
      description: b.description ?? "",
      address: b.address ?? "",
      neighborhood: b.neighborhood ?? "",
      phone: b.phone ?? "",
      website: b.website ?? "",
      instagram: b.instagram ?? "",
      imageUrl: b.imageUrl ?? "",
      tags: JSON.stringify(b.tags ?? []),
    });
  }
})();

console.log("Seed complete!");

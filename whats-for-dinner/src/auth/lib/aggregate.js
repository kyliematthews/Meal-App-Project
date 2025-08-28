// Merge ingredients from many recipes into one list.
// Ingredient shape: { name, qty, unit }
export function aggregateIngredients(recipes) {
  const bucket = new Map();
  for (const r of recipes) {
    for (const ing of (r.ingredients || [])) {
      const key = `${(ing.name||"").trim().toLowerCase()}::${(ing.unit||"").trim()}`;
      const prev = bucket.get(key) || 0;
      const qty = Number(ing.qty) || 0;
      bucket.set(key, prev + qty);
    }
  }
  return Array.from(bucket.entries()).map(([k, total]) => {
    const [name, unit] = k.split("::");
    return { name, qty: total, unit };
  });
}
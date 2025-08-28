import { db } from "../../firebaseConfig";
import {
  collection, doc, addDoc, setDoc, getDoc, getDocs
} from "firebase/firestore";

export const colRecipes      = (uid) => collection(db, "users", uid, "recipes");
export const colMealPlans    = (uid) => collection(db, "users", uid, "mealPlans"); // doc id = YYYY-MM-DD
export const colGroceryLists = (uid) => collection(db, "users", uid, "groceryLists"); // doc id = "active"

export async function addRecipe(uid, recipe) {
  return addDoc(colRecipes(uid), { ...recipe, createdAt: Date.now() });
}

export async function listRecipes(uid) {
  const snap = await getDocs(colRecipes(uid));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function planMeal(uid, dateISO, slot, recipeId) {
  const ref = doc(db, "users", uid, "mealPlans", dateISO);
  const existing = await getDoc(ref);
  const data = existing.exists() ? existing.data() : {};
  data[slot] = recipeId;
  await setDoc(ref, data, { merge: true });
}

export async function getDayPlan(uid, dateISO) {
  const ref = doc(db, "users", uid, "mealPlans", dateISO);
  const d = await getDoc(ref);
  return d.exists() ? d.data() : {};
}

export async function getRecipe(uid, recipeId) {
  const ref = doc(db, "users", uid, "recipes", recipeId);
  const d = await getDoc(ref);
  return d.exists() ? { id: recipeId, ...d.data() } : null;
}

export async function upsertGroceryList(uid, items) {
  const ref = doc(db, "users", uid, "groceryLists", "active");
  await setDoc(ref, { items, updatedAt: Date.now() }, { merge: true });
}

export async function getGroceryList(uid) {
  const ref = doc(db, "users", uid, "groceryLists", "active");
  const d = await getDoc(ref);
  return d.exists() ? (d.data().items || []) : [];
}
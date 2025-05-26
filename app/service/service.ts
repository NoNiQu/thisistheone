import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import type { Hero } from "../types/hero";
import type { enemy } from "../types/enemy";

export const fetchStageById = async (id: string) => {
  const ref = doc(db, "stages", id);
  const snap = await getDoc(ref);
  if (!snap.exists()) {
    throw new Error(`Stage ${id} not found`);
  }
  return snap.data();
};

export const fetchAllStages = async (): Promise<string[]> => {
  const snapshot = await getDocs(collection(db, "stages"));
  return snapshot.docs.map((doc) => doc.id).sort();
};

export const fetchCombatsFromStage = async (stageId: string): Promise<{ [key: string]: enemy[] }> => {
  const combatsRef = collection(db, "stages", stageId, "combats");
  const snapshot = await getDocs(combatsRef);

  const result: { [key: string]: enemy[] } = {};

  snapshot.docs.forEach(doc => {
    result[doc.id] = doc.data().enemies as enemy[];
  });

  return result;
};

export const fetchHero = async (): Promise<Hero> => {
  const ref = doc(db, "hero", "mainHero");
  const snap = await getDoc(ref);
  if (!snap.exists()) throw new Error("Héroe no encontrado");
  return snap.data() as Hero;
};

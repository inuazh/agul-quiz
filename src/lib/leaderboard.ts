import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type ScoreRow = {
  id: string;
  nick: string;
  score: number;
  createdAt?: unknown;
};

const COL = "scores";

export async function fetchTop10(): Promise<ScoreRow[]> {
  const q = query(collection(db, COL), orderBy("score", "desc"), orderBy("createdAt", "desc"), limit(10));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ScoreRow, "id">),
  }));
}

export async function submitScore(nick: string, score: number) {
  await addDoc(collection(db, COL), {
    nick,
    score,
    createdAt: serverTimestamp(),
  });
}

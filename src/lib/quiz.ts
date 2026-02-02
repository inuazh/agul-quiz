import type { Question, WordItem } from "../types";

function randInt(max: number) {
  return Math.floor(Math.random() * max);
}

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function makeQuestion(words: WordItem[], prevWordId?: number): Question {
  // pick a word (avoid repeating immediately)
  let w = words[randInt(words.length)];
  let guard = 0;
  while (w.id === prevWordId && guard++ < 20) w = words[randInt(words.length)];

  const correct = w.ru;

  // distractors: same difficulty (simple & good enough)
  const pool = words
    .filter((x) => x.difficulty === w.difficulty && x.ru !== correct)
    .map((x) => x.ru);

  // unique distractors
  const distractors = new Set<string>();
  while (distractors.size < 3 && pool.length > 0) {
    distractors.add(pool[randInt(pool.length)]);
  }

  const options = shuffle([correct, ...Array.from(distractors)].slice(0, 4));
  // если вдруг pool слишком маленький — добиваем из общего списка
  while (options.length < 4) {
    const candidate = words[randInt(words.length)].ru;
    if (!options.includes(candidate)) options.push(candidate);
  }

  return {
    word: w,
    correct,
    options: shuffle(options),
  };
}

export function scoreForDifficulty(d: WordItem["difficulty"]) {
  return d === "easy" ? 1 : 2;
}

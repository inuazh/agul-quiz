export type Difficulty = "easy" | "hard";

export type WordItem = {
  id: number;
  agul: string;
  ru: string;
  difficulty: Difficulty;
};

export type Question = {
  word: WordItem;
  options: string[]; // 4 русских варианта
  correct: string;
};

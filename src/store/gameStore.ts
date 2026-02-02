import { create } from "zustand";
import type { Question, WordItem } from "../types";
import { makeQuestion, scoreForDifficulty } from "../lib/quiz";

type Phase = "start" | "playing" | "gameover";

type GameState = {
  phase: Phase;
  lives: number;
  score: number;

  question: Question | null;
  selected: string | null;
  reveal: boolean;

  startGame: (words: WordItem[]) => void;
  answer: (choice: string, words: WordItem[]) => void;
  reset: () => void;
};

const REVEAL_MS = 900;

export const useGameStore = create<GameState>((set, get) => ({
  phase: "start",
  lives: 3,
  score: 0,

  question: null,
  selected: null,
  reveal: false,

  startGame: (words) => {
    const q = makeQuestion(words);
    set({
      phase: "playing",
      lives: 3,
      score: 0,
      question: q,
      selected: null,
      reveal: false,
    });
  },

  answer: (choice, words) => {
    const { question, reveal, phase } = get();
    if (phase !== "playing" || !question || reveal) return;

    const isCorrect = choice === question.correct;
    const nextScore = isCorrect ? get().score + scoreForDifficulty(question.word.difficulty) : get().score;
    const nextLives = isCorrect ? get().lives : get().lives - 1;

    // show reveal
    set({
      selected: choice,
      reveal: true,
      score: nextScore,
      lives: nextLives,
    });

    window.setTimeout(() => {
      const state = get();
      // если жизни кончились — game over
      if (state.lives <= 0) {
        set({ phase: "gameover" });
        return;
      }

      const prevId = state.question?.word.id;
      const q2 = makeQuestion(words, prevId);

      set({
        question: q2,
        selected: null,
        reveal: false,
      });
    }, REVEAL_MS);
  },

  reset: () => {
    set({
      phase: "start",
      lives: 3,
      score: 0,
      question: null,
      selected: null,
      reveal: false,
    });
  },
}));

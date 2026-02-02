import { useEffect } from "react";
import { Container } from "./components/Container";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { GameOverScreen } from "./screens/GameOverScreen";
import { ensureAnonAuth } from "./lib/firebase";
import { useGameStore } from "./store/gameStore";

import words from "./data/words.json";
import type { WordItem } from "./types";

const WORDS = words as WordItem[];

export default function App() {
  const { phase, score, startGame, reset } = useGameStore();

  useEffect(() => {
    ensureAnonAuth().catch(() => {
      // если auth не завёлся — игра всё равно будет работать,
      // просто leaderboard может не писать
    });
  }, []);

  return (
    <Container>
      {phase === "start" && (
        <StartScreen onStart={() => startGame(WORDS)} />
      )}

      {phase === "playing" && <GameScreen words={WORDS} />}

      {phase === "gameover" && (
        <GameOverScreen
          score={score}
          onPlayAgain={() => {
            reset();
            startGame(WORDS);
          }}
        />
      )}
    </Container>
  );
}

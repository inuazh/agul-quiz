import type { WordItem } from "../types";
import { OptionButton } from "../components/OptionButton";
import { useGameStore } from "../store/gameStore";

function Hearts({ n }: { n: number }) {
  return <div className="text-xl">{Array.from({ length: n }).map((_, i) => <span key={i}>❤️</span>)}</div>;
}

export function GameScreen({ words }: { words: WordItem[] }) {
  const { lives, score, question, selected, reveal, answer } = useGameStore();

  if (!question) return null;

  const disabled = reveal;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <Hearts n={lives} />
        <div className="rounded-xl bg-slate-900 px-3 py-2 font-semibold">Score: {score}</div>
      </div>

      <div className="rounded-3xl bg-slate-900 p-5">
        <div className="text-xs text-slate-400 mb-2">
          Сложность: <span className="font-semibold text-slate-200">{question.word.difficulty}</span>
        </div>
        <div className="text-4xl font-bold leading-tight">{question.word.agul}</div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {question.options.map((opt) => {
          let state: "idle" | "correct" | "wrong" = "idle";
          if (reveal) {
            if (opt === question.correct) state = "correct";
            else if (opt === selected) state = "wrong";
          }
          return (
            <OptionButton
              key={opt}
              label={opt}
              disabled={disabled}
              state={state}
              onClick={() => answer(opt, words)}
            />
          );
        })}
      </div>

      <p className="text-center text-xs text-slate-400">
        После ответа показываем правильный вариант ~1 секунду.
      </p>
    </div>
  );
}

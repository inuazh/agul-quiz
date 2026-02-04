import { Button } from "../components/Button";

export function StartScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Агульский квиз</h1>
        <p className="text-slate-300">
          Небольшая игра, чтобы освежить слова и поддержать язык. 4 варианта ответа, 3 жизни, очки за сложные слова выше.
        </p>
      </div>

      <div className="rounded-2xl bg-slate-900 p-4 text-slate-200">
        <div className="flex items-center justify-between">
          <span>Режим</span>
          <span className="font-semibold">Endless</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Жизни</span>
          <span className="font-semibold">3</span>
        </div>
      </div>

      <Button onClick={onStart} className="bg-slate-800 hover:bg-slate-700">
        Начать
      </Button>

      <p className="text-xs text-slate-400">
        После игры показывается общий топ — можно посоревноваться с другими игроками.
      </p>
    </div>
  );
}

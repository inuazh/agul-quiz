import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { fetchTop10, type ScoreRow } from "../lib/leaderboard";

export function StartScreen({ onStart }: { onStart: () => void }) {
  const [showTop, setShowTop] = useState(false);
  const [rows, setRows] = useState<ScoreRow[] | null>(null);

  useEffect(() => {
    if (!showTop || rows !== null) return;

    let active = true;
    fetchTop10()
      .then((data) => {
        if (active) setRows(data);
      })
      .catch(() => {
        if (active) setRows([]);
      });

    return () => {
      active = false;
    };
  }, [showTop, rows]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Агульский квиз</h1>
        <p className="text-slate-300">
          Небольшая игра, чтобы освежить слова и поддержать сохранность языка. 4 варианта ответа, 3 жизни, очки за сложные слова выше
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

      <div className="space-y-3">
        <Button onClick={onStart} className="bg-slate-800 hover:bg-slate-700">
          Начать
        </Button>
        <Button
          onClick={() => setShowTop((prev) => !prev)}
          className="bg-slate-900 hover:bg-slate-800"
        >
          {showTop ? "Скрыть таблицу" : "Таблица рекордов"}
        </Button>
      </div>

      {showTop && (
        <div className="rounded-3xl bg-slate-900 p-5">
          <div className="mb-3 text-lg font-semibold">Top 10</div>

          {rows === null ? (
            <div className="text-slate-400">Загрузка…</div>
          ) : rows.length === 0 ? (
            <div className="text-slate-400">Пока нет рекордов.</div>
          ) : (
            <ol className="space-y-2">
              {rows.map((r, idx) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2"
                >
                  <span className="text-slate-200">
                    <span className="text-slate-500 mr-2">{idx + 1}.</span>
                    {r.nick}
                  </span>
                  <span className="font-semibold">{r.score}</span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}

      <p className="text-xs text-slate-400">
        Общий топ доступен здесь и после игры — можно посоревноваться с другими игроками.
      </p>

      <p className="text-xs text-slate-400">
В некоторых словах приводится вольная транскрипция, так как правила чтения формальной письменности 
агульского языка не всегда очевидны даже для носителей, которые говорят на языке, но не обучались его письменной форме
      </p>
    </div>
  );
}

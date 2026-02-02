import { useEffect, useMemo, useState } from "react";
import { Button } from "../components/Button";
import { fetchTop10, submitScore, type ScoreRow } from "../lib/leaderboard";

function isNickValid(nick: string) {
  const trimmed = nick.trim();
  if (trimmed.length < 3 || trimmed.length > 12) return false;
  // латиница/кириллица/цифры/пробел/_
  return /^[A-Za-zА-Яа-яЁё0-9 _]+$/.test(trimmed);
}

export function GameOverScreen({
  score,
  onPlayAgain,
}: {
  score: number;
  onPlayAgain: () => void;
}) {
  const [rows, setRows] = useState<ScoreRow[] | null>(null);
  const [nick, setNick] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchTop10().then(setRows).catch(() => setRows([]));
  }, []);

  const qualifies = useMemo(() => {
    if (!rows) return false;
    if (rows.length < 10) return score > 0;
    const tenth = rows[9]?.score ?? 0;
    return score > tenth;
  }, [rows, score]);

  async function onSave() {
    const trimmed = nick.trim();
    if (!isNickValid(trimmed)) return;

    setSaving(true);
    try {
      await submitScore(trimmed, score);
      setSaved(true);
      const refreshed = await fetchTop10();
      setRows(refreshed);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-slate-900 p-5">
        <div className="text-sm text-slate-400">Game Over</div>
        <div className="mt-1 text-4xl font-bold">Score: {score}</div>
        <div className="mt-2 text-slate-300">Топ показываем всегда — для мотивации.</div>
      </div>

      <div className="rounded-3xl bg-slate-900 p-5">
        <div className="mb-3 text-lg font-semibold">Top 10</div>

        {rows === null ? (
          <div className="text-slate-400">Загрузка…</div>
        ) : rows.length === 0 ? (
          <div className="text-slate-400">Пока нет рекордов.</div>
        ) : (
          <ol className="space-y-2">
            {rows.map((r, idx) => (
              <li key={r.id} className="flex items-center justify-between rounded-xl bg-slate-950/40 px-3 py-2">
                <span className="text-slate-200">
                  <span className="text-slate-500 mr-2">{idx + 1}.</span>
                  {r.nick}
                </span>
                <span className="font-semibold">{r.score}</span>
              </li>
            ))}
          </ol>
        )}

        {rows !== null && qualifies && !saved && (
          <div className="mt-4 space-y-3">
            <div className="text-slate-200 font-semibold">Ты в топе — сохрани ник!</div>
            <input
              value={nick}
              onChange={(e) => setNick(e.target.value)}
              placeholder="Ник (3–12, кир/лат)"
              className="w-full rounded-2xl bg-slate-950/40 px-4 py-3 outline-none ring-1 ring-slate-800 focus:ring-slate-600"
            />
            <Button disabled={saving || !isNickValid(nick)} onClick={onSave}>
              {saving ? "Сохраняю…" : "Сохранить"}
            </Button>
            <div className="text-xs text-slate-400">
              Разрешено: кириллица/латиница/цифры/пробел/_
            </div>
          </div>
        )}

        {saved && (
          <div className="mt-4 rounded-2xl bg-emerald-900/40 px-4 py-3 text-emerald-100">
            Сохранено ✅
          </div>
        )}
      </div>

      <Button onClick={onPlayAgain}>Играть ещё</Button>
    </div>
  );
}

import { Button } from "./Button";

type Props = {
  label: string;
  disabled: boolean;
  state: "idle" | "correct" | "wrong";
  onClick: () => void;
};

export function OptionButton({ label, disabled, state, onClick }: Props) {
  const style =
    state === "correct"
      ? "bg-emerald-600 hover:bg-emerald-600 text-white"
      : state === "wrong"
      ? "bg-rose-600 hover:bg-rose-600 text-white"
      : "bg-slate-800 hover:bg-slate-700";

  return (
    <Button disabled={disabled} onClick={onClick} className={style}>
      {label}
    </Button>
  );
}

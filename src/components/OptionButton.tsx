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
      ? "bg-emerald-600 hover:bg-emerald-600"
      : state === "wrong"
      ? "bg-rose-600 hover:bg-rose-600"
      : "";

  return (
    <Button disabled={disabled} onClick={onClick} className={style}>
      {label}
    </Button>
  );
}

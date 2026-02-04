import type { ButtonHTMLAttributes } from "react";

export function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { className = "", ...rest } = props;
  return (
    <button
      {...rest}
      className={
        "w-full rounded-2xl px-4 py-4 text-lg font-semibold transition active:scale-[0.99] disabled:opacity-60 " +
        className
      }
    />
  );
}

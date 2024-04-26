import { useState } from "react";
import { Display } from "./components/DisplayWithoutMemo";

export function MemoSection() {
  const name = "NAN";
  const [count, setCount] = useState<number>(0);

  return (
    <div className="text-white items-center justify-center w-full flex gap-y-[20px] flex-col">
      <Display name={name} />

      <button
        className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
        onClick={() => setCount((prev) => prev + 1)}
      >
        Click me
      </button>

      <p>Total: {count}</p>
    </div>
  );
}

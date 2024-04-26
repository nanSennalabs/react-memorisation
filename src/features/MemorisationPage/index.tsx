import { useState } from "react";
import { HookSection } from "./components/HookSection";
import { MemoSection } from "./components/MemoSection";
import classNames from "classnames";

export function MemorisationPage() {
  const [selected, setSelected] = useState("memo");

  function handleSelect(val: string) {
    setSelected(val);
  }
  return (
    <div className="m-[24px] w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-secondary font-semibold text-[30px] mb-[20px]">
          Memorisation :
        </h2>
        <div className="text-primary text-[20px] grid grid-cols-2 border-b border-white p-[20px] mb-[30px]">
          <button
            className={classNames({ underline: selected === "memo" })}
            onClick={() => handleSelect("memo")}
          >
            Memo
          </button>
          <button
            className={classNames({ underline: selected === "hook" })}
            onClick={() => handleSelect("hook")}
          >
            useCallback
          </button>
        </div>

        {selected === "memo" ? <MemoSection /> : <HookSection />}
      </div>
    </div>
  );
}

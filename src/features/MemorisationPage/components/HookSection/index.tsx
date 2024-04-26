import { useCallback, useState } from "react";

export function HookSection() {
  const [number, setNumber] = useState(0);
  const [someValue, setSomeValue] = useState(0);
  const [numberWithCallback, setNumberWithCallback] = useState<
    number | undefined
  >(undefined);

  const getTimestamp = () => new Date().getTime();

  const numberWithoutCallback = getTimestamp();

  const getNumber = useCallback(() => {
    setNumberWithCallback(() => getTimestamp());
  }, [someValue]);

  return (
    <div className="text-white">
      ทดลองเปลี่ยนค่า (Number): {number}
      <br />
      <div className="flex gap-x-[20px] py-[20px]">
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            setNumber((prev) => ++prev);
          }}
        >
          เพิ่ม (+)
        </button>
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            setNumber((prev) => --prev);
          }}
        >
          ลด (-)
        </button>
      </div>
      <hr />
      <p className="pt-[10px]">ทดลองเปลี่ยนค่า (Some value): {someValue}</p>
      <div className="flex gap-x-[20px] py-[20px]">
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            setSomeValue((prev) => ++prev);
            getNumber();
          }}
        >
          เพิ่ม (+)
        </button>
        <button
          className="bg-secondary px-[16px] py-[8px] rounded-[8px] text-black w-[150px]"
          onClick={() => {
            setSomeValue((prev) => --prev);
            getNumber();
          }}
        >
          ลด (-)
        </button>
      </div>
      <p className="py-[20px]">
        ไม่ใช้ useCallback: {numberWithoutCallback}
      </p>
      <hr />
      <p className="py-[20px]">ใช้ useCallback: {numberWithCallback}</p>
      <hr />
    </div>
  );
}

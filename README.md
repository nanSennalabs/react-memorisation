# Performance Optimisations

# Memorisation

## Memorisation คือ

เทคนิคการเพิ่มประสิทธิภาพการทำงานที่ช่วยให้เราสามารถลดการใช้หน่วยความจำและเวลาให้เหลือน้อยที่สุดในขณะที่ดำเนินการฟังก์ชันที่ใช้ทรัพยากรจำนวนมาก และป้องกันการเรนเดอร์ซ้ำโดยไม่จำเป็น 

## Memoization ใน React

Memoization สามารถนำมาใช้ได้หลายวิธีในการเพิ่มประสิทธิภาพการทำงานของ React สามารถบันทึกส่วนประกอบ React ไว้ได้เพื่อป้องกันการเรนเดอร์ส่วนประกอบที่ไม่จำเป็น ใน React ใช้ React.memo useMemo และ useCallback

## ทำไมต้อง Memorisation

สำหรับ React ปัญหาการ รี-เรนเดอร์ เป็นปัญหาใหญ่ ที่ทำให้เกิดการเรนเดอร์ซ้ำๆ ซึ่งทุกการเรนเดอร์จะเกิดการจอง Memory (Memory allocation) และบางทีการเรนเดอร์ Component ซ้ำ ๆ เกินความจำเป็นอาจจะทำให้เกิดการจัดสรรหน่วยความจำอย่างไม่ถูกต้อง (Memory Leak)


## ตัวอย่างเคสการนำ memo มาปรับใช้

```
import { useState } from "react";

function Display({ name }: { name: string }) {
  console.log("render Display()");

  return <div className="font-bold">Name is: {name}</div>;
}

function Counter() {
  const name = "NAN";
  const [count, setCount] = useState(0);

  return (
    <>
        <Display name={name} />
            <button
            type="button"
            onClick={() => setCount((prev) => prev + 1)}
        >
            Click me
        </button>
        <p>Total: {count}</p>
    </>
  )
}
```

จากโค้ดตัวอย่างด้านบน ถ้าเรากด Click me จะทำให้ state มีการอัพเดตและ รี-เรนเดอร์ ใหม่ทุกครั้ง แต่ props ที่ส่งไปที่ Display ไม่เปลี่ยน เพราะฉะนั้นจึงเกิดการเรนเดอร์ที่ไม่จำเป็น สิ่งที่นำมาจัดการปัญหาคือ React.memo()


```
const Display = React.memo(function Display({ name }: { name: string }) {
  console.log("render Display() with memo");

  return <div className="font-bold">Name is: {name}</div>;
});
```

เมื่อนำ React.memo เข้ามาใช้จะสามารถแก้ไขการรี-เรนเดอร์ซ้ำ เพราะมันถูก memoized ไว้ ตราบใดที่ Props ยังไม่เปลี่ยน โดยจะ return ค่า เป็น new componet ทำงานเหมือนข้อมูลที่ถูก memoized ไว้ก่อนหน้า

## ตัวอย่างเคสการนำ useCallback มาปรับใช้

```
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

```

จากโค้ดตัวอย่างด้านบนคือตัวอย่างการนำ useCallback มาปรับใช้

### แบบไม่ใช้ useCallback

- Timestamp แสดงครั้งแรกเมื่อมีการเรนเดอร์
- Timestamp แสดงอีกครั้งเมื่อมีการรี-เรนเดอร์ (Number หรือ Some Value เปลี่ยนแปลง)

### แบบใช้ useCallback

- Timestamp ไม่แสดงครั้งแรกเรียกเมื่อมีการเรนเดอร์ (จะแสดงเมื่อเราสั่ง Call ฟังก์ชันเอง)
- Timestamp แสดงเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Some Value มีการเปลี่ยนแปลงเท่านั้น

useCallback คือการ Cache ฟังก์ชันไว้ ไม่ถูกเรียกเมื่อมีการเรนเดอร์ (จะถูกเรียกเมื่อเราสั่ง Call ฟังก์ชันเอง)หรือถูกเรียกอีกครั้งเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Array deps มีการเปลี่ยนแปลง และReturn ออกเป็น Function



## สรุป
การนำ Memorisation มาปรับใช้กับโค้ด เป็นประโยชน์อย่างมากไม่ว่าจะเป็นเรื่องการลดการใช้หน่วยความจำหรือเพิ่มประสิทธิการทำงานของซอฟต์แวร์ ปัญหาเรื่องการใช้ memmory เกินความจำเป็น ถ้าเราละเลยมันและปล่อยมันไว้แล้วซอฟต์แวร์เราใหญ่ขึ้น เมื่อถึงจุดนี้การที่ไปไล่หาสาเหตุในระบบก็จะทำให้เราใช้เวลาและทรัพยากรไปเป็นอย่างมาก ดังนั้นหากเราคำนึงถึงและคอยตรวจสอบอย่างสม่ำเสมอก็จะช่วยห้องกันปัญหานี้ได้ เราสามารถนำ React.memo() useCallback และ useMemo เข้ามาปรับใช้ในการแก้ไขปัญหาของการเรนเดอร์ที่ไม่จำเป็นที่อาจทำให้เกิดปัญหาในอนาคต สามารถดูตัวอย่างการใช้งานของ useMemo ได้ที่ [useMemo](https://github.com/nanSennalabs/react-hooks-mini-example)


## แหล่งที่มา

- [React Memo Guide with Examples](https://refine.dev/blog/react-memo-guide/#investigation)
- [What is Memoization in React? | Syncfusion Blogs](https://www.syncfusion.com/blogs/post/what-is-memoization-in-react)
- [React.memo() คืออะไร?](https://www.devahoy.com/blog/2019/11/react-memo-in-function-component)
- [การใช้งานและความแตกต่างระหว่าง useMemo และ useCallback ของ React Hooks](https://blog.2my.xyz/2021/08/14/react-hooks-usememo-usecallback/#%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-usecallback)

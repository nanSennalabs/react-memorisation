# Performance Optimisations

# Memorisation

## Memorisation คือ

เทคนิคการเพิ่มประสิทธิภาพการทำงานที่ช่วยให้เราสามารถลดการใช้หน่วยความจำและเวลาให้เหลือน้อยที่สุดในขณะที่ดำเนินการฟังก์ชันที่ใช้ทรัพยากรจำนวนมาก และป้องกันการเรนเดอร์ซ้ำโดยไม่จำเป็น 

## Memoization ใน React

Memoization สามารถนำมาใช้ได้หลายวิธีในการเพิ่มประสิทธิภาพการทำงานของ React สามารถบันทึกส่วนประกอบ React ไว้ได้เพื่อป้องกันการเรนเดอร์ส่วนประกอบที่ไม่จำเป็น ใน React ใช้ React.memo กับ useCallback

## ทำไมต้อง Memorisation

สำหรับ React ปัญหาการ Re-Render เป็นปัญหาใหญ่ ที่ทำให้เกิดการ Render ซ้ำๆ ซึ่งทุกการ Render จะเกิดการจอง Memory (Memory allocation) และบางทีการ Render Component ซ้ำ ๆ เกินความจำเป็นอาจจะทำให้เกิดการจัดสรรหน่วยความจำอย่างไม่ถูกต้อง (Memory Leak)

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

จากโค้ดตัวอย่างด้านบน ถ้าเรากด Click me จะทำให้ state มีการอัพเดตและ re-render ใหม่ทุกครั้ง แต่ props ที่ส่งไปที่ Display ไม่เปลี่ยน เพราะฉะนั้นจึงเกิดการ render ที่ไม่จำเป็น สิ่งที่นำมาจัดการปัญหาคือ React.memo()

### React.memo

React.memo() เป็น Higher Order Component ซึ่งจะ render เฉพาะตอน Props เปลี่ยน

```
const Display = React.memo(function Display({ name }: { name: string }) {
  console.log("render Display() with memo");

  return <div className="font-bold">Name is: {name}</div>;
});
```

เมื่อนำ React.memo เข้ามาใช้จะสามารถแก้ไขการ re-render ซ้ำ เพราะมันถูก memoized ไว้ ตราบใดที่ Props ยังไม่เปลี่ยน โดยจะ return ค่า เป็น new componet ทำงานเหมือนข้อมูลที่ถูก memoized ไว้ก่อนหน้า


## ตัวอย่างเคสการนำ useCallback มาปรับใช้

```

```

จากโค้ดตัวอย่างด้านบนคือตัวอย่างการนำ useCallback มาปรับใช้

### แบบไม่ใช้ useCallback

- Timestamp แสดงครั้งแรกเมื่อมีการ Render
- Timestamp แสดงอีกครั้งเมื่อมีการ Re-Render (Number หรือ Some Value เปลี่ยนแปลง)
- เป็นตัวอย่างกรณีการ Re-Render เกินความจำเป็น

### แบบใช้ useCallback

- Timestamp ไม่แสดงครั้งแรกเรียกเมื่อมีการ Render (จะแสดงเมื่อเราสั่ง Call ฟังก์ชันเอง)
- Timestamp แสดงเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Some Value มีการเปลี่ยนแปลงเท่านั้น
- เป็นตัวอย่างกรณีการ Re-Render เฉพาะที่จำเป็น

หลักการของ useCallback คือการ Cache ฟังก์ชันไว้ ไม่ถูกเรียกเมื่อมีการ Render (จะถูกเรียกเมื่อเราสั่ง Call ฟังก์ชันเอง)หรือถูกเรียกอีกครั้งเมื่อสั่ง Call ฟังก์ชัน และ ค่าใน Array deps มีการเปลี่ยนแปลง และReturn ออกเป็น Function

## แหล่งที่มา

- [React Memo Guide with Examples](https://refine.dev/blog/react-memo-guide/#investigation)
- [What is Memoization in React? | Syncfusion Blogs](https://www.syncfusion.com/blogs/post/what-is-memoization-in-react)
- [React.memo() คืออะไร?](https://www.devahoy.com/blog/2019/11/react-memo-in-function-component)
- [การใช้งานและความแตกต่างระหว่าง useMemo และ useCallback ของ React Hooks](https://blog.2my.xyz/2021/08/14/react-hooks-usememo-usecallback/#%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-usecallback)

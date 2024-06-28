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

เมื่อนำ React.memo() เข้ามาใช้ Display ถูกเรนเดอร์เพียงครั้งเดียว เพราะมันถูก memoized ไว้และตราบใดที่ Props ยังไม่เปลี่ยน React.memo() จะ return ค่า เป็น new componet ทำงานเหมือนข้อมูลที่ถูก memoized ไว้ก่อนหน้า

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

# Lazy load

## React.lazy คือ

React.lazy() เป็นฟังก์ชันที่โหลด component ของ React โดยจะทำการ Code Splitting เพื่อแยก component ต่างๆออกเป็นอิสระต่อกันไม่ต้องไปโหลดที่ bundle file เดียว สามารถปรับปรุงประสิทธิภาพได้อย่างดีและจะเห็นผลได้ชัดเจนเมื่อ application ของเรามีขนาดใหญ่

## การใช้งาน

```
import React, { Suspense } from "react";
const LazyComponent = React.lazy(() => import("./components/LazyComponent"));

export function LazyPage() {
  return (
    <div className="m-[24px] w-full">
      <div className="w-full flex flex-col items-center justify-center">
        <h2 className="text-secondary font-semibold text-[30px] mb-[20px]">
          Lazy and Suspense
        </h2>

        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      </div>
    </div>
  );
}
```

ทำการ import component ที่ต้องการ render ด้วย lazy จากนั้น component ที่ถูก React.lazy จะถูกโหลด
จาก bundle ของตัวมันเองโดยไม่ยุ่งกับ bundle หลักของ project ทำให้ load component ได้เร็วขึ้นและจะแสดงผลอัตโนมัติเมื่อ LazyComponent ทำการ render เสร็จแล้ว ถ้า component ยัง render ไม่เสร็จจะทำให้เกิดหน้าขาว

## Suspense

Suspense นำมาใช้ระหว่างที่รอให้ Lazy Component โหลดเสร็จสิ้น สามารใช้ Suspense เพื่อแสดง UI ในระหว่างที่ Component นั้น ๆ กำลังโหลด โดย Suspense component จะมี props ชื่อ fallback สามารถส่ง element บางอย่างเข้าไปเพื่อจะให้แสดงระหว่างที่รอ LazyComponent render เสร็จโดยตัวอย่างด้านบนตำแหน่งของ LazyComponent จะแสดงคำว่า Loading… จนกว่า LazyComponent จะทำการ render เสร็จนั้นเอง

## ข้อควรระวัง

ไม่ควรประกาศใช้ lazy ภายใน component เนื่องจากจะทำให้ การรี-เรนเดอร์ ที่ไม่จำเป็น

```
import { lazy } from 'react';

function Editor() {
  // 🔴 Bad: This will cause all state to be reset on re-renders
  const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));
  // ...
}
```

```
import { lazy } from 'react';

// ✅ Good: Declare lazy components outside of your components
const MarkdownPreview = lazy(() => import('./MarkdownPreview.js'));

function Editor() {
  // ...
}
```

## สรุป
lazy load ส่วนใหญ่จะนำมาใช้กับ project ที่มีขนาดใหญ่ กรณีที่ component ไม่ได้ซับซ้อนหรือแค่ส่ง props ไป render เท่านั้น ก็ไม่จำเป็นต้องทำ lazy load ก็ได้

# Code splitting

code splitting เป็นเทคนิคสำคัญในการพัฒนาเว็บสมัยใหม่เพื่อเพิ่มประสิทธิภาพการทำงานของแอปพลิเคชัน React ช่วยให้คุณสามารถแยกชุด JavaScript ของคุณออกเป็นส่วนเล็กๆ ได้ ด้วย code splitting คุณสามารถโหลดโค้ดที่จำเป็นในบริบทเฉพาะเท่านั้น ซึ่งช่วยลดเวลาในการโหลดครั้งแรก 

## Why is Code Splitting important?

โดยปกติ เมื่อคุณสร้างแอปพลิเคชัน React โค้ด JavaScript ทั้งหมดจะถูกมัดรวมไว้ในไฟล์เดียว แม้ว่าวิธีนี้จะช่วยลดความซับซ้อนของกระบวนการพัฒนา แต่ก็อาจทำให้ขนาดใหญ่ขึ้นได้ การที่มีแอปพลิเคชันขนาดใหญ่จะใช้เวลาโหลดนานกว่า โดยเฉพาะในเครือข่ายที่ช้าหรืออุปกรณ์พกพาจะทำให้เวลาในการโหลดนานขึ้น


ปกติเวลาเราสร้างโปรเจ็คซอฟต์แวร์โดยส่วนมากเวลาที่โค้ด build สำเร็จจะได้ไฟล์ผลลัพธ์ออกมาหนึ่งไฟล์ ซึ่งทั้งแอพจะอยู่ในไฟล์นั้นหมดเลย เมื่อมีการเพิ่มไฟล์ใหม่ๆ เช่นมีหน้าใหม่ๆ เพิ่มขึ้น มี component ใหม่ๆ ขึ้นมา ไฟล์ build ก็มีขนากใหญ่ขึ้นเรื่อยๆ ดังนั้น  code splitting จะเป็นการโหลดสิ่งที่จำเป็นมาใช้ แล้วจึงโหลดไฟล์เพิ่มเติมที่เหลือเมื่อครั้งที่จะถูกใช้เท่านั้น

ในทางกลับกัน การแบ่งโค้ดช่วยให้คุณแบ่งโค้ดออกเป็นส่วนย่อยๆ ซึ่งจะถูกโหลดตามต้องการ วิธีนี้ช่วยให้ผู้ใช้สามารถดาวน์โหลดโค้ดที่จำเป็นได้เฉพาะเมื่อนำทางไปยังเส้นทางที่กำหนดหรือโต้ตอบกับฟีเจอร์เฉพาะเท่านั้น ส่งผลให้เวลาในการโหลดเริ่มต้นลดลงอย่างมาก ซึ่งช่วยเพิ่มประสิทธิภาพและการทำงานของแอปพลิเคชัน

## การนำ Code Splitting ไปใช้ใน React

มีหลายวิธีในการนำการแยกโค้ดไปใช้ในแอปพลิเคชัน React มาลองดูสองวิธีที่ใช้กันทั่วไป:

### วิธีที่ 1: React.lazy() พร้อม Suspense
ฟังก์ชัน React.lazy() ช่วยให้คุณโหลดส่วนประกอบแบบ Lazyly ได้ ซึ่งหมายความว่าจะโหลดเฉพาะเมื่อจำเป็นเท่านั้น เมื่อใช้ร่วมกับส่วนประกอบ Suspense คุณจะสามารถโหลดได้อย่างราบรื่นในขณะที่รอให้ดึงและเรนเดอร์ส่วนประกอบที่โหลดแบบ Lazyly

สาทารถเลื่อนไปดูตัวอย่างได้ที่ด้านบนในเรื่อง Lazy load

### วิธีที่ 2: การนำเข้าแบบไดนามิกด้วย Webpack

หากคุณใช้ Webpack เป็นเครื่องมือสร้าง คุณสามารถใช้ประโยชน์จากคุณสมบัติการนำเข้าแบบไดนามิกเพื่อแยกโค้ดได้

```
import React, { Component } from 'react';

class App extends Component {
 handleClick = async () => {
   const module = await import('./DynamicComponent');
   // Do something with the dynamically imported module
 };

 render() {
   return (
     <div>
       <h1>My React App</h1>
       <button onClick={this.handleClick}>Load Dynamic Component</button>
     </div>
   );
 }
}

export default App;
```

ในตัวอย่างนี้ DynamicComponent จะถูกนำเข้าแบบไดนามิกโดยใช้รูปแบบ import() เมื่อคลิกปุ่ม ส่วนประกอบจะถูกโหลดแบบไดนามิก ทำให้คุณควบคุมได้ว่าจะต้องโหลดเมื่อใดและที่ใด

## สรุป
การแยกโค้ดเป็นเทคนิคที่มีประสิทธิภาพในการเพิ่มประสิทธิภาพการทำงานของแอปพลิเคชัน React การแบ่งโค้ดของคุณออกเป็นส่วนย่อยๆ และโหลดตามต้องการจะช่วยลดเวลาในการโหลดและมอบประสบการณ์การใช้งานที่ดีขึ้นให้กับผู้ใช้ได้อย่างมาก React มีเครื่องมือในตัว เช่น React.lazy() และ Suspense รวมถึงการสนับสนุนเครื่องมือ เช่น Webpack เพื่อทำให้การแยกโค้ดนั้นใช้งานได้ง่าย


## แหล่งที่มา

### Memorisation
- [React Memo Guide with Examples](https://refine.dev/blog/react-memo-guide/#investigation)
- [What is Memoization in React? | Syncfusion Blogs](https://www.syncfusion.com/blogs/post/what-is-memoization-in-react)
- [React.memo() คืออะไร?](https://www.devahoy.com/blog/2019/11/react-memo-in-function-component)
- [การใช้งานและความแตกต่างระหว่าง useMemo และ useCallback ของ React Hooks](https://blog.2my.xyz/2021/08/14/react-hooks-usememo-usecallback/#%E0%B9%81%E0%B8%81%E0%B9%89%E0%B8%9B%E0%B8%B1%E0%B8%8D%E0%B8%AB%E0%B8%B2%E0%B8%94%E0%B9%89%E0%B8%A7%E0%B8%A2-usecallback)

## Lazy load

-[[ReactJS] การใช้งาน Lazy-loading และ Suspense - Pratya Yeekhaday - Mediumlazy – React](https://medium.com/@pratya.yeekhaday/reactjs-%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%83%E0%B8%8A%E0%B9%89%E0%B8%87%E0%B8%B2%E0%B8%99-lazy-loading-%E0%B9%81%E0%B8%A5%E0%B8%B0-suspense-6289db90ae17)
-[lazy – React](https://react.dev/reference/react/lazy)


## Code Splitting

- [Code Splitting in React: Optimize Performance by Splitting your Code | by Shrihari Murali | Medium](https://medium.com/@shriharim006/code-splitting-in-react-optimize-performance-by-splitting-your-code-e3e70d0c3d91)
- [เพิ่มประสิทธิภาพลดขนาด App bundle size ด้วย Dynamically Importing กับ React.lazy | Kongvut's Blog! (2my.xyz)](https://blog.2my.xyz/2022/07/28/react-lazy-dynamic-imports/#implementing-code-splitting)
- ​​[Code Splitting for React: Dynamic Imports, Lazy Loading, and Suspense Explained | by Anurag Joshi | Medium](https://medium.com/@itsanuragjoshi/code-splitting-for-react-dynamic-imports-lazy-loading-and-suspense-explained-1ce3c8dde2c8)

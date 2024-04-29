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

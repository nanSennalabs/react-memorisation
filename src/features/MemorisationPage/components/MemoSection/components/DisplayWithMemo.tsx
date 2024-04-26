import React from "react";

export const Display = React.memo(function Display({ name }: { name: string }) {
  console.log("render Display() with memo");

  return <div className="font-bold">Name is: {name}</div>;
});

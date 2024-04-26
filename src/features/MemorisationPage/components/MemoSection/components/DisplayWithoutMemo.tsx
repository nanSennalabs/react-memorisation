export function Display({ name }: { name: string }) {
  console.log("render Display()");

  return <div className="font-bold">Name is: {name}</div>;
}

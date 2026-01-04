import { ReactNode } from "react";

export default function Button({ children }: { children: ReactNode }) {
  return (
    <button className="cursor-pointer capitalize font-medium bg-white py-3 px-10">
      {children}
    </button>
  );
}

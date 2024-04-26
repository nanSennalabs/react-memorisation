import { Link, useLocation } from "react-router-dom";
import { AppLayoutProps } from "./interface";
import cn from "classnames";

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <>
      <div className="h-[60px] bg-primary px-[20px] gap-x-[10px] flex items-center">
        <Link to="/" className="font-bold text-secondary">
          React
        </Link>
        <Link
          to="/memorisation"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/memorisation",
          })}
        >
          memorisation
        </Link>
        <Link
          to="/lazy-loading"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/lazy-loading",
          })}
        >
          lazy loading
        </Link>
        <Link
          to="/code-splitting"
          className={cn("hover:text-secondary", {
            "text-secondary underline": location.pathname === "/code-splitting",
          })}
        >
          code splitting
        </Link>
      </div>
      <div className="w-screen h-[calc(100vh-60px)] overflow-y-auto  bg-black">
        {children}
      </div>
    </>
  );
}

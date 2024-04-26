import { HomePageProps } from "./interface";

export function withHomePage(Component: React.FC<HomePageProps>) {
  function WithHomePage() {
    const menus = [
      { path: "/memorisation", name: "Memorisation" },
      { path: "/lazy-loading", name: "Lazy loading" },
      { path: "/code-splitting", name: "Code splitting" },
    ];
    const newProps = {
      menus,
    };
    return <Component {...newProps} />;
  }

  return WithHomePage;
}

import { homeRoutes } from "features/HomePage/homeRoutes";
import { lazyLoadRoutes } from "features/LazyPage/lazyLoadRoutes";
import { memorisationRoutes } from "features/MemorisationPage/memorisationRoutes";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "",
      children: [...homeRoutes, ...memorisationRoutes, ...lazyLoadRoutes],
    },
  ]);

  return routes;
}

export default App;

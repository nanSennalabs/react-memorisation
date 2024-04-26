import { homeRoutes } from "features/HomePage/homeRoutes";
import { memorisationRoutes } from "features/MemorisationPage/MemorisationRoutes";
import { useRoutes } from "react-router-dom";

function App() {
  const routes = useRoutes([
    {
      path: "",
      children: [...homeRoutes, ...memorisationRoutes],
    },
  ]);

  return routes;
}

export default App;

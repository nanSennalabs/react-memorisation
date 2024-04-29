import { AppLayout } from "components/layouts/AppLayout/intex";
import { LazyPage } from ".";

export const lazyLoadRoutes = [
  {
    path: "lazy-loading",
    element: (
      <AppLayout>
        <LazyPage />
      </AppLayout>
    ),
  },
];

import { AppLayout } from "components/layouts/AppLayout/intex";
import { HomePage } from ".";

export const homeRoutes = [
  {
    path: "",
    element: (
      <AppLayout>
        <HomePage />
      </AppLayout>
    ),
  },
];

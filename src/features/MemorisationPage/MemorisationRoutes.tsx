import { AppLayout } from "components/layouts/AppLayout/intex";
import { MemorisationPage } from ".";

export const memorisationRoutes = [
  {
    path: "memorisation",
    element: (
      <AppLayout>
        <MemorisationPage />
      </AppLayout>
    ),
  },
];

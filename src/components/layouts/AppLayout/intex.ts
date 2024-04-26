import { AppLayout } from "./AppLayout";
import { withAppLayout } from "./withAppLayout";

const ConnectedAppLayout = withAppLayout(AppLayout);

export { ConnectedAppLayout as AppLayout };

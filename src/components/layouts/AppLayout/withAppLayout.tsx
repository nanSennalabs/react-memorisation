import { AppLayoutProps } from "./interface";

export function withAppLayout(Component: React.FC<AppLayoutProps>) {
  function WithAppLayout({ ...props }: AppLayoutProps) {
    return <Component { ...props }/>;
  }
  return WithAppLayout;
}

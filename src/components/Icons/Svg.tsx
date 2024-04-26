import { FC, SVGProps, forwardRef } from "react";
import { IconProps } from "./interface";

export const Svg = (SvgComponent: FC<SVGProps<SVGSVGElement>>) => {
  return forwardRef(
    (
      { height = "24", width = "24", className = "" }: IconProps,
      ref: React.ForwardedRef<SVGSVGElement>
    ) => {
      const svgProps = {
        height,
        width,
        className,
      };
      return <SvgComponent {...svgProps} ref={ref} />;
    }
  );
};

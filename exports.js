import * as React from "react";

export const NetworkContext = React.createContext();
export default function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const vmax = Math.max(r, g, b),
    vmin = Math.min(r, g, b);
  let l = (vmax + vmin) / 2;
  return l;
}

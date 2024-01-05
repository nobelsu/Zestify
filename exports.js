import * as React from "react";

export const NetworkContext = React.createContext();
export default function rgbToHsl(r, g, b) {
  const l = Math.sqrt(r * r * 0.241 + g * g * 0.691 + b * b * 0.068);
  return l;
}

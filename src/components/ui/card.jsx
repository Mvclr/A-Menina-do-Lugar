import React from "react";

export function Card({ children, ...props }) {
  return <div {...props}>{children}</div>;
}
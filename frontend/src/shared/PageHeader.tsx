import React from "react";

type Params = {
  children: React.ReactNode;
}

const styleProps: React.CSSProperties = {
  textAlign: 'center',
}

export function PageHeader({ children }: Params) {
  return <h1 style={styleProps}>{ children }</h1>
}

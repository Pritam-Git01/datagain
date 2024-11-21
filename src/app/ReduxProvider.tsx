"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/index";

interface ProviderProps {
  children: ReactNode;
}
export default function ReduxProvider({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}

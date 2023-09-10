"use client";
import { UserLocation } from "@/interfaces/userLocation.type";
import React, { createContext, useContext } from "react";

type IState = {
  userLocation: UserLocation | undefined;
  sourceCordinates: UserLocation | undefined;
  destinationCordinates: UserLocation | undefined;
};
interface Props {
  children: React.ReactNode;
}
type Context = IState & {
  onChangeState: (state: Partial<IState>) => void;
};
const AppContext = createContext<Context>({
  userLocation: undefined,
  sourceCordinates: undefined,
  destinationCordinates: undefined,
  onChangeState: () => {},
});
export default function AppWrapper({ children }: Props) {
  const [state, setState] = React.useState<IState>({
    userLocation: undefined,
    sourceCordinates: undefined,
    destinationCordinates: undefined,
  });
  //hàm này để thay đổi lại các giá trị trong state gốc
  const onChangeState = (params: Partial<IState>) => {
    setState((s) => ({ ...s, ...params }));
  };

  return (
    <AppContext.Provider value={{ ...state, onChangeState }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

"use client";
import { UserLocation } from "@/interfaces/userLocation.type";
import React, { createContext, useContext } from "react";

type IState = {
  userLocation: UserLocation | undefined;
  sourceCordinates: UserLocation | undefined;
  destinationCordinates: UserLocation | undefined;
  directionData: any;
};
interface Props {
  children: React.ReactNode;
}
type Context = IState & {
  onChangeState: (state: Partial<IState>) => void;
};
const AppContext = createContext<Context>({
  // lưu tọa độ của user
  userLocation: undefined,
  // lưu tọa độ của điểm source được chọn
  sourceCordinates: undefined,
  // lưu tọa độ của điểm destination được chọn
  destinationCordinates: undefined,
  // lưu thông tin các tọa độ điểm đi route được chọn
  directionData: undefined,
  // function set lại state mới cho context
  onChangeState: () => {},
});
export default function AppWrapper({ children }: Props) {
  const [state, setState] = React.useState<IState>({
    userLocation: undefined,
    sourceCordinates: undefined,
    destinationCordinates: undefined,
    directionData: undefined,
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

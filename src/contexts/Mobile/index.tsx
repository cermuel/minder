import React, { createContext, useState } from "react";
import { MobileContextType } from "../../types/context/Mobile/index";

export const MobileContext = createContext<MobileContextType | any>({});

const MobileContextContainer: React.FC = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  return (
    <MobileContext.Provider value={{ isMobile, setIsMobile }}>
      {children}
    </MobileContext.Provider>
  );
};

export default MobileContextContainer;

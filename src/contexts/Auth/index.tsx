import React, { createContext, useState } from "react";
import { AuthContextType } from "../../types/context/Auth/index";

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
});
const AuthContextContainer: React.FC = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const [isAuth, setIsAuth] = useState(true);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;

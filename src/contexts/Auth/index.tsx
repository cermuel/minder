import { createContext, FC, useState } from "react";
import { AuthContextType } from "../../types/context/Auth/index";

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
});
const AuthContextContainer: FC<{ children: JSX.Element }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(true);
  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextContainer;

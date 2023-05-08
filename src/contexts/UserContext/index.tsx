import { createContext, useState, FC } from "react";
import { User, UserContextType } from "../../types/context/User";

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
const UserContextContainer: FC<{ children: JSX.Element }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: "",
    fullName: "",
    email: "",
    isVerified: false,
    photoUrl: "",
  });
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextContainer;

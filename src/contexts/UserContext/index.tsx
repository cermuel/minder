import { createContext, useState, FC } from "react";
import { UserContextType } from "../../types/context/User";

export const UserContext = createContext<UserContextType>({
  username: "",
  fullName: "",
  email: "",
  isVerified: false,
  setEmail: () => {},
  setIsVerified: () => {},
  setUserName: () => {},
  setFullName: () => {},
});
const UserContextContainer: FC<{ children: JSX.Element }> = ({ children }) => {
  const [username, setUserName] = useState<string>("cermuel");
  const [fullName, setFullName] = useState<string>("Samuel Ngene");
  const [email, setEmail] = useState<string>("samuelobasi2005@gmail.com");
  const [isVerified, setIsVerified] = useState<boolean>(true);
  return (
    <UserContext.Provider
      value={{
        username,
        setUserName,
        email,
        setEmail,
        isVerified,
        setIsVerified,
        fullName,
        setFullName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextContainer;

export type UserContextType = {
  fullName: string;
  email: string;
  isVerified: boolean;
  username: string;
  setUserName: (username: string) => void;
  setFullName: (fullName: string) => void;
  setEmail: (email: string) => void;
  setIsVerified: (isVerified: boolean) => void;
};

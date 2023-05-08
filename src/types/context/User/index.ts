export type User = {
  fullName: string | null;
  email: string | null;
  isVerified: boolean | null;
  username: string | null | undefined;
  photoUrl: string | null | undefined;
};

export type UserContextType = {
  user: User | null;
  setUser: (user: User) => void;
};

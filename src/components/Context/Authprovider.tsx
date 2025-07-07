import { createContext, useState } from "react";
import type { ReactNode } from "react";

// Set the type of auth
type AuthData = {
  accessToken?: string;
};

// Set the types for the state and state setter
type AuthContextType = {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<any>>;
};

// Create context that defaults to null if AuthContextType does not exist
const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthData>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

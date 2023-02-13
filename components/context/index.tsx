import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
import InfoAction from "../../actions/Info.action";

export const AuthContext = createContext<any>(undefined);

interface AuthProps {
  children: React.ReactNode;
}

const AuthContextProvider: React.FC<AuthProps> = ({ children }) => {
  const [user, setUser] = React.useState();
  const { data: infos, isLoading } = useQuery(
    ["info-footer"],
    InfoAction.getAll
  );
  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        infos,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

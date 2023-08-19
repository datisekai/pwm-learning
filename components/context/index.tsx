import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
import InfoAction from "../../actions/Info.action";
import { SkuCartModel } from "../../models/Sku.model";
import useLocalStorage from "../hooks/useLocalStorage";

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

  // const [cart, setCart] = React.useState<SkuCartModel[]>([]);

  const [cart, setCart] = useLocalStorage("cart", []);
  // React.useEffect(() => {
  //   setCart(cart);
  // }, [cartLocal]);

  // React.useEffect(() => {
  //   setCartLocal(cart);
  // }, [cart]);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        infos,
        cart,
        setCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

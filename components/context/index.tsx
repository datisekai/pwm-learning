import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
import InfoAction from "../../actions/Info.action";
import { SkuCartModel } from "../../models/Sku.model";
import useLocalStorage from "../hooks/useLocalStorage";
import CartAction from "../../actions/Cart.action";

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
  let dataIDProduct = [-1];
  if (cart.length > 0) {
    dataIDProduct = cart.map((item: any) => item.productId);
  }
  const { data, isFetched } = useQuery(["cart-confirmCart"], () =>
    CartAction.confirmCart(dataIDProduct)
  );
  React.useEffect(() => {
    if (isFetched) {
      if (data?.length > 0) {
        const listConfirmCart = cart
          .map((item2: any) => {
            const matchingItem = data.find(
              (item: any) => item.id === item2.productId
            );
            return matchingItem ? item2 : null;
          })
          .filter((item: any) => item !== null);

        setCart(listConfirmCart);
      }
    }
  }, [isFetched]);
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

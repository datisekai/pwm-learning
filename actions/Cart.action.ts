import axiosClient from "../config/axiosClient";
import { ProductModel } from "../models/Product.model";

interface ICartAction {
  confirmCart: (slug: any[]) => Promise<any>;
}
const CartAction: ICartAction = {
  confirmCart: async (slug: any[]) => {
    const result = await axiosClient.get(`/cart`, { params: { slug } });
    return result.data;
  },
};
export default CartAction;

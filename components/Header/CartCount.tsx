import React from "react";
interface Props {
  quantity: number;
}
const CartCount: React.FC<Props> = ({ quantity }) => {
  return (
    <div className="absolute top-[-4px] text-xs w-[16px] h-[16px] text-center inline bg-primary text-white rounded-full right-[-8px]">
      {quantity || 0}
    </div>
  );
};

export default CartCount;

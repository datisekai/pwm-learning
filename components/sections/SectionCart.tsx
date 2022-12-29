import React from "react";
import { BsChevronDown } from "react-icons/bs";

import { LazyLoadImage } from "react-lazy-load-image-component";
const data = ["/images/1.jpg"];

const SectionCart = () => {
  return (
    <div className="my-5 h-sectioncart">
      <table className="bg-white m-auto my-8">
        <tbody>
          <tr>
            <td className="px-10">
              <LazyLoadImage
                src={"../images/2.jpg"}
                className="w-28 m-auto"
              />
            </td>
            <td className="px-10"><p>DREAM Hoodie - Black</p><p> 1</p></td>
            <td className="px-10">499.000 đ</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SectionCart;

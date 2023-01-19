import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Section2 = () => {
  return (
    <div
      className="mt-4 py-4 h-[250px]"
      style={{
        background: "url(/images/bg-section2.png)",
      }}
    >
      <div className="max-w-[1200px] mx-auto relative">
        <div className="flex justify-center md:justify-start">
          <div className="flex flex-col items-center">
            <h1 className="uppercase text-2xl md:text-3xl font-bold dark:text-black">kim cương</h1>
            <LazyLoadImage effect="blur" src="/images/sep-section2.png" className="mt-2" />
            <p className="max-w-[320px]  text-center mt-4 dark:text-black text-sm font-thin italic">
            &quot; Kim cương, đá quý đáng ngưỡng mộ nhất, là viên đá quý duy nhất có
            chỉ một thành phần. Chỉ có carbon trong cấu trúc hóa học của nó và
            các phân tử cacbon được hình thành theo cách mà chúng liên kết với
            nhau với một thể đối xứng hoàn hảo ở mọi hướng.&quot;
          </p>
          </div>
         
        </div>
        <div className="hidden md:block absolute top-[-45px] right-0">
            <LazyLoadImage effect="blur" src="/images/kc-section2.png"/>
        </div>
      </div>
    </div>
  );
};

export default Section2;

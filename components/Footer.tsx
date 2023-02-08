import { useQuery } from "@tanstack/react-query";
import { BsFillTelephoneFill } from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfoAction from "../actions/Info.action";
import { InfoModel } from "../models/Info.model";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import Link from "next/link";
import { validURL } from "../utils";

interface FooterProps {
  data: InfoModel[];
}

const Footer = () => {
  const { data: infos, isLoading } = useQuery(
    ["info-footer"],
    InfoAction.getAll
  );

  const infoRenders = React.useMemo(() => {
    const info: {
      address: InfoModel[];
      phone: InfoModel[];
      email: InfoModel[];
      lienKetNgoai: InfoModel[];
      lienKetTrong: InfoModel[];
    } = {
      address: [],
      phone: [],
      email: [],
      lienKetNgoai: [],
      lienKetTrong: [],
    };

    if (infos) {
      info.address = infos.filter((item) => item.code === "address");
      info.phone = infos.filter((item) => item.code === "phone");
      info.email = infos.filter((item) => item.code === "email");
      info.lienKetNgoai = infos.filter(
        (item) => item.code === "lien-ket-ngoai"
      );
      info.lienKetTrong = infos.filter(
        (item) => item.code === "lien-ket-trong"
      );
    }

    return info;
  }, [infos]);

  return (
    <div className="pt-4 bg-[#2D3641]">
      <div className="pb-4 max-w-[1200px] md:space-x-4 space-y-4 md:space-y-0 text-white w-[calc(100%-16px)] mx-auto flex flex-col md:flex-row  md:items-start md:justify-between">
        <div className="flex-1">
          <LazyLoadImage
            src="/images/logo.jpg"
            className="rounded-md w-[40%] md:w-[50%]"
          />
          <h3 className="text-lg mt-4">PWM</h3>
          <p className="">Pleased Worth in your Mind</p>
        </div>
        <div className="flex-1">
          <h3 className="uppercase">PWM - Giới thiệu</h3>
          <div className="space-y-2 mt-4">
            {infoRenders.phone.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <BsFillTelephoneFill className="text-[16px]" />
                <span>{item.content}</span>
              </div>
            ))}
            {infoRenders.email.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <IoMdMail className="text-[16px]" />
                <span>{item.content}</span>
              </div>
            ))}
            {infoRenders.address.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div>
                  <FaRegAddressCard className="text-[16px] " />
                </div>
                <span>{item.content}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="uppercase">Liên kết ngoài</h3>
          <div className="space-y-2 mt-4">
            {infoRenders.lienKetNgoai.map((item) => (
              <Link className="block" key={item.id} href={validURL(item.title) ? item.title : '/'}>
                <div className="hover:underline transition-all cursor-pointer">
                  {item.content}
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="uppercase">Liên kết trong</h3>
          <div className="space-y-2 mt-4">
            {infoRenders.lienKetTrong.map((item) => (
              <Link className="block" key={item.id} href={validURL(item.title) ? item.title : '/'}>
                <div className="hover:underline transition-all cursor-pointer">
                  {item.content}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t py-2 text-white text-center text-lg">
        <span className="text-primary">PWM</span> © 2022 All Right Reserved
      </div>
    </div>
  );
};

export default Footer;

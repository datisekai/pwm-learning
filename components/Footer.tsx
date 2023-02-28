import { useQuery } from "@tanstack/react-query";
import {
  BsFillTelephoneFill,
  BsMessenger,
  BsTelephoneFill,
} from "react-icons/bs";
import { IoMdMail } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import InfoAction from "../actions/Info.action";
import { InfoModel } from "../models/Info.model";
import React from "react";
import { FaRegAddressCard } from "react-icons/fa";
import Link from "next/link";
import { validURL } from "../utils";
import { AuthContext } from "./context";
import { SiZalo } from "react-icons/si";

const Footer = () => {
  const { infos }: any = React.useContext(AuthContext);

  const infoRenders = React.useMemo(() => {
    const info: {
      address: InfoModel[];
      phone: InfoModel[];
      email: InfoModel[];
      lienKetNgoai: InfoModel[];
      lienKetTrong: InfoModel[];
      zalo: InfoModel | undefined;
      messenger: InfoModel | undefined;
      phoneTop1:string
    } = {
      address: [],
      phone: [],
      email: [],
      lienKetNgoai: [],
      lienKetTrong: [],
      zalo: undefined,
      messenger: undefined,
      phoneTop1:""
    };

    if (infos) {
      info.address = infos.filter((item: any) => item.code === "address");
      info.phone = infos.filter((item: any) => item.code === "phone");
      info.email = infos.filter((item: any) => item.code === "email");
      info.lienKetNgoai = infos.filter(
        (item: any) => item.code === "lien-ket-ngoai"
      );
      info.lienKetTrong = infos.filter(
        (item: any) => item.code === "lien-ket-trong"
      );

      info.zalo = infos.find((item: any) => item.code === "zalo");
      info.messenger = infos.find((item: any) => item.code === "messenger");

      if(info.phone.length > 0){
        const currentPhone = info.phone[0].content.includes(" -") ? info.phone[0].content.split(' -')[0] : "";
        if(currentPhone){
          info.phoneTop1 = currentPhone;
        }
      }
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
          <div className="mt-2 flex items-center space-x-2">
            {infoRenders.phoneTop1 && <a href={`tel:${infoRenders.phoneTop1}`}>
              <div className="p-1 border hover:bg-primary transition-all hover:cursor-pointer rounded-md">
                <BsTelephoneFill className="text-xl" />
              </div>
            </a>}
            {infoRenders.zalo && <a href={`https://zalo.me/${infoRenders.zalo}`}>
              <div className="p-1 border hover:bg-primary transition-all hover:cursor-pointer rounded-md">
                <SiZalo className="text-xl" />
              </div>
            </a>}
           {infoRenders.messenger &&  <a href={infoRenders.messenger.content}>
              <div className="p-1 border hover:bg-primary transition-all hover:cursor-pointer rounded-md">
                <BsMessenger className="text-xl" />
              </div>
            </a>}
          </div>
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
              <Link
                className="block"
                key={item.id}
                href={validURL(item.title) ? item.title : "/"}
              >
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
              <Link
                className="block"
                key={item.id}
                href={validURL(item.title) ? item.title : "/"}
              >
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

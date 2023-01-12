import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";
import MainLayout from "../components/layouts/MainLayout";
import Slider from "../components/Slider";
import Section1 from "../components/sections/Section1";
import Section2 from "../components/sections/Section2";
import Section3 from "../components/sections/Section3";
import Section5 from "../components/sections/Section5";
import Section6 from "../components/sections/Section6";
import { getCookie } from "cookies-next";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>PWM - Learning</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/fav.png" />
      </Head>
      <MainLayout>
        <div className="pb-10">
          <Slider />
          <Section1 />
          <Section2 />
          <Section3 title="Kim cương" />
          <Section5  />
          <Section6/>
        </div>
      </MainLayout>
    </>
  );
}

import { Inter } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import PopularAction from "../actions/Popular.action";
import SliderAction from "../actions/Slider.action";
import SpeciesAction from "../actions/Species.action";
import MainLayout from "../components/layouts/MainLayout";
import Section1 from "../components/sections/Section1";
import Section2 from "../components/sections/Section2";
import Section3 from "../components/sections/Section3";
import Section6 from "../components/sections/Section6";
import Slider from "../components/Slider";

const inter = Inter({ subsets: ["latin"] });

interface HomeProps {
 
}

const Home: NextPage<HomeProps> = () => {

  const {data:populars, isLoading:isPopularsLoading} = useQuery(['popular'],PopularAction.getAll)
  const {data:species, isLoading:isSpeciesLoading} = useQuery(['species-home'],SpeciesAction.home)
  const {data:sliders, isLoading:isSliderLoading} = useQuery(['slider-home'],SliderAction.getAll)

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
          <Slider data={sliders}/>
          <Section1 data={populars} isLoading={isPopularsLoading}/>
          <Section2 />
          {species?.species.map((item:any, index:number) => species?.products[index].length > 0 && (
            <Section3
              key={index}
              title={item.name}
              dataCategory={item}
              dataProduct={species.products[index]}
            />
          ))}
          {/* <Section5 /> */}
          <Section6 data={species?.species}/>
        </div>
      </MainLayout>
     
    </>
  );
};

export default Home;

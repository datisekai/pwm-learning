import { Inter } from "@next/font/google";
import { useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PopularAction from "../actions/Popular.action";
import SliderAction from "../actions/Slider.action";
import SpeciesAction from "../actions/Species.action";
import UIAction from "../actions/UiHome.action";
import MainLayout from "../components/layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import Meta from "../components/Meta";
import Section1 from "../components/sections/Section1";
import Section2 from "../components/sections/Section2";
import Section3 from "../components/sections/Section3";
import Section6 from "../components/sections/Section6";
import Slider from "../components/Slider";
import { UIModel } from "../models/Ui.model";

const inter = Inter({ subsets: ["latin"] });

// interface HomeProps {
//   data: UIModel[];
// }

const Home = () => {
  const { data, isLoading } = useQuery(["ui-home"], UIAction.getAll);

  const { data: populars, isLoading: isPopularsLoading } = useQuery(
    ["popular"],
    PopularAction.getAll
  );
  const { data: species, isLoading: isSpeciesLoading } = useQuery(
    ["species-home"],
    SpeciesAction.home
  );
  const { data: sliders, isLoading: isSliderLoading } = useQuery(
    ["slider-home"],
    SliderAction.getAll
  );

  return (
    <>
      <Meta description="PWM tự hào là công ty chế tác và bán lẻ trang sức hàng đầu tại châu Á ❤️Khách hàng là trọng tâm ✔️Mua Online nhanh chóng, đơn giản" title="PWM | Trang sức cao cấp" image="/images/logo.png"/>
      <MainLayout>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="pb-10">
            {data?.some(
              (item: any) => item.code === "home;slider" && item.status
            ) && <Slider data={sliders} />}
            {data?.some(
              (item: any) => item.code === "home;popular" && item.status
            ) && <Section1 data={populars} isLoading={isPopularsLoading} />}

            {data?.some(
              (item: any) => item.code === "home;introduce" && item.status
            ) && <Section2 />}
            {data?.some(
              (item: any) => item.code === "home;species" && item.status
            ) &&
              species?.species?.map(
                (item: any, index: number) =>
                  species?.products[index].length > 0 && (
                    <Section3
                      key={index}
                      title={item.name}
                      dataCategory={item}
                      dataProduct={species.products[index]}
                    />
                  )
              )}

            {/* <Section5 /> */}
            {data?.some(
              (item: any) => item.code === "home;bst" && item.status
            ) && <Section6 data={species?.species} />}
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//   const data = await UIAction.getAll();
//   return {
//     props: {
//       data,
//     },
//   };
// };

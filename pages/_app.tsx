import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import NextNProgress from "nextjs-progressbar";
import 'react-lazy-load-image-component/src/effects/blur.css';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextNProgress
        showOnShallow={true}
        color={"#EA8143"}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

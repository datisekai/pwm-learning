import "../styles/globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import NextNProgress from "nextjs-progressbar";
import "react-lazy-load-image-component/src/effects/blur.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../components/context";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import 'photoswipe/dist/photoswipe.css'
import "suneditor/dist/css/suneditor.min.css"


// If you want you can use SCSS instead of css


// import plugins if you need

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

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
      <ThemeProvider enableSystem={true} attribute="class">
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Component {...pageProps} />
            <Toaster />
          </AuthContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}

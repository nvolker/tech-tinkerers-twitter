import { NextPage } from "next";
import { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { Inter } from "next/font/google";

import "../globals.css";
import Head from "next/head";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tech Tinkerers Twitter",
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  return (
    <div style={inter.style}>
      <Head>
        <title>{metadata.title}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

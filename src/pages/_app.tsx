import React, { StrictMode } from "react";
import { ToastContainer } from "react-toastify";

import type { AppProps } from "next/app";

import "@contracter/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        limit={2}
        pauseOnHover
        closeOnClick
        newestOnTop
      />
      <Component {...pageProps} />
    </StrictMode>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
//Burasi react-18 ile geldi normalde react-17 de sadece react-dom olarak import edilirdi
import "./index.css";
import App from "./App";

import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen />
      {/*ReactQueryDevtools sadece developer mode da aktif,production da degil */}
    </QueryClientProvider>
  </React.StrictMode>
);
//React.StrictMode developer ortaminda calisir sadece
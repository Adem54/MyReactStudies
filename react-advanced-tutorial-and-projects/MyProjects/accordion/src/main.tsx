import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {QueryClient,QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools"

const queryClient=new QueryClient();

const root=document.getElementById('root');
ReactDOM.createRoot(root as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen/>
    </QueryClientProvider>
  </React.StrictMode>
)

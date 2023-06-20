import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.scss'

import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";

// react-query
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 30000,
        }
    }
})

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById('app')
)
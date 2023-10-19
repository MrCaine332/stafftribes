import "@styles/globals.scss"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";
import {BrowserRouter} from "react-router-dom";
import store from "@app/store/store";
import {Provider} from "react-redux";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Provider store={store}>
                    <App />
                </Provider>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>
);

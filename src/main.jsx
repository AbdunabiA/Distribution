import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persister, store } from "store/index.js";
import "./main.scss";
import "./i18n";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      retryDelay: (index) => Math.min(1000 * 2 ** index, 30000),
      retry: 2,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persister}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);

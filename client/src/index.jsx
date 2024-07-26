import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";

import App from "./app.jsx";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

/*
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    </ChakraProvider>
  </React.StrictMode>
);
*/

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/records",
    element: <App />,
    children: [
      {
        path: "/records",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/account",
    element: <App />,
    children: [
      {
        path: "/account",
        element: <AccountPanel />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/ticket/form",
    element: <App />,
    children: [
      {
        path: "/ticket/form",
        element: <Ticket />,
      },
    ],
  },
  {
    path: "/ticket/all",
    element: <App />,
    children: [
      {
        path: "/ticket/all",
        element: <TicketList />,
      },
    ],
  },
  {
    path: "/ticket/edit/:id",
    element: <App />,
    children: [
      {
        path: "/ticket/edit/:id",
        element: <Ticket />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);

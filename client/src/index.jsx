import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./app";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Record from "./components/Record/Record";
import RecordList from "./components/Record/RecordList";
import Ticket from "./components/Ticket/Ticket";
import TicketList from "./components/Ticket/TicketList";
import AccountPanel from "./components/Panel/AccountPanel";

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

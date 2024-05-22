import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { RecoilRoot } from "recoil";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Todos from "./components/pages/Todos.tsx";
import SignUp from "./components/pages/SignUp.tsx";
import App from "./App.tsx";
import Meeting from "./components/pages/Meeting.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/todos",
        element: <Todos />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/meeting",
        element: <Meeting />,
      },
    ],
  },
  {
    path: "*",
    element: <>NOT FOUND</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);

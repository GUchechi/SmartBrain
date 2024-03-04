import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "tachyons";
import Login from "./screens/Login/Login.jsx";
import Register from "./screens/Register/Register.jsx";
import Home from "./screens/Home/Home.jsx";
import store from "./store.js";
import { Provider } from "react-redux";

import PrivateRoute from "./components/PrivateRoute.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<ProfileScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

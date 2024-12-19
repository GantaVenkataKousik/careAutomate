// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      {/* Wrapping App with AuthProvider only once here */}
      <Provider store={store}>
        <App />
      </Provider>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();

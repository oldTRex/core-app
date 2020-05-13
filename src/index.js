import "react-app-polyfill/ie9"; // For IE 9-11 support
import "react-app-polyfill/stable";
// import 'react-app-polyfill/ie11'; // For IE 11 support
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import "./index.css";
import "assets/css/style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "contexts/user/user.provider";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import Error from "./components/Error/Error.js";

//css for react toastify
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

ReactDOM.render(
  <Error>
    <UserProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ToastContainer rtl />
    </UserProvider>
  </Error>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
serviceWorker.unregister();

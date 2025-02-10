// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { Store } from "./Store/Store.js";

if (!localStorage.getItem("cart")) {
  localStorage.setItem("cart", JSON.stringify([]));
}

// local storing datas
//  let dataformat = JSON.parse( localStorage.getItem("cart"))
//  console.log( dataformat)

createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
  // </StrictMode>
);

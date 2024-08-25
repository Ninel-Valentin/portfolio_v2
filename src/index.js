import * as React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./pages/App";

sessionStorage.clear();

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
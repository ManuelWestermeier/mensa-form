import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Client from "../../WSNET_Framework/_client/index.js";

//create the qpi conection
window.API = new Client(api);
//deine the user and password global
window.user = localStorage.getItem("mensa-user") || false;
window.password = localStorage.getItem("mensa-password") || false;
//handle close
API.onclose = () => window.location.reload();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);

var isOpen = false,
  setIsOpen = () => false;

//auth
API.onopen = async () => {
  //create user
  if (!user || !password) {
    //get username an password
    const data = await API.get("create_new_user");
    if (!data) window.location.reload();
    //split user and password
    window.user = data.u;
    window.password = data.p;

    localStorage.setItem("mensa-user", user);
    localStorage.setItem("mensa-password", password);
  }

  //check if the user is auth
  if (await API.get("auth", { u: user, p: password })) {
    //set the loadingstate to false
    setIsOpen(true);
    isOpen = true;
  } else {
    if (!confirm("create new user")) return;
    localStorage.removeItem("mensa-user");
    window.location.reload();
  }
};

function Main() {
  [isOpen, setIsOpen] = useState(isOpen);

  return isOpen ? <App /> : <h1 className="container">Loading...</h1>;
}

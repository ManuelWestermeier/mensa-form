import { useEffect, useRef, useState } from "react";
import Select from "./comp/select";

function App() {
  //set the dates you can select
  const [dates, setDates] = useState(["loading..."]);
  //get the dates from th api
  useEffect(() => {
    API.get("dates").then((new_dates) => {
      setDates(new_dates);
    });
  }, []);
  //set the date value
  const dateValue = useRef();
  //set the start-menue you can select
  const [starter, setStarter] = useState(["Apfel", "Banane"]);
  //set the starter value
  const starterValue = useRef();
  //set the main-menue you can select
  const [menues, setMenues] = useState(["Burger", "Schnitzel", "Mensch"]);
  //set the menu value
  const menuValue = useRef();
  //set the dessert-menue you can select
  const [dessert, setDessert] = useState([
    "Kuchen",
    "Frosh 🐸",
    "Pfann Kuchen ",
  ]);
  //set the dessert value
  const dessertValue = useRef();
  //other values
  //set the name
  const nameValue = useRef();
  //set the actual page
  const [page, setPage] = useState("order");
  //set submit error/text
  const [SubmitData, setSubmitData] = useState("loading...");

  async function Order() {
    const orderData = {
      name: nameValue.current.value,
      starter: starterValue.current.value,
      menu: menuValue.current.value,
      dessert: dessertValue.current.value,
      date: dateValue.current.value,
    };

    setPage("submit");

    const data = await API.get("order", orderData);

    setSubmitData(data);
  }

  return (
    <div className="container">
      <br />
      <h1>Bestellen</h1>
      <hr />
      <ul className="nav">
        <li
          onClick={(e) => {
            setPage("order");
          }}
          className="nav-item"
        >
          <a className="nav-link" href="#">
            Bestellen
          </a>
        </li>
        <li
          onClick={(e) => {
            setPage("statistics");
          }}
          className="nav-item"
        >
          <a className="nav-link" href="#">
            Statistik
          </a>
        </li>
        <li
          onClick={(e) => {
            setPage("ideas");
          }}
          className="nav-item"
        >
          <a className="nav-link" href="#">
            Ideen
          </a>
        </li>
      </ul>
      <hr />
      <div
        className="form-group mb5"
        style={{ display: page == "order" ? "" : "none" }}
      >
        <Select _ref={dateValue} data={dates} name="Bestellungs Tage" />
        <hr />
        <Select
          name="Vorspeise Variationen"
          data={starter}
          type="form-control-sm"
          _ref={starterValue}
        />
        <br />
        <Select data={menues} name="Hauptmenü Variationen" _ref={menuValue} />
        <br />
        <Select
          data={dessert}
          name="Nachspeise Variationen"
          type="form-control-sm"
          _ref={dessertValue}
        />
        <hr />
        <p>Name</p>
        <input
          defaultValue={localStorage.getItem("mensa-name") ?? ""}
          type="text"
          ref={nameValue}
          className="form-control"
          placeholder="Name..."
          onInput={(e) => localStorage.setItem("mensa-name", e.target.value)}
        />
        <hr />
        <button
          onClick={(e) => {
            //on submit
            Order();
          }}
          className="btn btn-primary"
        >
          Send
        </button>
      </div>
      <div style={{ display: page == "statistics" ? "" : "none" }}></div>
      <div style={{ display: page == "ideas" ? "" : "none" }}></div>
      <div style={{ display: page == "submit" ? "" : "none" }}>
        <center>
          <p>{SubmitData}</p>
          <button
            onClick={(e) => setPage("statistics")}
            className="btn btn-primary"
          >
            Statistik
          </button>
        </center>
      </div>
      <hr />
    </div>
  );
}

export default App;

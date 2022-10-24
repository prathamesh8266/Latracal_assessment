import { useState, useRef, useEffect } from "react";
// import './App.css'

function App() {
  const [vehicalCount, setVehicleCount] = useState(0);
  const [parkedVehicals, setParkerVehicals] = useState([]);
  const [vehicalNumbers, setVehicalNumbers] = useState([]);
  const [vehicalLogs, setVehicalLogs] = useState([]);

  const formValues = useRef(null);
  const deleteRef = useRef(null);

  useEffect(() => {}, []);

  const vehicalEnterHandler = (state) => {
    state.preventDefault();
    const vehicalNumber = formValues.current["0"].value;
    const driverName = formValues.current["1"].value;
    formValues.current["0"].value = "";
    formValues.current["1"].value = "";

    ///////////////////////////////// check for relaiabe data
    if (vehicalNumber === "" || driverName === "") {
      alert("vehical name and driver name cannot be empty");
      return;
    }
    for (let i = 0; i < vehicalNumbers.length; i++) {
      if (vehicalNumber === vehicalNumbers[i]) {
        alert("cannot enter the same vehical number multiple times");
        return;
      }
    }
    //////////////////////////////////// gettign time
    var d = new Date();
    const time =
      d.getHours() + "h-" + d.getMinutes() + "m-" + d.getSeconds() + "s";

    //////////////////////////////////// setting vehical log for entry
    setVehicalLogs([
      ...vehicalLogs,
      { number: vehicalNumber, enter: time, exit: "" },
    ]);

    //////////////////////////////////// storing vehical numbers
    setVehicalNumbers([...vehicalNumbers, vehicalNumber]);

    //////////////////////////////////// updating parked vehicals
    let vehicalData = { vehicalNumber, driverName };
    let temp = parkedVehicals;
    temp.push(vehicalData);
    setParkerVehicals([...temp]);

    //////////////////////////////////// updating vehical count
    setVehicleCount((count) => count + 1);
  };

  /////////////////////////////////////////////////////////////// display vehical in UI
  const MapOverObject = () => {
    return parkedVehicals.map((keys) => (
      <div
        ref={deleteRef}
        style={{
          display: "flex",
          border: "2px solid black",
          flexDirection: "row",
          width: "400px",
        }}
        key={Math.random() * 10000}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "250px",
          }}
        >
          <p>Vehical Number</p>
          <p>{keys.vehicalNumber}</p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            width: "250px",
          }}
        >
          <p>Driver Name</p>
          <p>{keys.driverName}</p>
        </div>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => {
            let temp = [];
            //////////////////////////////////// updating vehical time logs
            let logs = vehicalLogs;
            for (let i = 0; i < logs.length; i++) {
              if (logs[i].number === keys.vehicalNumber) {
                var d = new Date();
                const time =
                  d.getHours() +
                  "h-" +
                  d.getMinutes() +
                  "m-" +
                  d.getSeconds() +
                  "s";
                logs[i].exit = time;
              }
            }
            setVehicalLogs([...logs]);
            /////////////////////////////////////////////////// updatinf exit vehicals
            for (let i = 0; i < parkedVehicals.length; i++) {
              if (parkedVehicals[i].vehicalNumber === keys.vehicalNumber) {
                continue;
              } else {
                temp.push(parkedVehicals[i]);
              }
            }
            setParkerVehicals([...temp]);
            //////////////////////////////////// updating vehicals dataArray
            temp = [];
            for (let i = 0; i < vehicalNumbers.length; i++) {
              if (vehicalNumbers[i] === keys.vehicalNumber) {
                continue;
              } else {
                temp.push(vehicalNumbers[i]);
              }
            }
            setVehicalNumbers([...temp]);
            //////////////////////////////////// updating vehical count after vehical leaves
            setVehicleCount((count) => count - 1);
          }}
        >
          Exit
        </button>
      </div>
    ));
  };

  const DisplayLogs = () => {
    return vehicalLogs.map((vehical) => (
      <div
        style={{
          display: "flex",
          width: "500px",
          justifyContent: "space-around",
        }}
      >
        <div>
          <p>vehical number</p>
          <p>{vehical.number}</p>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <p>enter</p>
            <p>{vehical.enter}</p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
            }}
          >
            <p>exit</p>
            <p>{vehical.exit}</p>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Parking Garage</h1>
      <p style={{ textAlign: "center" }}>
        Vehicals Parked <b>{vehicalCount}</b>
      </p>
      <form
        ref={formValues}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <input
          style={{ width: "200px", padding: "20px", marginRight: "10px" }}
          type="text"
          name="vehicalNumber"
          placeholder="Vehical Number"
        ></input>
        <input
          style={{ width: "200px", padding: "20px", marginRight: "10px" }}
          type="text"
          name="driverName"
          placeholder="Driver Name"
        ></input>
        <button
          style={{ width: "200px", padding: "20px" }}
          type="submit"
          onClick={vehicalEnterHandler}
        >
          Enter Garage
        </button>
      </form>
      <div>
        <div
          style={{
            marginTop: "20px",
            border: "2px solid white",
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            flexWrap: "wrap",
            flexDirection: "row",
            width: "90vw",
            padding: "20px",
          }}
        >
          {parkedVehicals.length === 0 ? (
            <h2>No vehicals parked</h2>
          ) : (
            <MapOverObject />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h2>Logs</h2>
        <DisplayLogs />
      </div>
    </>
  );
}

export default App;

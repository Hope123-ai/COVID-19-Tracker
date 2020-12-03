import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";


function App(){
const [name,setName] = useState("")
const [list,setList] = useState([])


function changeText(e){
  setName(e.target.value)
}

  const [country,setCountry] = useState("");

  function changeText(e) {
    setName(e.target.value);
  }
  
  function selectCountry(e) {
    fetch(`https://api.covid19api.com/country/${name}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if(response && response.length>0){
        setList(response.sort(function(a,b){
       
          return new Date(b.Date) - new Date(a.Date);
          }).slice(0,10));
          setCountry(response[0].Country)
      }
      
      });
  }
  
  function getDate(date) {
    var arr = date.split("T");
    return arr[0];
  }

  return (
    <div className="App">
      <h1>COVID-19 data tracker</h1>
      <input
        type="text"
        onChange={(e) => changeText(e)}
        className="input_box"
        placeholder="Enter your country name"
        value={name}
      ></input>
      <button onClick={selectCountry} className="changeName">
        Click
      </button>
      <div><h3>Country : {country}</h3></div>
      <div className="container">
        {list.map((item) => {
          return (
            <div className="datas">
            <div className="date">Date:{getDate(item.Date)}</div>
              <div className="active">Active:{item.Active}</div>
              <div className="confirmed">Confirmed:{item.Confirmed}</div>
              <div className="death">Deaths:{item.Deaths}</div>
              <div className="recovered">Recovered: {item.Recovered}</div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

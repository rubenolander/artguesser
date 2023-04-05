import React, { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/437133"
    )
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error(error))
      .finally(() => console.log("done"));
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="App">
      <h1>ARTGUESSER GUESS ART</h1>
      <h2>WHO ART THOU?</h2>
      <div>
        <h2>Title: {data.title}</h2>
        <p>Artist: {data.artistDisplayName}</p>
        <p>Period: {data.period}</p>
        <p>Medium: {data.medium}</p>
        <p>Country: {data.country}</p>
      </div>
    </div>
  );
}

export default App;

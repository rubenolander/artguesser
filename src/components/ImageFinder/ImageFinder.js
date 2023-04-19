import React, { useState, useEffect } from "react";
import ArtistGuesser from "../ArtistGuesser/ArtistGuesser";

function ImageFinder() {
  const [data, setData] = useState([]);
  const [showedPaintings, setShowedPaintings] = useState([]);

  const artistsApis = [
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Vincent%20Van%20Gogh",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Goya",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Henri%20Rousseau",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Thomas%20Cole",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Giovanni%20Bellini",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Andrea%20del%20Sarto",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Gustave%20delCourbet",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=James%20Hamilton",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Asher%20Brown%20Durand",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=James%20Mqneill%20Whistler",
    "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Nicolas%20Poussin",
    ,
  ];

  function getRandomArtist() {
    const randomIndex = Math.floor(Math.random() * artistsApis.length);
    const artistApi = artistsApis[randomIndex];
    return artistApi;
  }

  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {
    fetch(getRandomArtist())
      .then((response) => response.json())
      .then((data) => {
        const { objectIDs } = data;
        const randomIndex = Math.floor(Math.random() * objectIDs.length);
        const randomObjectId = objectIDs[randomIndex];
        console.log(randomObjectId); // will log a random objectId from the array
        return randomObjectId;
      })
      .then((randomObjectId) => {
        return fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`
        ).then((response) => response.json());
      })
      .then((jsonData) => {
        if (
          jsonData.message === "Not a valid object" ||
          jsonData.message === "ObjectID not found" ||
          jsonData.primaryImage === "" ||
          showedPaintings.includes(jsonData.objectID)
        ) {
          fetchData();
        } else {
          setData(jsonData);
          setShowedPaintings((prevState) => [...prevState, jsonData.objectID]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => console.log("done"));
  }

  let correctAnswer = data.artistDisplayName;

  return (
    <div className="App">
      <p>Object id: {data.objectID}</p>
      <h1>ARTGUESSER GUESS ART</h1>
      <h2>WHO ART THOU?</h2>
      <div>
        <h2>Title: {data.title}</h2>
        <p>Artist: {data.artistDisplayName}</p>
        <p>Created: {data.objectDate}</p>
        <p>
          Artist life: {data.artistBeginDate} - {data.artistEndDate}
        </p>

        <p>Medium: {data.medium}</p>
        <p>Artist nationality: {data.artistNationality}</p>
        <img src={data.primaryImage} alt={data.title}></img>
      </div>
      <button onClick={fetchData}>New artist</button>
      <ArtistGuesser correctAnswer={correctAnswer} />
    </div>
  );
}

export default ImageFinder;

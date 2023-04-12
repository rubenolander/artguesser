import React, { useState, useEffect } from "react";
const [data, setData] = useState([]);
const artistsApis = [
  "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Vincent%20Van%20Gogh",
  "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&medium=Paintings&artistOrCulture=true&q=Goya",
];

function getRandomArtist() {
  const randomIndex = Math.floor(Math.random() * artistsApis.length);
  const artistApi = artistsApis[randomIndex];
  return artistApi;
}

useEffect(() => {
  const fetchData = async () => {
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
        );
      })
      .then((response) => response.json())
      .then((jsonData) => setData(jsonData))
      .catch((error) => console.error(error))
      .finally(() => console.log("done"));
  };
  fetchData();
}, []);

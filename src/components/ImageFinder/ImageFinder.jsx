import React, { useState, useEffect } from "react";
import ArtistGuesser from "../ArtistGuesser/ArtistGuesser";
import "./imageFinder.css";
import Button from "../Button/Button";

function ImageFinder() {
  const [data, setData] = useState([]);
  const [showedPaintings, setShowedPaintings] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  // the API's for the artists, ideally we would have liked to randomize from their entire collection, but the API does not have pictures of all the artists works since they are not public. So instead we had to compromise and choose a few artists and all their work that was available.
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
  ];

  //randomize one of the API's

  function getRandomArtist() {
    const randomIndex = Math.floor(Math.random() * artistsApis.length);
    const artistApi = artistsApis[randomIndex];
    return artistApi;
  }

  //fetch data from the API on load
  useEffect(() => {
    fetchData();
  }, []);

  //fetch data from the API
  async function fetchData() {
    try {
      const response = await fetch(getRandomArtist());
      const data = await response.json();
      const { objectIDs } = data;
      const randomIndex = Math.floor(Math.random() * objectIDs.length);
      const randomObjectId = objectIDs[randomIndex];
      const jsonData = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`
      ).then((response) => response.json());

      //if the data is corrupt then fetch again, aswell as if the painting has already been shown to the user
      if (
        jsonData.message === "Not a valid object" ||
        jsonData.message === "ObjectID not found" ||
        jsonData.primaryImage === "" ||
        showedPaintings.includes(jsonData.objectID)
      ) {
        await fetchData();
      } else {
        setData(jsonData);
        setCorrectAnswer(jsonData.artistDisplayName);
        setShowedPaintings((prevState) => [...prevState, jsonData.objectID]);
      }
    } catch (error) {
      console.error(error);
    }
  }
  //hide the labels when you press the play again button
  function hideLabels() {
    const labels = document.querySelector(".labels");
    labels.classList.add("hidden");
  }
  //disable the play again button when you press it
  function disablePlayAgainButton() {
    const playAgainButton = document.querySelector(".playAgainButton");
    playAgainButton.classList.add("hidden");
  }

  //the play again button function
  function handleClick() {
    disablePlayAgainButton();
    fetchData();
    hideLabels();

    //remove the grid items from the previous round
    if (document.querySelectorAll(".gridGuessItems").length > 0) {
      const gridGuessItems = document.querySelectorAll(".gridGuessItems");
      gridGuessItems.forEach((element) => {
        element.remove();
      });
    }
  }
  //the full screen function if you press the image
  function fullScreen() {
    const imageContainer = document.querySelector("img");

    if (document.fullscreenElement === null) {
      imageContainer.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div className="App">
      <div className="primary-container">
        <div className="image-container">
          <img
            src={data.primaryImage}
            alt={data.title}
            onClick={fullScreen}
            className="fullscreen-image"
          ></img>
        </div>
        <Button
          className="playAgainButton hidden"
          onClick={handleClick}
          text="Play again"
        />
        <ArtistGuesser correctAnswer={correctAnswer} />
      </div>
    </div>
  );
}

export default ImageFinder;

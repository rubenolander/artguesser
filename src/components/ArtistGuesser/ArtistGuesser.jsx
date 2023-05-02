import { useState } from "react";
import "./ArtistGuesser.css";
import artistData from "./data";
import Button from "../Button/Button";

const ArtistGuesser = (props) => {
  let [guesses, setGuesses] = useState([Number(0)]);
  let correctArtistId = null;

  artistData.forEach((artist) => {
    if (props.correctAnswer === artist.artistName) {
      correctArtistId = artist.id;
      return correctArtistId;
    }
  });

  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  function guess() {
    setGuesses(Number(guesses) + 1);
    if (guesses >= 0) {
      showLabels();
    }
    const guessValue = document.querySelector("select").value;
    const artistGuessData = artistData[guessValue];
    const artistGuess = artistData[guessValue].artistName;
    const guessGridItems = document.createElement("section");
    guessGridItems.classList.add("gridGuessItems");
    const gridContainer = document.querySelector(".gridContainer");
    gridContainer.append(guessGridItems);
    // skapa divar i en grid med datan från en gubbe
    if (artistGuess === props.correctAnswer) {
      alert("You guessed right!");
      disableGuessButton();
      setGuesses(Number(0));
      enablePlayAgain();
      for (const key in artistGuessData) {
        if (key === "id" || key === "artistName") {
          continue;
        } else {
          createGridItemRight(guessGridItems, artistGuessData[key]);
        }
      }
    } else {
      for (const key in artistGuessData) {
        if (key === "id" || key === "artistName") {
          continue;
        } else if (artistGuessData[key] === artistData[correctArtistId][key]) {
          createGridItemRight(
            guessGridItems,
            artistGuessData[key],
            artistData[correctArtistId][key]
          );
        } else {
          createGridItemWrong(
            guessGridItems,
            artistGuessData[key],
            artistData[correctArtistId][key]
          );
        }
      }
    }
  }

  function createGridItemWrong(guessGridItems, key, correctAnswer) {
    const gridItemWrong = document.createElement("div");
    gridItemWrong.className = "gridItemWrong";
    const pTag = document.createElement("h3");

    if (typeof key === "number") {
      if (key > correctAnswer) {
        pTag.textContent = "\u2193" + key + "\u2193";
      } else if (key < correctAnswer) {
        pTag.textContent = "\u2191" + key + "\u2191";
      }
    } else {
      pTag.textContent = key;
    }

    gridItemWrong.appendChild(pTag);
    guessGridItems.appendChild(gridItemWrong);
  }

  function createGridItemRight(guessGridItems, key) {
    const gridItemRight = document.createElement("div");
    gridItemRight.className = "gridItemRight";
    const pTag = document.createElement("h3");
    pTag.textContent = key;
    gridItemRight.appendChild(pTag);
    guessGridItems.appendChild(gridItemRight);
  }

  //Create an eventlistener that enables the guess button when you select an option
  function enableGuessButton() {
    const guessButton = document.querySelector(".guessButton");
    guessButton.classList.remove("hidden");
  }

  function disableGuessButton() {
    const guessButton = document.querySelector(".guessButton");
    guessButton.classList.add("hidden");
  }

  function enablePlayAgain() {
    const playAgainButton = document.querySelector(".playAgainButton");
    playAgainButton.classList.remove("hidden");
    console.log(playAgainButton);
  }

  function showLabels() {
    const labels = document.querySelector(".labels");
    labels.classList.remove("hidden");
  }

  return (
    <section className="width">
      <select defaultValue="" onChange={enableGuessButton}>
        <option value="" disabled>
          Who art thou?
        </option>
        {options}
      </select>
      <Button className="guessButton hidden" onClick={guess} text="Guess" />

      <h2 className="labels hidden">
        {" "}
        <span>Era</span>
        <span>Year of birth</span>
        <span>Year of death</span>
        <span>Nationality</span>
      </h2>
      <section className="gridContainer"></section>
    </section>
  );
};
export default ArtistGuesser;

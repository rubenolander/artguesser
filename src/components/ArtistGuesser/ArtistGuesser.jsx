import { useState } from "react";
import "./ArtistGuesser.css";
import artistData from "./data";

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
    console.log("guess");
    setGuesses(Number(guesses) + 1);
    if (guesses >= 0) {
      const labels = document.querySelector(".labels");
      labels.classList.remove("hidden");
    }
    const guessValue = document.querySelector("select").value;
    const guessButton = document.querySelector(".guessButton");
    const artistGuessData = artistData[guessValue];
    const artistGuess = artistData[guessValue].artistName;
    const guessGridItems = document.createElement("section");
    guessGridItems.classList.add("gridGuessItems");
    const gridContainer = document.querySelector(".gridContainer");
    gridContainer.append(guessGridItems);
    // skapa divar i en grid med datan från en gubbe
    if (artistGuess === props.correctAnswer) {
      alert("You guessed right!");
      guessButton.disabled = true;
      for (const key in artistGuessData) {
        if (key === "id" || key === "artistName") {
          continue;
        } else {
          createGridItemRight(guessGridItems, artistGuessData[key]);
        }
      }
      // måla divarna och sätt pilar beroende på om svaret är för högt/lågt/nära
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

  //skapar en röd ruta nu när man gissar fel. ska skapa en grid med röda rutor

  function createGridItemWrong(guessGridItems, key, correctAnswer) {
    const gridItemWrong = document.createElement("div");
    gridItemWrong.className = "gridItemWrong";
    const pTag = document.createElement("p");

    if (typeof key === "number") {
      if (key > correctAnswer) {
        pTag.textContent = key + "v";
      } else if (key < correctAnswer) {
        pTag.textContent = key + "^";
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
    const pTag = document.createElement("p");
    pTag.textContent = key;
    gridItemRight.appendChild(pTag);
    guessGridItems.appendChild(gridItemRight);
  }

  //i want to create an eventlisterner that enables the guess button when you select an option
  function enableGuessButton() {
    const guessButton = document.querySelector(".guessButton");
    guessButton.classList.remove("hidden");
  }

  return (
    <section className="width">
      <select defaultValue="" onChange={enableGuessButton}>
        <option value="" disabled>
          Who art thou?
        </option>
        {options}
      </select>
      <button className="guessButton hidden" onClick={guess}>
        Guess
      </button>
      <h2 className="labels hidden">
        {" "}
        <span>Era</span>
        <span>Year of birth</span>
        <span>Year of death</span>
        <span>Nationality</span>
      </h2>
      <section className="gridContainer"></section>
      <h2 className="guessAmount">Guesses: {guesses}</h2>
      <h2>Answer: {props.correctAnswer}</h2>
    </section>
  );
};
export default ArtistGuesser;

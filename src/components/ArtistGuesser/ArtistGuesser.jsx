import { useState } from "react";
import "./ArtistGuesser.css";
import artistData from "./data";
import Button from "../Button/Button";

const ArtistGuesser = (props) => {
  let [guesses, setGuesses] = useState([Number(0)]);
  let correctArtistId = null;

  //from the correctanswer from the API find the correct artist id from the data.js file
  artistData.forEach((artist) => {
    if (props.correctAnswer === artist.artistName) {
      correctArtistId = artist.id;
      return correctArtistId;
    }
  });
  //create the options for the select element
  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  //function for the guess artist
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
    gridContainer.prepend(guessGridItems);
    // if you guess right enable the playagain button reset the guesses and create the grid items for the right answer
    if (artistGuess === props.correctAnswer) {
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
      //if you guess wrong create the grid items for the wrong answer
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
  //create the grid items for the wrong answers
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
  //create the grid items for the correct answer
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
  //Disable it again when you have guessed right
  function disableGuessButton() {
    const guessButton = document.querySelector(".guessButton");
    guessButton.classList.add("hidden");
  }
  //when you guess right, enable the play again button
  function enablePlayAgain() {
    const playAgainButton = document.querySelector(".playAgainButton");
    playAgainButton.classList.remove("hidden");
  }
  //show the labels when you have guessed
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

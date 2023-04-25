import "./ArtistGuesser.css";
const ArtistGuesser = (props) => {
  const artistData = [
    {
      id: 0,
      artistName: "Vincent van Gogh",
      era: "Expressionism",
      born: 1853,
      died: 1890,
      nationality: "Dutch",
    },
    {
      id: 1,
      artistName: "Goya (Francisco de Goya y Lucientes)",
      era: "Romanticism",
      born: 1746,
      died: 1828,
      nationality: "Spanish",
    },
    {
      id: 2,
      artistName: "Henri Rousseau (le Douanier)",
      era: "Romanticism",
      born: 1844,
      died: 1910,
      nationality: "French",
    },
    {
      id: 3,
      artistName: "Thomas Cole",
      era: "Romanticism",
      born: 1801,
      died: 1848,
      nationality: "English/American",
    },
    {
      id: 4,
      artistName: "Giovanni Bellini",
      era: "Renaissance",
      born: 1430,
      died: 1516,
      nationality: "Italian",
    },
    {
      id: 5,
      artistName: "Andrea del Sarto (Andrea d'Agnolo)",
      era: "Renaissance",
      born: 1486,
      died: 1530,
      nationality: "Italian",
    },
    {
      id: 6,
      artistName: "Gustave Courbet",
      era: "Realism",
      born: 1819,
      died: 1877,
      nationality: "French",
    },
    {
      id: 7,
      artistName: "James Hamilton",
      era: "Realism",
      born: 1808,
      died: 1870,
      nationality: "Irish",
    },
    {
      id: 8,
      artistName: "Asher Brown Durand",
      era: "Romanticism",
      born: 1796,
      died: 1886,
      nationality: "American",
    },
    {
      id: 9,
      artistName: "James McNeill Whistler",
      era: "Impressionism",
      born: 1834,
      died: 1903,
      nationality: "American",
    },
    {
      id: 10,
      artistName: "Nicolas Poussin",
      era: "Baroque",
      born: 1594,
      died: 1665,
      nationality: "French",
    },
  ];

  let correctArtistId = null;
  artistData.forEach((artist) => {
    if (props.correctAnswer === artist.artistName) {
      correctArtistId = artist.id;
      console.log(correctArtistId); // REMOVE ON BUILD
      console.log(artistData[correctArtistId]); // -||-
      return correctArtistId;
    }
  });

  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  let guesses = null;

  function guess() {
    const guess = document.querySelector("select").value;
    const artistGuessData = artistData[guess];
    const artistGuess = artistData[guess].artistName;
    const guessGridItems = document.createElement("section");
    guessGridItems.classList.add("gridGuessItems");
    const gridContainer = document.querySelector(".gridContainer");
    gridContainer.append(guessGridItems);
    // skapa divar i en grid med datan från en gubbe
    guesses++;
    console.log(artistGuess);
    if (artistGuess === props.correctAnswer) {
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
          // createGridItemRight(guessGridItems);
          createGridItemRight(
            guessGridItems,
            artistGuessData[key],
            artistData[correctArtistId][key]
          );
          console.log(artistGuessData[key], artistData[correctArtistId][key]);
        } else {
          // createGridItemWrong(guessGridItems);
          createGridItemWrong(
            guessGridItems,
            artistGuessData[key],
            artistData[correctArtistId][key]
          );
          console.log(
            "Guess " +
              artistGuessData[key] +
              " Right answer " +
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
    console.log(key);

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

  return (
    <section>
      <select>
        <option value="" disabled selected>
          Who art thou?
        </option>
        {options}
      </select>
      <button onClick={guess}>Guess</button>
      <h2>Era, birthyear, date of death, nationality</h2>
      <section className="gridContainer"></section>
      <h2>Answer: {props.correctAnswer}</h2>
    </section>
  );
};
export default ArtistGuesser;

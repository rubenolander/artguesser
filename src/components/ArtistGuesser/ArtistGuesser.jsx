import { createElement } from "react";
import ImageFinder from "../ImageFinder/ImageFinder";
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
    },{
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
  },
  {
    id: 8,
    artistName: "Asher Brown Durand",
    era: "Romanticism",
    born: 1796,
    died: 1886,
  },
  {
    id: 9,
    artistName: "James McNeill Whistler",
    era: "Impressionism",
    born: 1834,
    died: 1903,
  },
  {
    id: 10,
    artistName: "Nicolas Poussin",
    era: "Baroque",
    born: 1594,
    died: 1665,
  },

  ];

  let correctArtistId = null;
  artistData.forEach((artist) => {
    if (props.correctAnswer === artist.artistName) {
      correctArtistId = artist.id;
      console.log(correctArtistId);               // REMOVE ON BUILD
      console.log(artistData[correctArtistId]);   // -||-
      return correctArtistId;
    }
  });

  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  function guess() {
    const guess = document.querySelector("select").value;
    const artistGuess = artistData[guess].artistName;
    const divGrid = document.querySelector('.div-grid');
    // skapa divar i en grid med datan från en gubbe
    

    console.log(artistGuess);
    if (artistGuess === props.correctAnswer) {
      alert("Correct!");
      // måla divarna och sätt pilar beroende på om svaret är för högt/lågt/nära
    } else {
      alert("Incorrect!");
    }
  }

  function createGridItem()
  {

  }

  return (
    <section>
      <select>
      <option value="" disabled selected>Who art thou?</option>
        {options}
        </select>
      <button onClick={guess}>Guess</button>
      <section className="div-grid"></section>
      <h2>Answer: {props.correctAnswer}</h2>
    </section>
  );
};
export default ArtistGuesser;
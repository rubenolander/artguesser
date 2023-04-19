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
    },
  ];

  let correctArtistId = 1000;
  artistData.forEach((artist) => {
    if (props.correctAnswer === artist.artistName) {
      correctArtistId = artist.id;
      return correctArtistId;
    }
  });

  console.log(correctArtistId);
  console.log(artistData[correctArtistId]);

  //måste det verkligen vara en map här? Kan man inte ta den ordinarie arrayen och skapa en option för varje objekt i arrayen?
  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  function guess() {
    const guess = document.querySelector("select").value;
    const artistGuess = artistData[guess].artistName;
    console.log(artistGuess);
    if (artistGuess === props.correctAnswer) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  }

  return (
    <section>
      <select>{options}</select>
      <button onClick={guess}>Guess</button>
      <h2>Answer: {props.correctAnswer}</h2>
    </section>
  );
};
export default ArtistGuesser;

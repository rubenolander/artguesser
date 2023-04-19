import ImageFinder from "../ImageFinder/ImageFinder";
const ArtistGuesser = (props) => {
  const artistData = [
    {
      id: 0,
      artistName: "Vincent Van Gogh",
      era: "Expressionism",
      born: 1853,
      died: 1890,
    },
    {
      id: 1,
      artistName: "Goya (Francisco de Goya y Lucientes)",
      era: "Romanticism",
      born: 1746,
      died: 1828,
    },
    {
      id: 2,
      artistName: "Henri Rousseau (le Douanier)",
      era: "Romanticism",
      born: 1844,
      died: 1910,
    },
  ];

  const options = artistData.map((artist) => (
    <option key={artist.id} value={artist.id}>
      {artist.artistName}
    </option>
  ));

  return (
    <section>
      <select>{options}</select>
      <button>Guess</button>
      <h2>Answer: {props.artistName}</h2>
    </section>
  );
};
export default ArtistGuesser;

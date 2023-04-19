function ArtistGuesser() {
  const artistData = [
    {
      id: 0,
      artistName: "Vincent Van Gogh",
      era: "Expressionism",
      born: 1853,
      died: 1890,
    },
    { id: 1, artistName: "Goya", era: "Romanticism", born: 1746, died: 1828 },
    {
      id: 2,
      artistName: "Rousseau",
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
    </section>
  );
}
export default ArtistGuesser;

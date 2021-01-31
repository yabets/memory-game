export const generateTiles = (n = 16) => {
  const tiles = [];
  for (let i = 0; i < n; i++) {
    tiles.push(tile(values[i]));
  }
  return shuffle(tiles);
};

const values = [
  "bone",
  "air-freshener",
  "anchor",
  "archway",
  "bone",
  "air-freshener",
  "baby",
  "binoculars",
  "bone",
  "air-freshener",
  "anchor",
  "archway",
  "bone",
  "air-freshener",
  "baby",
  "binoculars",
];

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

const tile = (value) => ({
  status: "down",
  value: value,
});

// A seeded, shared grid keeps adjacent shard edges identical and the effect repeatable.
export function createShards(columns = 11, rows = 4, seed = 37) {
  let state = seed;
  const random = () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
  const points = Array.from({ length: rows + 1 }, (_, row) =>
    Array.from({ length: columns + 1 }, (_, column) => [
      (column + (column > 0 && column < columns ? (random() - 0.5) * 0.56 : 0)) / columns * 100,
      (row + (row > 0 && row < rows ? (random() - 0.5) * 0.56 : 0)) / rows * 100,
    ]),
  );
  const shards = [];
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      const a = points[row][column], b = points[row][column + 1];
      const c = points[row + 1][column], d = points[row + 1][column + 1];
      const triangles = random() > 0.5 ? [[a, b, d], [a, d, c]] : [[a, b, c], [b, d, c]];
      triangles.forEach(vertices => shards.push({
        id: shards.length,
        vertices,
        cx: vertices.reduce((total, p) => total + p[0], 0) / 3,
        cy: vertices.reduce((total, p) => total + p[1], 0) / 3,
        clipPath: `polygon(${vertices.map(p => `${p[0]}% ${p[1]}%`).join(', ')})`,
        spin: (random() - 0.5) * 2,
        spread: 0.65 + random() * 0.7,
        delay: random() * 0.14,
      }));
    }
  }
  return shards;
}

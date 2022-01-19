<!-- deno-fmt-ignore-file -->

React Isometric Tilemap
=======================

[![Latest version][Tag badge]][Deno module]
[![LGPL 3.0][License badge]](./LICENSE)
[![Deno Doc (API references)][Deno Doc badge]][Deno Doc]

A library for displaying tilemaps and handling events on it.

It was [originally written by Ramiro Rojo][1] in JavaScript.  This project
forks it and then rewrote it in TypeScript and let it work on Deno and Aleph.js.

[Tag badge]: https://img.shields.io/github/v/tag/boscohyun/react-isometric-tilemap
[Deno module]: https://deno.land/x/react-isometric-tilemap
[License badge]: https://img.shields.io/github/license/boscohyun/react-isometric-tilemap
[Deno Doc]: https://doc.deno.land/https://deno.land/x/react-isometric-tilemap/mod.ts
[Deno Doc badge]: https://img.shields.io/badge/api-deno%20doc-blue
[1]: https://github.com/holywyvern/react-isometric-tilemap


How to use
----------

Import this library in your code:

~~~~ typescript
// The map is the basic container, the tile is each square
import IsometricMap, {
  IsometricTile
} from "https://deno.land/x/react-isometric-tilemap/mod.ts";
~~~~

Now you can create your own map with it:

~~~~ typescript
const MyMap = () => {
  <IsometricMap mapWidth={1} mapHeight={1} tileSize={32} slabSize={8}>
    <IsometricTile x={0} y={0} z={3} />
  </IsometricMap>;
};
~~~~

Please refer for the documentation for more details about the components
provided.
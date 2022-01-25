<!-- deno-fmt-ignore-file -->

React Isometric Tilemap
=======================

[![Latest version][Tag badge]][Deno module]
[![LGPL 3.0][License badge]](./LICENSE)
[![Deno Doc (API references)][Deno Doc badge]][Deno Doc]
[![GitHub Actions][GitHub Actions status badge]][GitHub Actions]

A library for displaying tilemaps and handling events on it.  See also
the [demo app] first!

It was [originally written by Ramiro Rojo][1] in JavaScript.  This project
forked it and then rewrote it in TypeScript and let it work on Deno & Aleph.js.

[Tag badge]: https://img.shields.io/github/v/tag/boscohyun/react-isometric-tilemap
[Deno module]: https://deno.land/x/react_isometric_tilemap
[License badge]: https://img.shields.io/github/license/boscohyun/react-isometric-tilemap
[Deno Doc]: https://doc.deno.land/https://deno.land/x/react_isometric_tilemap/mod.ts
[Deno Doc badge]: https://img.shields.io/badge/api-deno%20doc-blue
[GitHub Actions]: https://github.com/boscohyun/react-isometric-tilemap/actions/workflows/build.yaml
[GitHub Actions status badge]: https://github.com/boscohyun/react-isometric-tilemap/actions/workflows/build.yaml/badge.svg
[demo app]: https://boscohyun.github.io/react-isometric-tilemap/
[1]: https://github.com/holywyvern/react-isometric-tilemap


How to use
----------

Import this library in your code:

~~~~ typescript
// The map is the basic container, the tile is each square
import IsometricMap, {
  IsometricTile
} from "https://deno.land/x/react_isometric_tilemap/mod.ts";
~~~~

Now you can create your own map with it:

~~~~ typescript
const MyMap = () => {
  <IsometricMap mapWidth={1} mapHeight={1} tileSize={32} slabSize={8}>
    <IsometricTile x={0} y={0} z={3} />
  </IsometricMap>;
};
~~~~

Please refer for the [documentation][Deno Doc] for more details about
the components provided.  See also the source code of the [demo app]
in *demo/* directory.


Changelog
---------

### Version 2.0.0

Released on January 26, 2022.

This release is equivalent 0.2.0, but purposes to *overwrite*
the mis-tagged previous releases: 0.2.0 and 1.0.0.

### Version 0.2.0

Released on January 25, 2022.

 -  Added `debug?: boolean` attribute to `IsometricTileProps`.

### Version 0.1.0

Initial release.  Released on January 20, 2022.
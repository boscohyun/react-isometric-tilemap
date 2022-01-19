import React from "https://esm.sh/react@17.0.2";
import { useRouter } from "https://deno.land/x/aleph@v0.3.0-beta.19/framework/react/mod.ts";
import { IsometricMap, IsometricObject, IsometricTile } from "../lib/mod.ts";
import "./index.css";

const mapWidth = 10;
const mapHeight = 10;

const heights = [
  7,
  7,
  5,
  4,
  4,
  3,
  2,
  3,
  2,
  2,
  7,
  7,
  5,
  4,
  4,
  3,
  2,
  3,
  2,
  2,
  7,
  7,
  5,
  4,
  4,
  3,
  2,
  3,
  2,
  2,
  7,
  7,
  5,
  4,
  4,
  3,
  2,
  3,
  2,
  2,
  7,
  7,
  5,
  4,
  4,
  3,
  2,
  3,
  2,
  2,
  5,
  5,
  5,
  4,
  3,
  3,
  2,
  3,
  2,
  2,
  5,
  5,
  4,
  4,
  3,
  3,
  2,
  3,
  1,
  1,
  5,
  5,
  3,
  3,
  3,
  3,
  2,
  3,
  1,
  1,
  5,
  5,
  3,
  3,
  3,
  3,
  2,
  3,
  1,
  1,
  4,
  0,
  0,
  4,
  3,
  3,
  2,
  3,
  1,
  0,
];

const App: React.FC = () => {
  const router = useRouter();
  const basePath = (router.basePath ?? "/").replace(/\/$/, "");
  const textures1 = {
    floor: basePath + "/floor.png",
    leftWall: {
      top: basePath + "/left-top.png",
      bottom: basePath + "/left-bottom.png",
      middle: basePath + "/left-middle.png",
    },
    rightWall: {
      top: basePath + "/right-top.png",
      bottom: basePath + "/right-bottom.png",
      middle: basePath + "/right-middle.png",
    },
  };
  return (
    <div className="app">
      <nav>
        <h1>React Isometric Maps</h1>
        <ul>
          <li>
            <a
              href="https://github.com/boscohyun/react-isometric-tilemap"
              target="_blank"
              rel="noopener"
            >
              GitHub
            </a>
          </li>
        </ul>
      </nav>
      <div className="container">
        <IsometricMap
          mapWidth={mapWidth}
          mapHeight={mapHeight}
          tileSize={48}
          slabSize={12}
          margin={{ top: 12, left: 12, right: 12, bottom: 12 }}
          offsetY={100}
        >
          {heights.map((z, index) => {
            if (z === 0) {
              return null;
            }
            const x = index % mapWidth;
            const y = Math.floor(index / mapWidth);
            const result = [
              <IsometricTile
                key={`tile${index}`}
                x={x}
                y={y}
                z={z}
                frames={[textures1]}
              />,
            ];
            if (Math.random() < 0.1) {
              result.push(
                <IsometricObject
                  key={`object${index}`}
                  x={x}
                  y={y}
                  z={z}
                  width={85}
                  height={186}
                  frames={[basePath + "/tree.png"]}
                  active
                />,
              );
            }
            return result;
          })}
        </IsometricMap>
      </div>
    </div>
  );
};

export default App;

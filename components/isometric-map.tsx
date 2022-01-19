import React, { MouseEventHandler } from "https://esm.sh/react@17.0.2";
import IsometricMapEvent from "../events/isometric-map-event.ts";
import "./isometric-map.css";

export interface IsometricMapProps {
  /** The width of the map, in tiles */
  readonly mapWidth: number;
  /** The height of the map, in tiles */
  readonly mapHeight: number;
  /**
   * The size of the tile. It represents the width of the horizontal diagonal
   * and double the size of the vertical diagonal */
  readonly tileSize: number;
  /** The size of a tile lifting per it's z height */
  readonly slabSize: number;
  /** A CSS unit for dimensions, usually 1px */
  readonly sizeUnit?: React.CSSProperties["width"];
  /**
   * The margin of the tile, this margins are extra space drawed by the tiles than you
   * can use to apply some details into the tile, and make maps look less squared
   */
  readonly margin?: {
    /** The top margin, used by the floor */
    readonly top: number;
    /** The bottom margin, used by the floor and the bottom part of the wall  */
    readonly bottom: number;
    /** The left margin, used by everything */
    readonly left: number;
    /** The right margin, used by everything */
    readonly right: number;
  };
  /** An offset to move the map down, usefull to show the height properly */
  readonly offsetY?: number;
  /** Callback for users interacting with the map */
  readonly onMouseAction?: (
    event: IsometricMapEvent<IsometricMapProps>,
  ) => void;
  /** Callback called when you press the mouse down */
  readonly onMouseDown?: (event: IsometricMapEvent<IsometricMapProps>) => void;
  /** Callback called when you press the mouse up */
  readonly onMouseUp?: (event: IsometricMapEvent<IsometricMapProps>) => void;
  /** Callback called when the mouse enters the map */
  readonly onMouseEnter?: (event: IsometricMapEvent<IsometricMapProps>) => void;
  /** Callback called when the mouse exists the map */
  readonly onMouseLeave?: (event: IsometricMapEvent<IsometricMapProps>) => void;
}

interface IsometricMapCSSProperties extends React.CSSProperties {
  ["--map-width"]: number;
  ["--map-height"]: number;
  ["--tile-size"]: number;
  ["--slab-size"]: number;
  ["--size-unit"]: React.CSSProperties["width"];
  ["--margin-top"]: number;
  ["--margin-bottom"]: number;
  ["--margin-left"]: number;
  ["--margin-right"]: number;
  ["--map-max-dimension"]: number;
  ["--map-offset-y"]: number;
}

/**
 * An isometric map is a container for isometric objects and isometric tiles.
 * It provides basic functionallity
 *
 * @version 1.0.0
 * @since 1.0.0
 * @author [Ramiro Rojo](https://github.com/holywyvern)
 */
export const IsometricMap: React.FC<IsometricMapProps> = (props) => {
  const {
    children,
    mapWidth,
    mapHeight,
    tileSize,
    slabSize,
  } = props;
  const sizeUnit = props.sizeUnit ?? "1px";
  const offsetY = props.offsetY ?? 0;
  const margin = props.margin ?? {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  const vars: IsometricMapCSSProperties = {
    "--map-width": mapWidth,
    "--map-height": mapHeight,
    "--tile-size": tileSize,
    "--slab-size": slabSize,
    "--size-unit": sizeUnit,
    "--margin-top": margin.top,
    "--margin-bottom": margin.bottom,
    "--margin-left": margin.left,
    "--margin-right": margin.right,
    "--map-max-dimension": Math.max(mapWidth, mapHeight),
    "--map-offset-y": offsetY,
  };

  const onMouseDown: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onMouseDown ? undefined : (e) => {
      if (e.button !== 0) return;
      const event = new IsometricMapEvent(props, -1, -1, "down", "map");
      if (props.onMouseAction != null) props.onMouseAction(event);
      if (props.onMouseDown != null) props.onMouseDown(event);
    };

  const onMouseUp: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onMouseUp ? undefined : (e) => {
      if (e.button !== 0) return;
      const event = new IsometricMapEvent(props, -1, -1, "up", "map");
      if (props.onMouseAction != null) props.onMouseAction(event);
      if (props.onMouseUp != null) props.onMouseUp(event);
    };

  const onMouseEnter: MouseEventHandler | undefined =
    props.onMouseEnter == null && props.onMouseAction == null
      ? undefined
      : (e) => {
        if (e.button !== 0) return;
        const event = new IsometricMapEvent(props, -1, -1, "enter", "map");
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onMouseEnter != null) props.onMouseEnter(event);
      };

  const onMouseLeave: MouseEventHandler | undefined =
    props.onMouseLeave == null && props.onMouseAction == null
      ? undefined
      : (e) => {
        if (e.button !== 0) return;
        const event = new IsometricMapEvent(props, -1, -1, "leave", "map");
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onMouseLeave != null) props.onMouseLeave(event);
      };

  return (
    <div
      className="react-isometric-map-wrapper"
      style={vars}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="react-isometric-map">{children}</div>
    </div>
  );
};

export default IsometricMap;

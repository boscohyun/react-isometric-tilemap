import React, { MouseEventHandler } from "https://esm.sh/react@17.0.2";
import AnimatedTexture from "./animated-texture.tsx";
import IsometricMapEvent from "../events/isometric-map-event.ts";
import "./isometric-tile.css";

export interface TileFrameWall {
  /** The top part of the wall */
  readonly top: string;
  /** The middle part of the texture (repeats vertically) */
  readonly middle: string;
  /** The bottom part of the texture */
  readonly bottom: string;
}

export interface TileFrame {
  /** The floor texture name */
  readonly floor: string;
  /** The left wall textures */
  readonly leftWall: TileFrameWall;
  /** The right wall textures */
  readonly rightWall: TileFrameWall;
}

export interface IsometricTileProps {
  /** The x position of the tile, from 0 to width - 1 */
  readonly x: number;
  /** The y position of the tile, from 0 to height - 1 */
  readonly y: number;
  /** The height of the tile, it will be "lifted" as map slab size * z */
  readonly z?: number;

  /** The height of the left wall, by default it is the same as the z value */
  readonly leftZ?: number;
  /* The height of the right wall, by default it is the same as the z value */
  readonly rightZ?: number;

  /** A list of frames for each part of the tile */
  readonly frames?: TileFrame[];

  /** An intervall in milliseconds on wich each frame changes */
  readonly delay?: number;

  /** Extra css classes added into the object */
  readonly className?: string;

  /** An style object of CSS propertyes */
  readonly style?: React.CSSProperties;

  /** Event used to catch all mouse events */
  readonly onMouseAction?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Click event for the entire tile */
  readonly onClick?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Click event for only the floor */
  readonly onFloorClick?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Click event for any wall */
  readonly onWallClick?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Click event for left wall */
  readonly onLeftWallClick?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Click event for right wall */
  readonly onRightWallClick?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;

  /** Callback called when the mouse enters any part of the tile */
  readonly onEnter?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Callback called when the mouse enters the floor of the tile */
  readonly onFloorEnter?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Callback called when the mouse enters any wall of the tile */
  readonly onWallEnter?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Callback called when the mouse enters the left wall of the tile */
  readonly onLeftWallEnter?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Callback called when the mouse enters the right of the tile */
  readonly onRightWallEnter?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;

  /** Callback called when the mouse exits any part of the tile */
  readonly onLeave?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Callback called when the mouse exits the floor of the tile */
  readonly onFloorLeave?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Callback called when the mouse exits any wall of the tile */
  readonly onWallLeave?: (event: IsometricMapEvent<IsometricTileProps>) => void;
  /** Callback called when the mouse exits the left wall of the tile */
  readonly onLeftWallLeave?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
  /** Callback called when the mouse exits the right of the tile */
  readonly onRightWallLeave?: (
    event: IsometricMapEvent<IsometricTileProps>,
  ) => void;
}

interface IsometricTileCSSProperties extends React.CSSProperties {
  ["--x"]: number;
  ["--y"]: number;
  ["--z"]?: number;
  ["--left-z"]: number;
  ["--right-z"]: number;
}

function renderTopAndBottomWalls(
  frames: TileFrame[] | undefined,
  delay: number,
  mapper: ((frame: TileFrame) => TileFrameWall),
  height: number,
  prefix: string,
): React.ReactElement[] | undefined {
  if (!frames) return;
  const results: React.ReactElement[] = [];
  const textures: TileFrameWall[] = frames.map(mapper);
  if (height > 0) {
    results.push(
      <AnimatedTexture
        key={`${prefix}-top`}
        frames={textures.map((t) => t.top)}
        delay={delay}
        className={`textures top ${prefix}`}
      />,
      <AnimatedTexture
        key={`${prefix}-bottom`}
        frames={textures.map((t) => t.bottom)}
        delay={delay}
        className={`textures bottom ${prefix}`}
      />,
    );
  }
  return results;
}

function renderMiddleWalls(
  frames: TileFrame[] | undefined,
  delay: number,
  mapper: (frame: TileFrame) => string,
  height: number,
  prefix: string,
): React.ReactElement[] | undefined {
  if (!frames) return;
  const textures = frames.map(mapper);
  const result = [];
  const h = height;
  for (let i = 1; i < h; ++i) {
    result.push(
      <AnimatedTexture
        key={`${prefix}-middle-wall-${i}`}
        frames={textures}
        delay={delay}
        className={`textures middle ${prefix}`}
        style={{ "--wall-index": i } as React.CSSProperties}
      />,
    );
  }
  return result;
}

/*
 * A tile is a square on the map. It is composed of a floor and optionally
 * a right and a left walls.
 * The tiles are the floor of your map, so it can be grass, dirt or water, for example.
 */
export const IsometricTile: React.FC<IsometricTileProps> = (props) => {
  const {
    x,
    y,
    leftZ,
    rightZ,
    className,
    frames,
    style,
  } = props;
  const z = props.z ?? 0;
  const delay = props.delay ?? 0;
  const lz = leftZ == null ? z : leftZ;
  const rz = rightZ == null ? z : rightZ;
  const vars: IsometricTileCSSProperties = {
    ...(style || {}),
    "--x": x,
    "--y": y,
    "--z": z,
    "--left-z": lz,
    "--right-z": rz,
  };
  const classes: string[] = ["react-isometric-tile"];
  if (className) classes.push(className);

  const onFloorClick: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onClick == null &&
      props.onFloorClick == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "click", "floor");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onClick != null) props.onClick(event);
        if (props.onFloorClick != null) props.onFloorClick(event);
      };

  const onLeftWallClick: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onClick == null &&
      props.onWallClick == null && props.onLeftWallClick == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "click", "left-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onClick != null) props.onClick(event);
        if (props.onWallClick != null) props.onWallClick(event);
        if (props.onLeftWallClick != null) props.onLeftWallClick(event);
      };

  const onRightWallClick: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onClick == null &&
      props.onWallClick == null && props.onRightWallClick == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "click", "right-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onClick != null) props.onClick(event);
        if (props.onWallClick != null) props.onWallClick(event);
        if (props.onRightWallClick != null) props.onRightWallClick(event);
      };

  const onFloorMouseEnter: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onEnter == null &&
      props.onFloorEnter == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "enter", "floor");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onEnter != null) props.onEnter(event);
        if (props.onFloorEnter != null) props.onFloorEnter(event);
      };

  const onFloorMouseLeave: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onLeave == null &&
      props.onFloorLeave == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "leave", "floor");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onLeave != null) props.onLeave(event);
        if (props.onFloorLeave != null) props.onFloorLeave(event);
      };

  const onLeftWallEnter: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onEnter == null &&
      props.onWallEnter == null && props.onLeftWallEnter == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "enter", "left-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onEnter != null) props.onEnter(event);
        if (props.onWallEnter != null) props.onWallEnter(event);
        if (props.onLeftWallEnter != null) props.onLeftWallEnter(event);
      };

  const onLeftWallLeave: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onLeave == null &&
      props.onWallLeave == null && props.onLeftWallLeave == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "leave", "left-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onLeave != null) props.onLeave(event);
        if (props.onWallLeave != null) props.onWallLeave(event);
        if (props.onLeftWallLeave != null) props.onLeftWallLeave(event);
      };

  const onRightWallEnter: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onEnter == null &&
      props.onWallEnter == null && props.onRightWallEnter == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "enter", "right-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onEnter != null) props.onEnter(event);
        if (props.onWallEnter != null) props.onWallEnter(event);
        if (props.onRightWallEnter != null) props.onRightWallEnter(event);
      };

  const onRightWallLeave: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onLeave == null &&
      props.onWallLeave == null && props.onRightWallLeave == null
      ? undefined
      : (e) => {
        const event = new IsometricMapEvent(props, x, y, "leave", "right-wall");
        e.stopPropagation();
        if (props.onMouseAction != null) props.onMouseAction(event);
        if (props.onLeave != null) props.onLeave(event);
        if (props.onWallLeave != null) props.onWallLeave(event);
        if (props.onRightWallLeave != null) props.onRightWallLeave(event);
      };

  return (
    <div className={classes.join(" ")} style={vars}>
      <div
        className="floor"
        onClick={onFloorClick}
        onMouseEnter={onFloorMouseEnter}
        onMouseLeave={onFloorMouseLeave}
      />
      {lz > 0
        ? (
          <div
            className="wall left"
            onClick={onLeftWallClick}
            onMouseEnter={onLeftWallEnter}
            onMouseLeave={onLeftWallLeave}
          />
        )
        : null}
      {rz > 0
        ? (
          <div
            className="wall right"
            onClick={onRightWallClick}
            onMouseEnter={onRightWallEnter}
            onMouseLeave={onRightWallLeave}
          />
        )
        : null}
      <div className="textures-group">
        {renderMiddleWalls(
          frames,
          delay,
          (i) => i.rightWall.middle,
          lz,
          "right",
        )}
        {renderMiddleWalls(frames, delay, (i) => i.leftWall.middle, rz, "left")}
        {renderTopAndBottomWalls(frames, delay, (t) => t.leftWall, lz, "left")}
        {renderTopAndBottomWalls(
          frames,
          delay,
          (t) => t.rightWall,
          rz,
          "right",
        )}
        {frames
          ? (
            <AnimatedTexture
              frames={frames.map((i) => i.floor)}
              delay={delay}
              className="textures floor"
            />
          )
          : null}
      </div>
    </div>
  );
};

export default IsometricTile;

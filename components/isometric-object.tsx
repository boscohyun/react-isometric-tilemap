import React, { MouseEventHandler } from "https://esm.sh/react@17.0.2";
import AnimatedTexture from "./animated-texture.tsx";
import IsometricMapEvent from "../events/isometric-map-event.ts";
import "./isometric-object.css";

export interface IsometricObjectProps {
  /** The x position of the map (from 0 to map width - 1) */
  readonly x: number;
  /** The y position of the map (from 0 to map height - 1) */
  readonly y: number;

  /** The width of the object */
  readonly width: number;
  /** The height of the object */
  readonly height: number;
  /** The height of the object it will be lifted off the ground as z * map slab size */
  readonly z?: number;

  /** If the object is active, it will catch events, also have less transparency */
  readonly active?: boolean;

  /** Extra css classes you want to add into the object */
  readonly className?: string;
  /** extra style you wish to apply into te object */
  readonly style?: object;
  /** A list of strings, each string having an uri of each frame */
  readonly frames?: string[];
  /** An interval between each frame */
  readonly delay?: number;
  /** An even triggered when the user clicks on the object */
  readonly onClick?: (event: IsometricMapEvent<IsometricObjectProps>) => void;
  /** An event triggered when the user moves the mouse over the object */
  readonly onEnter?: (event: IsometricMapEvent<IsometricObjectProps>) => void;
  /** An event triggered when the user moves the mouse out of the object */
  readonly onLeave?: (event: IsometricMapEvent<IsometricObjectProps>) => void;
  /** Callback for any mouse event */
  readonly onMouseAction?: (
    event: IsometricMapEvent<IsometricObjectProps>,
  ) => void;
}

interface IsometricObjectCSSProperties extends React.CSSProperties {
  ["--x"]: number;
  ["--y"]: number;
  ["--z"]?: number;
  ["--object-width"]: number;
  ["--object-height"]: number;
}

/**
 * An isometric object is everything than is not a tile or a character.
 * They can be animated and over any tile.
 * They are used for decorations than don't look like a floor pice, like trees, rocks
 * or buildings.
 */
export const IsometricObject: React.FC<IsometricObjectProps> = (props) => {
  const {
    x,
    y,
    width,
    height,
    className,
    style,
    frames,
  } = props;
  const z = props.z ?? 0;
  const delay = props.delay ?? 0;
  const active = props.active ?? false;
  const vars: IsometricObjectCSSProperties = {
    ...(style || {}),
    "--x": x,
    "--y": y,
    "--z": z,
    "--object-width": width,
    "--object-height": height,
  };
  const classes = ["react-isometric-object-wrapper"];
  if (className) classes.push(className);
  if (active) classes.push("active");

  const onClick: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onClick == null ? undefined : (e) => {
      if (!active) return;
      const event = new IsometricMapEvent(props, x, y, "click", "object");
      e.stopPropagation();
      if (props.onMouseAction != null) props.onMouseAction(event);
      if (props.onClick != null) props.onClick(event);
    };

  const onMouseEnter: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onEnter == null ? undefined : (e) => {
      if (!active) return;
      const event = new IsometricMapEvent(props, x, y, "enter", "object");
      e.stopPropagation();
      if (props.onMouseAction != null) props.onMouseAction(event);
      if (props.onEnter != null) props.onEnter(event);
    };

  const onMouseLeave: MouseEventHandler | undefined =
    props.onMouseAction == null && props.onLeave == null ? undefined : (e) => {
      if (!active) return;
      const event = new IsometricMapEvent(props, x, y, "leave", "object");
      e.stopPropagation();
      if (props.onMouseAction != null) props.onMouseAction(event);
      if (props.onLeave != null) props.onLeave(event);
    };

  return (
    <div className={classes.join(" ")} style={vars}>
      <div
        className="react-isometric-object"
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {frames ? <AnimatedTexture frames={frames} delay={delay} /> : null}
      </div>
    </div>
  );
};

export default IsometricObject;

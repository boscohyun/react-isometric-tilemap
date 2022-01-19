/**
 * The type of event.
 */
export type IsometricMapEventType = "click" | "enter" | "leave" | "down" | "up";

/**
 * The type of area event occured.
 */
export type IsometricMapEventArea =
  | "object"
  | "floor"
  | "left-wall"
  | "right-wall"
  | "map";

/**
 * An event called when the user interacts with the map.
 *
 * @version 1.0.0
 * @since 2.0.0
 * @author [Ramiro Rojo](https://github.com/holywyvern)
 */
export class IsometricMapEvent<T> {
  readonly target: T;
  readonly x: number;
  readonly y: number;
  readonly type: IsometricMapEventType;
  readonly area: IsometricMapEventArea;

  /**
   * Creates a new event
   * @param target The selected element
   * @param x The x position of the element selected
   * @param y The y position of the element selected
   * @param type The type of event
   * @param area The area clicked
   */
  constructor(
    target: T,
    x: number,
    y: number,
    type: IsometricMapEventType,
    area: IsometricMapEventArea,
  ) {
    this.target = target;
    this.x = x;
    this.y = y;
    this.type = type;
    this.area = area;
  }
}

export default IsometricMapEvent;

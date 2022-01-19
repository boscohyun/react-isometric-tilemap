import React, { useEffect, useState } from "https://esm.sh/react@17.0.2";
import useRafLoop from "https://esm.sh/react-use@17.3.2/esm/useRafLoop";

/**
 * Properties for {@link AnimatedTexture} component.
 */
export interface AnimatedTextureProps {
  /** Array of images the animated texture uses */
  readonly frames: string[];
  /** The interval on wich each frame is changed, in milliseconds */
  readonly delay: number;
  /** A set of extra classes added into the component */
  readonly className?: string;
  /** CSS style, same as any component */
  readonly style?: React.CSSProperties;
  /** Callback for action when clicked */
  readonly onClick?: () => void;
}

/**
 * An animated texture is an image than changes frames on a regular interval
 * It's similar to a gif, but it's using a set of frames as different images.
 */
export const AnimatedTexture: React.FC<AnimatedTextureProps> = (props) => {
  const [lastTime, setLastTime] = useState(-1);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [currentDelay, setCurrentDelay] = useState(props.delay);

  function setupAnimation() {
    setCurrentFrame(0);
    setCurrentDelay(props.delay);
  }

  useEffect(() => {
    setupAnimation();
  }, [props.delay, props.frames.length, ...props.frames]);

  useRafLoop(
    (time: DOMHighResTimeStamp) => {
      const delta = lastTime < 0 ? 0 : time - lastTime;
      setLastTime(time);

      if (currentDelay - delta <= 0) {
        // next frame
        setCurrentFrame((currentFrame + 1) % props.frames.length);
        setCurrentDelay(props.delay);
      } else {
        setCurrentDelay(currentDelay - delta);
      }
    },
  );

  return (
    <img
      {...props}
      key="img"
      onClick={props.onClick}
      src={props.frames[currentFrame]}
    />
  );
};

export default AnimatedTexture;

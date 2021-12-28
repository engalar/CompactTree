import { useSize } from "ahooks";
import { createElement, CSSProperties, useEffect, useRef, useState } from "react";

export interface DivContainerProps {
  ready: (instance: any) => void;
  update: (size: {
    width?: number;
    height?: number;
  }) => void;
  style?: CSSProperties;
}
export default function DivContainer(props: DivContainerProps) {
  const ref = useRef<any>();
  const ref2 = useRef<any>();
  const size = useSize(ref2);
  const [emited, setEmited] = useState(false);

  useEffect(() => {
    props.update(size);
    return () => {
    }
  }, [size]);

  return (
    <div style={props.style} ref={e => {
      if (!emited) {
        setEmited(true);
        props.ready(e);
      }
      ref2.current = e;
    }}>
      <div ref={ref}></div>
    </div>
  )
}

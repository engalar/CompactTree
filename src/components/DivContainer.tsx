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
    <div className="mxcn-compact-tree-wrapper" style={props.style} ref={ref2}>
      <div className="mxcn-compact-tree" ref={e => {
        if (!emited && e) {
          setEmited(true);
          props.ready(e);
        }
        ref.current = e;
      }}></div>
    </div>
  )
}

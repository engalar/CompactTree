import { createElement, CSSProperties, useEffect, useRef, useState } from "react";
import { Store } from "../store";

import '../utils/G6';
import G6, { INode, TreeGraph } from "@antv/g6";
import { useSize, useUpdateEffect } from "ahooks";

export interface CompactTreeComponentProps {
    store: Store;
    style?: CSSProperties;
}

export function CompactTreeComponent(props: CompactTreeComponentProps) {
    const graphRef = useRef<any>();
    const wrapperRef = useRef<any>();
    const size = useSize(wrapperRef);

    const [graphInstance, setGraphInstance] = useState<TreeGraph>();
    useEffect(() => {
        const graph = new G6.TreeGraph({
            container: graphRef.current,
            fitCenter: true,
            renderer: 'svg',
            modes: {
                default: ['collapse-expand', 'drag-canvas', 'zoom-canvas'],
            },
            defaultNode: {
                type: 'crect',
            },
            defaultEdge: {
                type: 'cubic-horizontal',
                style: {
                    stroke: '#A3B1BF',
                },
            },
            layout: {
                type: 'compactBox',
                direction: 'LR',
                getId: function getId(d: any) {
                    return d.id;
                },
                getHeight: function getHeight() {
                    return 16;
                },
                getVGap: function getVGap() {
                    return 10;
                },
                getHGap: function getHGap() {
                    return 100;
                },
                getWidth: function getWidth(d: any) {
                    return G6.Util.getTextSize(d.id, 15)[0] + 20;
                },
            },
            fitView: true,
        });
        props.store.graph = graph;
        //https://g6.antv.vision/zh/docs/api/Event#node-%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6
        graph.on('node:click', ({ item }) => {
            props.store.loadWrapper(item as INode);
        });
        setGraphInstance(graph);
    }, []);

    useUpdateEffect(() => {
        if (graphInstance && size.width && size.height) {
            graphInstance.changeSize(size.width, size.height);
            graphInstance.layout(true);
        }
    }, [size, graphInstance]);

    return <div className="mxcn-resize-wrapper" ref={wrapperRef}>
        <div className="mxcn-resize" ref={graphRef}></div>
    </div>;
}

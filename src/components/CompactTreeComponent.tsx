import { createElement, CSSProperties, useCallback, useState } from "react";
import { useObserver } from "mobx-react";
import { Store } from "../store";

import '../hooks/G6';
import DivContainer from "./DivContainer";
import G6, { Graph } from "@antv/g6";

export interface CompactTreeComponentProps {
    store: Store;
    style?: CSSProperties;
}

export function CompactTreeComponent(props: CompactTreeComponentProps) {
    console.log(props);
    const [graphInstance, setGraphInstance] = useState<Graph>();
    const ready = useCallback(
        (container: any) => {
            fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
                .then((res) => res.json())
                .then((data) => {
                    const width = container.scrollWidth;
                    const height = container.scrollHeight || 500;
                    const graph = new G6.TreeGraph({
                        container: container,
                        width,
                        height,
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
                    graph.data(data);
                    graph.render();
                    setGraphInstance(graph);
                });
        },
        [],
    );

    const update =
        useCallback(
            (size: {
                width?: number;
                height?: number;
            }) => {
                if (graphInstance) {
                    console.log(size);
                }
            },
            [graphInstance],
        )

    return useObserver(() => (
        <DivContainer style={props.style} update={update} ready={ready}></DivContainer>
    ));
}


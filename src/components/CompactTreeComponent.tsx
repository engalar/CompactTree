import { createElement, CSSProperties, useCallback, useEffect, useState } from "react";
import { useObserver } from "mobx-react";
import { Store } from "../store";

import '../hooks/G6';
import DivContainer from "./DivContainer";
import G6, { INode, TreeGraph } from "@antv/g6";

export interface CompactTreeComponentProps {
    store: Store;
    style?: CSSProperties;
}

export function CompactTreeComponent(props: CompactTreeComponentProps) {
    console.log(props);
    const [graphInstance, setGraphInstance] = useState<TreeGraph>();
    const ready = useCallback(
        (container: any) => {
            fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/algorithm-category.json')
                .then((res) => res.json())
                .then((data) => {
                    const graph = new G6.TreeGraph({
                        container: container,
                        fitCenter: true,
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

    useEffect(() => {
        if (graphInstance) {
            //https://g6.antv.vision/zh/docs/api/Event#node-%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6
            graphInstance.on('node:click', ({ item }) => {
                console.log((item as INode));
            });
        }
        return () => {
        }
    }, [graphInstance])

    const update =
        useCallback(
            (size: {
                width?: number;
                height?: number;
            }) => {
                if (graphInstance) {
                    if (size.width && size.height) {
                        graphInstance.changeSize(size.width, size.height);
                        graphInstance.refreshLayout(true);
                    }
                }
            },
            [graphInstance],
        )

    return useObserver(() => (
        <DivContainer style={props.style} update={update} ready={ready}></DivContainer>
    ));
}


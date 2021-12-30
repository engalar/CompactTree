import { createElement, CSSProperties, useCallback, useEffect, useState } from "react";
import { Store } from "../store";

import '../hooks/G6';
import DivContainer from "./DivContainer";
import G6, { TreeGraph } from "@antv/g6";
import { autorun, IReactionDisposer } from "mobx";

export interface CompactTreeComponentProps {
    store: Store;
    style?: CSSProperties;
}

export function CompactTreeComponent(props: CompactTreeComponentProps) {
    const [graphInstance, setGraphInstance] = useState<TreeGraph>();
    const ready = useCallback(
        (container: any) => {
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
            setGraphInstance(graph);
        },
        [],
    );

    useEffect(() => {
        let dis: IReactionDisposer | undefined;
        if (graphInstance) {
            //https://g6.antv.vision/zh/docs/api/Event#node-%E4%BA%A4%E4%BA%92%E4%BA%8B%E4%BB%B6
            graphInstance.on('node:click', ({ item }) => {
                props.store.loadWrapper(item!.getID());
            });

            dis = autorun(() => {
                if (props.store.treeData) {
                    graphInstance.data(props.store.treeData);
                    graphInstance.render();
                }
            });
        }
        return () => {
            dis && dis();
        }
    }, [graphInstance]);

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

    return <DivContainer style={props.style} update={update} ready={ready}></DivContainer>;
}


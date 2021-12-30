import G6, { Item } from "@antv/g6";
const fontSize = 15;

//@ts-ignore
if (!window["com.mendix.widget.custom.compacttree.CompactTree"]) {
    //@ts-ignore
    window["com.mendix.widget.custom.compacttree.CompactTree"] = true;

    G6.registerNode("crect", {
        options: {
            // https://antv-g6.gitee.io/zh/docs/manual/middle/states/state#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%8A%82%E7%82%B9%E5%92%8C%E8%BE%B9%E6%97%B6%E5%AE%9A%E4%B9%89-state-%E6%A0%B7%E5%BC%8F
            stateStyles: {
                // loading: {
                //     "circle-shape": {
                //         fillOpacity: 0
                //     }
                // },
                // notail: {
                //     opacity: 0.2,
                //     "circle-shape": {
                //         stroke: "blue"
                //     }
                // }
            }
        },
        draw: (cfg, group) => {
            const width = (cfg as any).id.length * 10;
            const rect = group!.addShape("rect", {
                attrs: {
                    x: 0,
                    y: -10,
                    ...cfg!.style,
                    width,
                    height: 20,
                    lineWidth: 0,
                    opacity: 0
                },
                name: "rect-shape",
                draggable: true
            });
            const label = group!.addShape("text", {
                attrs: {
                    text: cfg!.label,
                    fill: "black",
                    fontSize,
                    x: 0,
                    y: 0
                },
                name: "label-shape",
                draggable: true
            });
            const labelBBox = label.getBBox();
            group!.addShape("circle", {
                attrs: {
                    x: labelBBox.maxX + 10,
                    y: (labelBBox.minY + labelBBox.maxY) / 2,
                    r: 5,
                    stroke: "red"
                },
                name: "circle-shape",
                draggable: true
            });
            const bboxWidth = label.getBBox().width + 20;
            rect.attr({ width: bboxWidth });

            group!.addShape("path", {
                attrs: {
                    lineWidth: 1,
                    fill: "#ccc",
                    stroke: "#ccc",
                    path: [
                        ["M", 0, 0],
                        ["L", bboxWidth, 0]
                    ]
                },
                name: "path-shape",
                draggable: true
            });

            return rect;
        },
        getAnchorPoints: _cfg => {
            return [
                [0, 0.5],
                [1, 0.5]
            ];
        },
        setState: (name?: string, value?: string | boolean, item?: Item) => {
            if (!item) return;
            const group = item.getContainer();
            const shape = group.get("children")[2]; // 顺序根据 draw 时确定
            if (name === "notail") {
                if (value) {
                    shape.attr("opacity", 0);
                } else {
                    shape.attr("opacity", 1);
                }
            }
        }
    });
}

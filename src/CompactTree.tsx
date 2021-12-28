import { createElement, useState } from "react";


import { CompactTreeContainerProps } from "../typings/CompactTreeProps";

import "./ui/CompactTree.scss";

import { useObserver } from "mobx-react";
import { Store } from "./store";
import { CompactTreeComponent } from "./components/CompactTreeComponent";

const parseStyle = (style = ""): { [key: string]: string } => {
    try {
        return style.split(";").reduce<{ [key: string]: string }>((styleObject, line) => {
            const pair = line.split(":");
            if (pair.length === 2) {
                const name = pair[0].trim().replace(/(-.)/g, match => match[1].toUpperCase());
                styleObject[name] = pair[1].trim();
            }
            return styleObject;
        }, {});
    } catch (_) {
        return {};
    }
};

export default function CompactTree(props: CompactTreeContainerProps) {
    console.log(props);

    const [store] = useState(new Store());

    return useObserver(() => (
        <CompactTreeComponent style={parseStyle(props.style)} store={store} />
    ));
}

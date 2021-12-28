import { Component, ReactNode, createElement } from "react";
import { CompactTreeContainerProps, CompactTreePreviewProps } from "../typings/CompactTreeProps";

declare function require(name: string): string;

type VisibilityMap<T> = {
    [P in keyof T]: any;
};

export class preview extends Component<CompactTreePreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/CompactTree.scss");
}


export function getVisibleProperties(
    valueMap: CompactTreeContainerProps,
    visibilityMap: VisibilityMap<CompactTreeContainerProps>
): VisibilityMap<CompactTreeContainerProps> {
    visibilityMap.eventNodeOnClickMicroflow = valueMap.eventNodeOnClickAction === 'microflow';
    visibilityMap.eventNodeOnClickNanoflow = valueMap.eventNodeOnClickAction === 'nanoflow';
    visibilityMap.eventNodeOnClickForm = valueMap.eventNodeOnClickAction === 'open';
    visibilityMap.eventNodeOnClickOpenPageAs = valueMap.eventNodeOnClickAction === 'open';

    return visibilityMap;
}
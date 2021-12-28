import { Component, ReactNode, createElement } from "react";
import { CompactTreePreviewProps } from "../typings/CompactTreeProps";

declare function require(name: string): string;

export class preview extends Component<CompactTreePreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/CompactTree.scss");
}

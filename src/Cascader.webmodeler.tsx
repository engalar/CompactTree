import { Component, ReactNode, createElement } from "react";
import { CascaderPreviewProps } from "../typings/CascaderProps";

declare function require(name: string): string;

export class preview extends Component<CascaderPreviewProps> {
    render(): ReactNode {
        return <div>No preview available</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/Cascader.scss");
}

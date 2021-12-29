/**
 * This file was generated from CompactTree.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Team
 */
import { CSSProperties } from "react";

interface CommonProps {
    name: string;
    class: string;
    tabIndex: number;

    uniqueid: string;
    friendlyId?: string;
    mxform: mxui.lib.form._FormBase;
    mxObject?: mendix.lib.MxObject;
    style: string;
}
export type FullAction = "nothing" | "microflow" | "nanoflow" | "open";
export interface CompactTreeContainerProps extends CommonProps {
    rootEntity: string;
    labelAttribute: string;
    parentEntity: string;
    selectedEntity: string;

    eventNodeOnClickAction: FullAction;
    eventNodeOnClickMicroflow: string;
    eventNodeOnClickNanoflow: Nanoflow;
    eventNodeOnClickForm: string;
    eventNodeOnClickOpenPageAs: OpenPageAs;
}

export interface CompactTreePreviewProps {
    class: string;
    style: string;
    styleObject: CSSProperties;

    rootEntity: string;
    parentEntity: string;
    selectedEntity: string;

    eventNodeOnClickAction: FullAction;
    eventNodeOnClickMicroflow: string;
    eventNodeOnClickNanoflow: Nanoflow;
    eventNodeOnClickForm: string;
    eventNodeOnClickOpenPageAs: OpenPageAs;
}

export interface VisibilityMap {
    myString: boolean;
}

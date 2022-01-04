import { TreeGraphData } from "@antv/g6";
import { Store } from "..";
import { BaseMxObject } from "./BaseMxObject";

export class OptionItem extends BaseMxObject {
    childGuids?: string[];
    /**
     *
     * @param guid mxobj guid
     */
    constructor(guid: string, public store: Store) {
        super(guid);
    }

    public get treeData(): TreeGraphData {
        return {
            id: this.guid,
            label: this.mxObject.get(this.store.mxOption.labelAttribute) as string,
            status: this.childGuids ? (this.childGuids.length > 0 ? "normal" : "notail") : "pending"
        };
    }

    public get children(): TreeGraphData[] | undefined {
        return this.childGuids?.map(d => this.store.options.get(d)!.treeData);
    }
}

import { TreeGraphData } from "@antv/g6";
import { computed, makeObservable, observable } from "mobx";
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
        makeObservable(this, { childGuids: observable, treeData: computed });
    }

    public get treeData(): TreeGraphData {
        console.log(333);

        return {
            id: this.guid,
            label: this.mxObject.get(this.store.mxOption.labelAttribute) as string,
            children: this.childGuids?.map(d => this.store.options.get(d)!.treeData)
        };
    }
}

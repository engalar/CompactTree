import { TreeGraphData } from "@antv/g6";
import { fetchByXpath, getObject, getReferencePart } from "@jeltemx/mendix-react-widget-utils";
import { configure, flow, makeObservable, observable, runInAction } from "mobx";
import { CompactTreeContainerProps } from "../../typings/CompactTreeProps";
import { OptionItem } from "./objects/OptionItem";

configure({ enforceActions: "observed", isolateGlobalState: true, useProxies: "never" });

export class Store {
    public options: Map<string, OptionItem> = new Map();
    treeData?: TreeGraphData;
    /**
     * dispose
     */
    public dispose() {
        this.options.forEach(d => d.dispose());
        this.options = new Map();
    }
    loadWrapper: (guid?: string) => void;
    constructor(public mxOption: CompactTreeContainerProps) {
        makeObservable(this, { options: observable, load: flow.bound, treeData: observable });
        this.loadWrapper = this.load.bind(this);
        this.load();
    }

    *load(guid?: string) {
        if (guid) {
            const objs: mendix.lib.MxObject[] = yield fetchByXpath(
                this.mxOption.mxObject!,
                getReferencePart(this.mxOption.rootEntity, "entity"),
                `[${getReferencePart(this.mxOption.parentEntity, "referenceAttr")}=${guid}]`
            );

            runInAction(() => {
            for (const obj of objs) {
                this.options.set(obj.getGuid(), new OptionItem(obj.getGuid(), this));
            }

            this.options.get(guid)!.childGuids = objs.map(d => d.getGuid());
            });
        } else {
            const rootGuid = this.mxOption.mxObject!.getReference(
                getReferencePart(this.mxOption.rootEntity, "referenceAttr")
            );

            yield getObject(rootGuid);
            const rootOption = new OptionItem(rootGuid, this);

            this.options.set(rootGuid, rootOption);
            this.treeData = rootOption.treeData;
        }
    }
}

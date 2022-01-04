import { INode, TreeGraph } from "@antv/g6";
import { fetchByXpath, getObject, getReferencePart } from "@jeltemx/mendix-react-widget-utils";
import { configure, flow, makeObservable, observable } from "mobx";
import { CompactTreeContainerProps } from "../../typings/CompactTreeProps";
import { OptionItem } from "./objects/OptionItem";

configure({ enforceActions: "observed", isolateGlobalState: true, useProxies: "never" });

export class Store {
    public graph?: TreeGraph;
    public options: Map<string, OptionItem> = new Map();
    /**
     * dispose
     */
    public dispose() {
        this.options.forEach(d => d.dispose());
        this.options = new Map();
    }
    loadWrapper: (node?: INode) => void;
    constructor(public mxOption: CompactTreeContainerProps) {
        makeObservable(this, { options: observable, load: flow.bound });
        this.loadWrapper = this.load.bind(this);
        this.load();
    }

    *load(node?: INode) {
        const guid = node?.getID();
        if (guid) {
            const selectedOption = this.options.get(guid)!;
            if (!selectedOption.childGuids) {
                // 需要加载
                this.graph?.setItemState(this.graph!.findById(guid)!, "loading", true);

                const objs: mendix.lib.MxObject[] = yield fetchByXpath(
                    this.mxOption.mxObject!,
                    getReferencePart(this.mxOption.rootEntity, "entity"),
                    `[${getReferencePart(this.mxOption.parentEntity, "referenceAttr")}=${guid}]`
                );

                for (const obj of objs) {
                    this.options.set(obj.getGuid(), new OptionItem(obj.getGuid(), this));
                }

                this.options.get(guid)!.childGuids = objs.map(d => d.getGuid());
                this.graph!.findDataById(guid)!.children = this.options.get(guid)!.children;

                this.graph?.clearItemStates(this.graph!.findById(guid)!, "loading");

                // 更新状态
                if (this.options.get(guid)!.childGuids?.length === 0) {
                    this.graph!.findById(guid)!.getModel().status = "notail";
                    this.graph?.setItemState(this.graph!.findById(guid)!, "notail", true);
                } else {
                    this.graph!.findById(guid)!.getModel().status = "normal";
                    this.graph?.updateChildren(this.options.get(guid)!.children!, guid);
                }
            }
        } else {
            const rootGuid = this.mxOption.mxObject!.getReference(
                getReferencePart(this.mxOption.rootEntity, "referenceAttr")
            );

            yield getObject(rootGuid);
            const rootOption = new OptionItem(rootGuid, this);

            this.options.set(rootGuid, rootOption);
            this.graph?.changeData(rootOption.treeData);
        }
    }
}

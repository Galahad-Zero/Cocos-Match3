// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class HotUpdatePanel extends cc.Component {
    @property(cc.Label)
    infoLabel: cc.Label = null;

    @property(cc.Label)
    fileLabel: cc.Label = null;

    @property(cc.Label)
    byteLabel: cc.Label = null;

    @property(cc.Node)
    checkBtn: cc.Node = null;

    @property(cc.Node)
    updateBtn: cc.Node = null;

    @property(cc.Node)
    retryBtn: cc.Node = null;

    _fileProgress: number = 0;
    _byteProgress: number = 0;
    protected onLoad(): void {
        this.retryBtn.active = false;
    }

    public setInfo(info: string): void {
        this.infoLabel.string = info;
    }

    public setFileProgress(progress: number): void {
        this._fileProgress = progress;
    }

    public setByteProgress(progress: number): void {
        this._byteProgress = progress;
    }

    public setCheckBtnActive(active: boolean): void {
        this.checkBtn.active = active;
    }

    public setRetryBtnActive(active: boolean): void {
        this.retryBtn.active = active;
    }

    public setUpdateBtnActive(active: boolean): void {
        this.updateBtn.active = active;
    }

    public setFileLabel(label: string): void {
        this.fileLabel.string = label;
    }

    public setByteLabel(label: string): void {
        this.byteLabel.string = label;
    }

    public close(): void {
        this.node.active = false;
    }
}

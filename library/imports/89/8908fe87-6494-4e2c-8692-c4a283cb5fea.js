"use strict";
cc._RF.push(module, '8908f6HZJROLIaSxKKDy1/q', 'HotUpdatePanel');
// Script/HotUpdatePanel.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let HotUpdatePanel = class HotUpdatePanel extends cc.Component {
    constructor() {
        super(...arguments);
        this.infoLabel = null;
        this.fileLabel = null;
        this.byteLabel = null;
        this.checkBtn = null;
        this.updateBtn = null;
        this.retryBtn = null;
        this._fileProgress = 0;
        this._byteProgress = 0;
    }
    onLoad() {
        this.retryBtn.active = false;
    }
    setInfo(info) {
        this.infoLabel.string = info;
    }
    setFileProgress(progress) {
        this._fileProgress = progress;
    }
    setByteProgress(progress) {
        this._byteProgress = progress;
    }
    setCheckBtnActive(active) {
        this.checkBtn.active = active;
    }
    setRetryBtnActive(active) {
        this.retryBtn.active = active;
    }
    setUpdateBtnActive(active) {
        this.updateBtn.active = active;
    }
    setFileLabel(label) {
        this.fileLabel.string = label;
    }
    setByteLabel(label) {
        this.byteLabel.string = label;
    }
    close() {
        this.node.active = false;
    }
};
__decorate([
    property(cc.Label)
], HotUpdatePanel.prototype, "infoLabel", void 0);
__decorate([
    property(cc.Label)
], HotUpdatePanel.prototype, "fileLabel", void 0);
__decorate([
    property(cc.Label)
], HotUpdatePanel.prototype, "byteLabel", void 0);
__decorate([
    property(cc.Node)
], HotUpdatePanel.prototype, "checkBtn", void 0);
__decorate([
    property(cc.Node)
], HotUpdatePanel.prototype, "updateBtn", void 0);
__decorate([
    property(cc.Node)
], HotUpdatePanel.prototype, "retryBtn", void 0);
HotUpdatePanel = __decorate([
    ccclass
], HotUpdatePanel);
exports.default = HotUpdatePanel;

cc._RF.pop();
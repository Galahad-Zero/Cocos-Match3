"use strict";
cc._RF.push(module, '08e0fRGA5hAXLQI92b8m1AS', 'BaseBlock');
// Script/gamePlay/block/BaseBlock.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let BaseBlock = class BaseBlock extends cc.Component {
    constructor() {
        super(...arguments);
        this.skeleton = null;
        this._config = null;
        this._style = null;
    }
    getConfig() {
        return this._config;
    }
    getStyle() {
        return this._style;
    }
    // 节点池回收
    unuse() {
        this.skeleton.setToSetupPose();
        this.skeleton.clearTracks();
        this._config = null;
        this._style = null;
    }
    // 节点池获取
    reuse(config, style, parent) {
        this._config = config;
        this._style = style;
        const targetStyle = this._style.getAnimationInfo(this._config.special);
        this.skeleton.skeletonData = targetStyle.skeletonData;
        if (parent) {
            this.node.setParent(parent);
        }
        this.skeleton.setAnimation(0, targetStyle.animation, targetStyle.isLoop);
    }
};
__decorate([
    property(sp.Skeleton)
], BaseBlock.prototype, "skeleton", void 0);
BaseBlock = __decorate([
    ccclass
], BaseBlock);
exports.default = BaseBlock;

cc._RF.pop();
"use strict";
cc._RF.push(module, '250f7cnmhtLjLVVSfWrN4Xw', 'BaseEffect');
// Script/gamePlay/effects/BaseEffect.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property, requireComponent } = cc._decorator;
let BaseEffect = class BaseEffect extends cc.Component {
    constructor() {
        super(...arguments);
        this.skeleton = null;
    }
    reuse(style, initPos, parent, cd) {
        this.node.setPosition(initPos);
        this.node.setParent(parent);
        this.skeleton.skeletonData = style.skeletonData;
        this.skeleton.setAnimation(0, style.animation, style.isLoop);
        this.skeleton.setEndListener(() => {
            cd();
        });
    }
    unuse() {
        // this.skeleton.clearTracks();
        this.skeleton.skeletonData = null;
    }
};
__decorate([
    property(sp.Skeleton)
], BaseEffect.prototype, "skeleton", void 0);
BaseEffect = __decorate([
    ccclass,
    requireComponent(sp.Skeleton)
], BaseEffect);
exports.default = BaseEffect;

cc._RF.pop();
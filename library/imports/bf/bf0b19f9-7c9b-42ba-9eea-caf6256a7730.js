"use strict";
cc._RF.push(module, 'bf0b1n5fJtCup7qyvYlancw', 'SpineProperty');
// Script/gamePlay/common/SpineProperty.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let SpineProperty = class SpineProperty {
    constructor() {
        this.skeletonData = null;
        this.animation = '';
        this.isLoop = true;
    }
};
__decorate([
    property({
        type: sp.SkeletonData,
    })
], SpineProperty.prototype, "skeletonData", void 0);
__decorate([
    property()
], SpineProperty.prototype, "animation", void 0);
__decorate([
    property()
], SpineProperty.prototype, "isLoop", void 0);
SpineProperty = __decorate([
    ccclass('SpineProperty')
], SpineProperty);
exports.default = SpineProperty;

cc._RF.pop();
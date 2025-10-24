"use strict";
cc._RF.push(module, 'f17d5ylaJdMV6RCIQiA9KAa', 'LevelBtn');
// Script/level/LevelBtn.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property, requireComponent } = cc._decorator;
let LevelBtn = class LevelBtn extends cc.Component {
    constructor() {
        super(...arguments);
        this.levelInfo = null;
    }
    // protected onLoad(): void {
    //     this.node.on('click', this.onClick, this);
    // }
    // public onClick(): void {
    //     const levelInfo: LevelConfig = this.levelInfo.json;
    //     this.node.emit(EntryLevelEvent, levelInfo);
    // }
    // protected onDestroy(): void {
    //     this.node.off('click', this.onClick, this);
    // }
    getLevelInfo() {
        return this.levelInfo.json;
    }
};
__decorate([
    property(cc.JsonAsset)
], LevelBtn.prototype, "levelInfo", void 0);
LevelBtn = __decorate([
    ccclass,
    requireComponent(cc.Button)
], LevelBtn);
exports.default = LevelBtn;

cc._RF.pop();
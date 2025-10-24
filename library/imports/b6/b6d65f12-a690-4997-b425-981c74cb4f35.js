"use strict";
cc._RF.push(module, 'b6d658SppBJl7QlmBx0y081', 'LevelView');
// Script/level/LevelView.ts

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
const const_1 = require("../const");
const { ccclass, property } = cc._decorator;
let LevelView = class LevelView extends cc.Component {
    onLoad() {
        this.node.on(const_1.EntryLevelEvent, this.onEntryLevel, this);
    }
    onEntryLevel(levelInfo) {
        console.log(levelInfo);
    }
    onDestroy() {
        this.node.off(const_1.EntryLevelEvent, this.onEntryLevel, this);
    }
};
LevelView = __decorate([
    ccclass
], LevelView);
exports.default = LevelView;

cc._RF.pop();
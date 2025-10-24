"use strict";
cc._RF.push(module, 'c8fbfGYbVhBQbAYCnXRPDAH', 'GameFinPanel');
// Script/gamePlay/ui/GameFinPanel.ts

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
let NewClass = class NewClass extends cc.Component {
    constructor() {
        super(...arguments);
        this.label = null;
        this.text = 'hello';
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    start() {
    }
};
__decorate([
    property(cc.Label)
], NewClass.prototype, "label", void 0);
__decorate([
    property
], NewClass.prototype, "text", void 0);
NewClass = __decorate([
    ccclass
], NewClass);
exports.default = NewClass;

cc._RF.pop();
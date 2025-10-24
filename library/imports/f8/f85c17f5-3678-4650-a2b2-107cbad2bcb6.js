"use strict";
cc._RF.push(module, 'f85c1f1NnhGUKKyEHy60ry2', 'LevelMenu');
// Script/level/LevelMenu.ts

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
const AudioMgr_1 = require("../AudioMgr");
const GameMgr_1 = require("../gamePlay/GameMgr");
const LevelBtn_1 = require("./LevelBtn");
const { ccclass, property } = cc._decorator;
let LevelSelect = class LevelSelect extends cc.Component {
    constructor() {
        super(...arguments);
        this.audioMgr = null;
    }
    start() {
        this.audioMgr.playMusic();
    }
    onEntryLevel(event) {
        const target = event.target;
        const levelBtn = target.getComponent(LevelBtn_1.default);
        if (!levelBtn) {
            return;
        }
        const levelConfig = levelBtn.getLevelInfo();
        this.runGame(levelConfig);
    }
    runGame(levelConfig) {
        const onLaunched = (err, scene) => {
            if (err) {
                console.error(err);
            }
            else {
                const gameMgr = scene.getComponentInChildren(GameMgr_1.default);
                gameMgr.initGamePanel(levelConfig);
            }
        };
        cc.director.loadScene('Game', onLaunched);
    }
    backToMenu() {
        // 返回主菜单
        cc.director.loadScene('Menu');
    }
    onDestroy() {
        this.audioMgr.stopMusic();
    }
};
__decorate([
    property(AudioMgr_1.default)
], LevelSelect.prototype, "audioMgr", void 0);
LevelSelect = __decorate([
    ccclass
], LevelSelect);
exports.default = LevelSelect;

cc._RF.pop();
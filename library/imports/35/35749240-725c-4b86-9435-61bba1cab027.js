"use strict";
cc._RF.push(module, '35749JAclxLhpQ1YbuhyrAn', 'Menu');
// Script/Menu.ts

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
const AudioMgr_1 = require("./AudioMgr");
const const_1 = require("./const");
const GameSetting_1 = require("./GameSetting");
const Utils_1 = require("./Utils");
const { ccclass, property } = cc._decorator;
let Menu = class Menu extends cc.Component {
    constructor() {
        super(...arguments);
        this.audioMgr = null;
        this.gameSetting = null;
    }
    onLoad() {
        // 检查本地数据
        const hasSettingData = Utils_1.HasLocalData(const_1.UserSettingItemName);
        if (!hasSettingData) {
            Utils_1.setLocalData(const_1.UserSettingItemName, { bgmVolume: 1, effectVolume: 1 });
        }
    }
    start() {
        // 播放背景音乐
        this.audioMgr.playMusic();
    }
    chooseLevel() {
        // 加载关卡选择场景
        cc.director.loadScene('LevelSelect');
    }
    showSetting() {
        // 显示设置界面
        this.gameSetting.node.active = true;
    }
    closeSetting() {
        // 关闭设置界面
        this.gameSetting.node.active = false;
    }
    onDestroy() {
        // 暂停背景音乐
        this.audioMgr.stopMusic();
    }
};
__decorate([
    property(AudioMgr_1.default)
], Menu.prototype, "audioMgr", void 0);
__decorate([
    property(GameSetting_1.default)
], Menu.prototype, "gameSetting", void 0);
Menu = __decorate([
    ccclass
], Menu);
exports.default = Menu;

cc._RF.pop();
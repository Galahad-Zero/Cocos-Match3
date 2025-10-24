"use strict";
cc._RF.push(module, '8db45p9tGtFdJ6odCIkAXoi', 'GameSetting');
// Script/GameSetting.ts

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
const const_1 = require("./const");
const Utils_1 = require("./Utils");
const { ccclass, property } = cc._decorator;
let GameSetting = class GameSetting extends cc.Component {
    constructor() {
        super(...arguments);
        this.bgmVolumeCrl = null;
        this.effectVolumeCrl = null;
        this._config = { bgmVolume: 1, effectVolume: 1 };
        // protected onDestroy(): void {
        //     this.bgmVolumeCrl.node.off('slider', this.onBgmVolumeChange, this);
        //     this.effectVolumeCrl.node.off('slider', this.onEffectVolumeChange, this);
        // }
    }
    start() {
        this._config = Utils_1.getLocalData(const_1.UserSettingItemName);
        this.bgmVolumeCrl.progress = this._config.bgmVolume;
        this.effectVolumeCrl.progress = this._config.effectVolume;
        this.bindEvents();
    }
    bindEvents() {
        this.bgmVolumeCrl.node.on('slide', this.onBgmVolumeChange, this);
        this.effectVolumeCrl.node.on('slide', this.onEffectVolumeChange, this);
    }
    onBgmVolumeChange(slider) {
        this._config.bgmVolume = slider.progress;
        Utils_1.setLocalData(const_1.UserSettingItemName, this._config);
        cc.audioEngine.setMusicVolume(this._config.bgmVolume);
    }
    onEffectVolumeChange(slider) {
        this._config.effectVolume = slider.progress;
        Utils_1.setLocalData(const_1.UserSettingItemName, this._config);
        cc.audioEngine.setEffectsVolume(this._config.effectVolume);
    }
};
__decorate([
    property(cc.Slider)
], GameSetting.prototype, "bgmVolumeCrl", void 0);
__decorate([
    property(cc.Slider)
], GameSetting.prototype, "effectVolumeCrl", void 0);
GameSetting = __decorate([
    ccclass
], GameSetting);
exports.default = GameSetting;

cc._RF.pop();
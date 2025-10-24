"use strict";
cc._RF.push(module, '8e417rKmulBNK0agg1QyJYm', 'AudioMgr');
// Script/AudioMgr.ts

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
let AudioMgr = class AudioMgr extends cc.Component {
    constructor() {
        super(...arguments);
        this.bgm = null;
        this.clickAudio = null;
        this.swapAudio = null;
    }
    playMusic() {
        // 播放背景音乐
        cc.audioEngine.playMusic(this.bgm, true);
    }
    stopMusic() {
        // 停止背景音乐
        cc.audioEngine.stopMusic();
    }
    pauseMusic() {
        // 暂停背景音乐
        cc.audioEngine.pauseMusic();
    }
    resumeMusic() {
        // 恢复背景音乐
        cc.audioEngine.resumeMusic();
    }
    _playEffect(audioClip) {
        // 播放音效
        cc.audioEngine.playEffect(audioClip, false);
    }
    playClickAudio() {
        // 播放点击音效
        this._playEffect(this.clickAudio);
    }
    playSwapAudio() {
        this._playEffect(this.swapAudio);
    }
};
__decorate([
    property(cc.AudioClip)
], AudioMgr.prototype, "bgm", void 0);
__decorate([
    property(cc.AudioClip)
], AudioMgr.prototype, "clickAudio", void 0);
__decorate([
    property(cc.AudioClip)
], AudioMgr.prototype, "swapAudio", void 0);
AudioMgr = __decorate([
    ccclass
], AudioMgr);
exports.default = AudioMgr;

cc._RF.pop();
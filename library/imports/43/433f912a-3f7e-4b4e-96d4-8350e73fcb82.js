"use strict";
cc._RF.push(module, '433f9EqP35LTpbUg1DnP8uC', 'EffectMgr');
// Script/gamePlay/effects/EffectMgr.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseEffect_1 = require("./BaseEffect");
const SpineProperty_1 = require("../common/SpineProperty");
const GameTypes_1 = require("../GameTypes");
const { ccclass, property } = cc._decorator;
let EffectMgr = class EffectMgr extends cc.Component {
    constructor() {
        super(...arguments);
        this.effectRootNode = null;
        this.effectPrefab = null;
        this.normalEffect = null;
        this.rowEffect = null;
        this.columnEffect = null;
        this.rowEffectAudio = null;
        this.columnEffectAudio = null;
        this.bombEffectAudio = null;
        this.specialBombEffectAudio = null;
        this.effectAudio = null;
        this.comboAudioList = [];
        this.commentAudioList = [];
        // @property({
        //     displayName: '炸弹特效',
        //     type: SpineProperty,
        // })
        // bombEffect: SpineProperty = null;
        // @property({
        //     displayName: '特殊炸弹特效',
        //     type: SpineProperty,
        // })
        // specialBombEffect: SpineProperty = null;
        this._effectLoop = null;
    }
    onLoad() {
        this._effectLoop = new cc.NodePool(BaseEffect_1.default);
    }
    effectHandler(grid, gameCheckInfo, cd) {
        const { canEliminateCheckInfos } = gameCheckInfo;
        const effectInfoList = [];
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
            const { eliminateBlockType, entryLocation, contiguousLocations } = eliminateCheckInfo;
            // 如果是特殊方块，则添加特效
            if (eliminateBlockType !== GameTypes_1.BlockSpecialType.NONE) {
                const style = this.getSpineProperty(eliminateBlockType);
                style &&
                    effectInfoList.push({
                        location: entryLocation,
                        style,
                    });
            }
            // 给普通方块，添加特效
            for (const location of contiguousLocations) {
                effectInfoList.push({
                    location,
                    style: this.normalEffect,
                });
            }
        }
        // 特效释放回调
        let step = 0;
        const effectCount = effectInfoList.length;
        const endCallBack = () => {
            step++;
            if (step === effectCount) {
                cd && cd();
            }
        };
        // 释放特效
        for (const effectInfo of effectInfoList) {
            const { location, style } = effectInfo;
            const pos = grid.getCellPosition(location);
            this.getEffect(style, pos, endCallBack);
        }
    }
    getSpineProperty(special) {
        switch (special) {
            case GameTypes_1.BlockSpecialType.NONE:
                return this.normalEffect;
            case GameTypes_1.BlockSpecialType.ROW:
                return this.rowEffect;
            case GameTypes_1.BlockSpecialType.COLUMN:
                return this.columnEffect;
            default:
                return null;
        }
    }
    getEffect(style, initPos, cd) {
        let effect = this._effectLoop.get(style, initPos, this.effectRootNode, () => {
            this.putEffect(effect);
            cd && cd();
        });
        if (!effect) {
            const newEffect = cc.instantiate(this.effectPrefab);
            const effectComp = newEffect.getComponent(BaseEffect_1.default);
            effectComp.reuse(style, initPos, this.effectRootNode, () => {
                this.putEffect(newEffect);
                cd && cd();
            });
            effect = newEffect;
        }
        return effect.getComponent(BaseEffect_1.default);
    }
    putEffect(effectNode) {
        this._effectLoop.put(effectNode);
    }
    setRootPosition(position) {
        this.effectRootNode.setPosition(position);
    }
    playComboAudio(combo) {
        const audioClip = this.comboAudioList[combo - 1];
        audioClip && this._playEffectAudio(audioClip);
    }
    playCommentAudio(totalCombo) {
        const commentList = [11, 9, 7, 5, 3];
        // 找到小于等于totalCombo的最大的commentIndex
        const commentIndex = commentList.findIndex((comment) => totalCombo >= comment);
        if (commentIndex === -1) {
            return;
        }
        const audioClip = this.commentAudioList[commentIndex];
        audioClip && this._playEffectAudio(audioClip);
    }
    _playEffectAudio(audioClip) {
        audioClip && cc.audioEngine.playEffect(audioClip, false);
    }
};
__decorate([
    property(cc.Node)
], EffectMgr.prototype, "effectRootNode", void 0);
__decorate([
    property(cc.Prefab)
], EffectMgr.prototype, "effectPrefab", void 0);
__decorate([
    property({
        displayName: '普通特效',
        type: SpineProperty_1.default,
    })
], EffectMgr.prototype, "normalEffect", void 0);
__decorate([
    property({
        displayName: '行特效',
        type: SpineProperty_1.default,
    })
], EffectMgr.prototype, "rowEffect", void 0);
__decorate([
    property({
        displayName: '列特效',
        type: SpineProperty_1.default,
    })
], EffectMgr.prototype, "columnEffect", void 0);
__decorate([
    property(cc.AudioClip)
], EffectMgr.prototype, "rowEffectAudio", void 0);
__decorate([
    property(cc.AudioClip)
], EffectMgr.prototype, "columnEffectAudio", void 0);
__decorate([
    property(cc.AudioClip)
], EffectMgr.prototype, "bombEffectAudio", void 0);
__decorate([
    property(cc.AudioClip)
], EffectMgr.prototype, "specialBombEffectAudio", void 0);
__decorate([
    property(cc.AudioClip)
], EffectMgr.prototype, "effectAudio", void 0);
__decorate([
    property([cc.AudioClip])
], EffectMgr.prototype, "comboAudioList", void 0);
__decorate([
    property([cc.AudioClip])
], EffectMgr.prototype, "commentAudioList", void 0);
EffectMgr = __decorate([
    ccclass
], EffectMgr);
exports.default = EffectMgr;

cc._RF.pop();
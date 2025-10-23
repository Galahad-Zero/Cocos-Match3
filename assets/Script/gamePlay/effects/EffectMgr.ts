import BaseEffect from './BaseEffect';
import SpineProperty from '../common/SpineProperty';
import { BlockSpecialType, GameCheckInfo, Location } from '../Types';
import Grid from '../common/Grid';
import BaseBlock from '../block/BaseBlock';

const { ccclass, property } = cc._decorator;

interface EffectInfo {
    location: Location;
    style: SpineProperty;
}

@ccclass
export default class EffectMgr extends cc.Component {
    @property(cc.Node)
    effectRootNode: cc.Node = null;

    @property(cc.Prefab)
    effectPrefab: cc.Prefab = null;

    @property({
        displayName: '普通特效',
        type: SpineProperty,
    })
    normalEffect: SpineProperty = null;

    @property({
        displayName: '行特效',
        type: SpineProperty,
    })
    rowEffect: SpineProperty = null;

    @property({
        displayName: '列特效',
        type: SpineProperty,
    })
    columnEffect: SpineProperty = null;

    @property(cc.AudioClip)
    rowEffectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    columnEffectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    bombEffectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    specialBombEffectAudio: cc.AudioClip = null;

    @property(cc.AudioClip)
    effectAudio: cc.AudioClip = null;

    @property([cc.AudioClip])
    comboAudioList: Array<cc.AudioClip> = [];

    @property([cc.AudioClip])
    commentAudioList: Array<cc.AudioClip> = [];

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

    _effectLoop: cc.NodePool = null;

    public onLoad(): void {
        this._effectLoop = new cc.NodePool(BaseEffect);
    }

    public effectHandler(
        grid: Grid<BaseBlock>,
        gameCheckInfo: GameCheckInfo,
        cd: () => void
    ): void {
        const { canEliminateCheckInfos } = gameCheckInfo;
        const effectInfoList: Array<EffectInfo> = [];
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
            const { eliminateBlockType, entryLocation, contiguousLocations } =
                eliminateCheckInfo;
            // 如果是特殊方块，则添加特效
            if (eliminateBlockType !== BlockSpecialType.NONE) {
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

    public getSpineProperty(special: BlockSpecialType): SpineProperty {
        switch (special) {
            case BlockSpecialType.NONE:
                return this.normalEffect;
            case BlockSpecialType.ROW:
                return this.rowEffect;
            case BlockSpecialType.COLUMN:
                return this.columnEffect;
            default:
                return null;
        }
    }

    public getEffect(
        style: SpineProperty,
        initPos: cc.Vec2,
        cd: () => void
    ): BaseEffect {
        let effect = this._effectLoop.get(
            style,
            initPos,
            this.effectRootNode,
            () => {
                this.putEffect(effect);
                cd && cd();
            }
        );
        if (!effect) {
            const newEffect = cc.instantiate(this.effectPrefab);
            const effectComp = newEffect.getComponent(BaseEffect);
            effectComp.reuse(style, initPos, this.effectRootNode, () => {
                this.putEffect(newEffect);
                cd && cd();
            });
            effect = newEffect;
        }
        return effect.getComponent(BaseEffect);
    }

    public putEffect(effectNode: cc.Node): void {
        this._effectLoop.put(effectNode);
    }

    public setRootPosition(position: cc.Vec2): void {
        this.effectRootNode.setPosition(position);
    }

    public playComboAudio(combo: number): void {
        const audioClip = this.comboAudioList[combo - 1];
        audioClip && this._playEffectAudio(audioClip);
    }

    public playCommentAudio(totalCombo: number): void {
        const commentList = [11, 9, 7, 5, 3];
        // 找到小于等于totalCombo的最大的commentIndex
        const commentIndex = commentList.findIndex(
            (comment) => totalCombo >= comment
        );
        if (commentIndex === -1) {
            return;
        }
        const audioClip = this.commentAudioList[commentIndex];
        audioClip && this._playEffectAudio(audioClip);
    }

    _playEffectAudio(audioClip: cc.AudioClip): void {
        audioClip && cc.audioEngine.playEffect(audioClip, false);
    }
}

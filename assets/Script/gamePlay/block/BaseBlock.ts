// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import SpineProperty from '../common/SpineProperty';
import { BlockConfig } from '../GameTypes';
import BlockStyleProperty from './BlockStyleProperty';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseBlock extends cc.Component {
    @property(sp.Skeleton)
    skeleton: sp.Skeleton = null;

    _config: BlockConfig = null;
    _style: BlockStyleProperty = null;

    public getConfig(): BlockConfig {
        return this._config;
    }

    public getStyle(): BlockStyleProperty {
        return this._style;
    }

    // 节点池回收
    public unuse(): void {
        this.skeleton.setToSetupPose();
        this.skeleton.clearTracks();
        this._config = null;
        this._style = null;
    }

    // 节点池获取
    public reuse(
        config: BlockConfig,
        style: BlockStyleProperty,
        parent?: cc.Node
    ): void {
        this._config = config;
        this._style = style;
        const targetStyle = this._style.getAnimationInfo(this._config.special);
        this.skeleton.skeletonData = targetStyle.skeletonData;
        if (parent) {
            this.node.setParent(parent);
        }
        this.skeleton.setAnimation(
            0,
            targetStyle.animation,
            targetStyle.isLoop
        );
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EntryLevelEvent } from '../const';
import { LevelConfig } from '../gamePlay/Types';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelView extends cc.Component {
    protected onLoad(): void {
        this.node.on(EntryLevelEvent, this.onEntryLevel, this);
    }

    public onEntryLevel(levelInfo: LevelConfig): void {
        console.log(levelInfo);
    }

    protected onDestroy(): void {
        this.node.off(EntryLevelEvent, this.onEntryLevel, this);
    }
}

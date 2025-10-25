// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { EntryLevelEvent, UserSaveDataName } from '../const';
import { LevelConfig, UserLevelInfo } from '../gamePlay/GameTypes';
import { getLocalData, HasLocalData, setLocalData } from '../Utils';
import LevelBtn from './LevelBtn';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelView extends cc.Component {
    protected onLoad(): void {
        this.node.on(EntryLevelEvent, this.onEntryLevel, this);
        const hasSaveData = HasLocalData(UserSaveDataName);
        if (!hasSaveData) {
            setLocalData(UserSaveDataName, { maxLevelId: 0 });
        }
    }

    protected start(): void {
        this.adjustLevelBtns();
    }

    public onEntryLevel(levelInfo: LevelConfig): void {
        console.log(levelInfo);
    }

    protected adjustLevelBtns(): void {
        const levelBtns = this.getAllLevelBtns();
        const userLevelInfo = getLocalData<UserLevelInfo>(UserSaveDataName);
        const maxLevelId = userLevelInfo.maxLevelId;
        levelBtns.forEach((levelBtn) => {
            const levelInfo = levelBtn.getLevelInfo();
            if (levelInfo.id <= maxLevelId + 1) {
                levelBtn.setBtnActive(true);
            } else {
                levelBtn.setBtnActive(false);
            }
        });
    }

    public getAllLevelBtns(): LevelBtn[] {
        return this.node.getComponentsInChildren(LevelBtn);
    }

    protected onDestroy(): void {
        this.node.off(EntryLevelEvent, this.onEntryLevel, this);
    }
}

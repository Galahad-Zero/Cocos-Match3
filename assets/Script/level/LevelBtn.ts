import { LevelConfig } from '../gamePlay/GameTypes';

const { ccclass, property, requireComponent } = cc._decorator;

@ccclass
@requireComponent(cc.Button)
export default class LevelBtn extends cc.Component {
    @property(cc.JsonAsset)
    levelInfo: cc.JsonAsset = null;

    // protected onLoad(): void {
    //     this.node.on('click', this.onClick, this);
    // }

    // public onClick(): void {
    //     const levelInfo: LevelConfig = this.levelInfo.json;
    //     this.node.emit(EntryLevelEvent, levelInfo);
    // }

    // protected onDestroy(): void {
    //     this.node.off('click', this.onClick, this);
    // }

    public getLevelInfo(): LevelConfig {
        return this.levelInfo.json;
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioMgr from '../AudioMgr';
import GameMgr from '../gamePlay/GameMgr';
import { LevelConfig } from '../gamePlay/Types';
import LevelBtn from './LevelBtn';

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelSelect extends cc.Component {
    @property(AudioMgr)
    audioMgr: AudioMgr = null;

    protected start(): void {
        this.audioMgr.playMusic();
    }

    public onEntryLevel(event: cc.Event.EventTouch): void {
        const target = event.target as cc.Node;
        const levelBtn = target.getComponent(LevelBtn);
        if (!levelBtn) {
            return;
        }
        const levelConfig = levelBtn.getLevelInfo();
        this.runGame(levelConfig);
    }

    public runGame(levelConfig: LevelConfig): void {
        const onLaunched = (err, scene: cc.Scene) => {
            if (err) {
                console.error(err);
            } else {
                const gameMgr = scene.getComponentInChildren(GameMgr);
                gameMgr.initGamePanel(levelConfig);
            }
        };
        cc.director.loadScene('Game', onLaunched);
    }

    public backToMenu(): void {
        // 返回主菜单
        cc.director.loadScene('Menu');
    }

    protected onDestroy(): void {
        this.audioMgr.stopMusic();
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioMgr from "./AudioMgr";
import { UserSettingItemName } from "./const";
import GameSetting from "./GameSetting";
import {  HasLocalData, setLocalData } from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    @property(AudioMgr)
    audioMgr: AudioMgr = null;

    @property(GameSetting)
    gameSetting: GameSetting = null;

    protected onLoad(): void {
        // 检查本地数据
        const hasSettingData = HasLocalData(UserSettingItemName);
        if(!hasSettingData){
            setLocalData(UserSettingItemName, { bgmVolume: 1, effectVolume :1});
        }
    }

    start(): void {
        // 播放背景音乐
        this.audioMgr.playMusic();
    }

    chooseLevel():void{
        // 加载关卡选择场景
        cc.director.loadScene('LevelSelect');
    }

    showSetting():void{
        // 显示设置界面
        // cc.director.loadScene('SettingMenu');
        this.gameSetting.node.active = true;
    }

    closeSetting():void{
        // 关闭设置界面
        // cc.director.loadScene('Menu');
        this.gameSetting.node.active = false;
    }

    protected onDestroy(): void {
        // 暂停背景音乐
        this.audioMgr.stopMusic();
    }
}

// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import AudioMgr from "../AudioMgr";

const {ccclass, property} = cc._decorator;

@ccclass
export default class LevelSelect extends cc.Component {

    @property(AudioMgr)
    audioMgr: AudioMgr = null;

    public  getLevelInfo(level:string): string{
        return '';
    }

    public runGame(level:string): void{
        const info = this.getLevelInfo(level);
        if(info){
            cc.director.loadScene('Game');
        }
    }

    public backToMenu():void{
        // 返回主菜单
        cc.director.loadScene('Menu');
    }
}


// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class AudioMgr extends cc.Component {
    @property(cc.AudioClip)
    bgm: cc.AudioClip = null;

    @property(cc.AudioClip)
    clickAudio: cc.AudioClip = null;

    playMusic():void{
        // 播放背景音乐
        cc.audioEngine.playMusic(this.bgm, true);
    }

    stopMusic():void{
        // 停止背景音乐
        cc.audioEngine.stopMusic();
    }

    pauseMusic():void{
        // 暂停背景音乐
        cc.audioEngine.pauseMusic();
    }

    resumeMusic():void{
        // 恢复背景音乐
        cc.audioEngine.resumeMusic();
    }

    _playEffect(audioClip: cc.AudioClip):void{
        // 播放音效
        cc.audioEngine.playEffect(audioClip, false);
    }

    playClickAudio():void{
        // 播放点击音效
        this._playEffect(this.clickAudio);
    }
}

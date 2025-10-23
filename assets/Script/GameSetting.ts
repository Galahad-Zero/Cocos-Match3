// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import { UserSettingItemName } from './const';
import { UserSetting } from './type/ConfigTypes';
import { getLocalData, setLocalData } from './Utils';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameSetting extends cc.Component {
    @property(cc.Slider)
    bgmVolumeCrl: cc.Slider = null;

    @property(cc.Slider)
    effectVolumeCrl: cc.Slider = null;

    _config: UserSetting = { bgmVolume: 1, effectVolume: 1 };

    protected start(): void {
        this._config = getLocalData<UserSetting>(UserSettingItemName);
        this.bgmVolumeCrl.progress = this._config.bgmVolume;
        this.effectVolumeCrl.progress = this._config.effectVolume;
        this.bindEvents();
    }

    protected bindEvents(): void {
        this.bgmVolumeCrl.node.on('slide', this.onBgmVolumeChange, this);
        this.effectVolumeCrl.node.on('slide', this.onEffectVolumeChange, this);
    }

    onBgmVolumeChange(slider): void {
        this._config.bgmVolume = slider.progress;
        setLocalData(UserSettingItemName, this._config);
        cc.audioEngine.setMusicVolume(this._config.bgmVolume);
    }

    onEffectVolumeChange(slider): void {
        this._config.effectVolume = slider.progress;
        setLocalData(UserSettingItemName, this._config);
        cc.audioEngine.setEffectsVolume(this._config.effectVolume);
    }

    // protected onDestroy(): void {
    //     this.bgmVolumeCrl.node.off('slider', this.onBgmVolumeChange, this);
    //     this.effectVolumeCrl.node.off('slider', this.onEffectVolumeChange, this);
    // }
}

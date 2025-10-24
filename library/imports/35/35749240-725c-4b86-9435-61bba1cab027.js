"use strict";
cc._RF.push(module, '35749JAclxLhpQ1YbuhyrAn', 'Menu');
// Script/Menu.ts

"use strict";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var AudioMgr_1 = require("./AudioMgr");
var const_1 = require("./const");
var GameSetting_1 = require("./GameSetting");
var Utils_1 = require("./Utils");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Menu = /** @class */ (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audioMgr = null;
        _this.gameSetting = null;
        return _this;
    }
    Menu.prototype.onLoad = function () {
        // 检查本地数据
        var hasSettingData = Utils_1.HasLocalData(const_1.UserSettingItemName);
        if (!hasSettingData) {
            Utils_1.setLocalData(const_1.UserSettingItemName, { bgmVolume: 1, effectVolume: 1 });
        }
    };
    Menu.prototype.start = function () {
        // 播放背景音乐
        this.audioMgr.playMusic();
    };
    Menu.prototype.chooseLevel = function () {
        // 加载关卡选择场景
        cc.director.loadScene('LevelSelect');
    };
    Menu.prototype.showSetting = function () {
        // 显示设置界面
        this.gameSetting.node.active = true;
    };
    Menu.prototype.closeSetting = function () {
        // 关闭设置界面
        this.gameSetting.node.active = false;
    };
    Menu.prototype.onDestroy = function () {
        // 暂停背景音乐
        this.audioMgr.stopMusic();
    };
    __decorate([
        property(AudioMgr_1.default)
    ], Menu.prototype, "audioMgr", void 0);
    __decorate([
        property(GameSetting_1.default)
    ], Menu.prototype, "gameSetting", void 0);
    Menu = __decorate([
        ccclass
    ], Menu);
    return Menu;
}(cc.Component));
exports.default = Menu;

cc._RF.pop();
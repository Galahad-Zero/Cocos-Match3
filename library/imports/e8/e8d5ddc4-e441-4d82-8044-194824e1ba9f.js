"use strict";
cc._RF.push(module, 'e8d5d3E5EFNgoBEGUgk4bqf', 'GameUI');
// Script/gamePlay/ui/GameUI.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ccclass, property } = cc._decorator;
let GameUI = class GameUI extends cc.Component {
    constructor() {
        super(...arguments);
        this.scoreLabel = null;
        this.stepCountLabel = null;
        this.gameOverPanel = null;
        this.gameWinPanel = null;
        this._score = 0;
        this._stepCount = 0;
    }
    // 初始化游戏UI
    initGameUI(score, stepCount) {
        this._score = score;
        this._stepCount = stepCount;
        this.scoreLabel.string = this._score.toString();
        this.stepCountLabel.string = this._stepCount.toString();
    }
    // 设置得分
    setScore(score) {
        this.scoreLabel.string = score.toString();
    }
    // 设置步数
    setStepCount(stepCount) {
        this.stepCountLabel.string = stepCount.toString();
    }
    // 减少步数
    decrementStepCount() {
        this._stepCount--;
        this.stepCountLabel.string = this._stepCount.toString();
    }
    // 增加得分
    incrementScore(score) {
        this._score += score;
        this.scoreLabel.string = this._score.toString();
    }
    // 是否还有步数
    haveStepCount() {
        return this._stepCount > 0;
    }
    // 获取得分
    getScore() {
        return this._score;
    }
    showGameOverPanel() {
        this.gameOverPanel.active = true;
    }
    showGameWinPanel() {
        this.gameWinPanel.active = true;
    }
};
__decorate([
    property(cc.Label)
], GameUI.prototype, "scoreLabel", void 0);
__decorate([
    property(cc.Label)
], GameUI.prototype, "stepCountLabel", void 0);
__decorate([
    property(cc.Node)
], GameUI.prototype, "gameOverPanel", void 0);
__decorate([
    property(cc.Node)
], GameUI.prototype, "gameWinPanel", void 0);
GameUI = __decorate([
    ccclass
], GameUI);
exports.default = GameUI;

cc._RF.pop();
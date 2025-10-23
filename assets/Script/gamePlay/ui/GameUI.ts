const { ccclass, property } = cc._decorator;

@ccclass
export default class GameUI extends cc.Component {
    @property(cc.Label)
    scoreLabel: cc.Label = null;

    @property(cc.Label)
    stepCountLabel: cc.Label = null;

    @property(cc.Node)
    gameOverPanel: cc.Node = null;

    @property(cc.Node)
    gameWinPanel: cc.Node = null;

    _score: number = 0;
    _stepCount: number = 0;

    // 初始化游戏UI
    public initGameUI(score: number, stepCount: number): void {
        this._score = score;
        this._stepCount = stepCount;
        this.scoreLabel.string = this._score.toString();
        this.stepCountLabel.string = this._stepCount.toString();
    }

    // 设置得分
    public setScore(score: number): void {
        this.scoreLabel.string = score.toString();
    }

    // 设置步数
    public setStepCount(stepCount: number): void {
        this.stepCountLabel.string = stepCount.toString();
    }

    // 减少步数
    public decrementStepCount(): void {
        this._stepCount--;
        this.stepCountLabel.string = this._stepCount.toString();
    }

    // 增加得分
    public incrementScore(score: number): void {
        this._score += score;
        this.scoreLabel.string = this._score.toString();
    }

    // 是否还有步数
    public haveStepCount(): boolean {
        return this._stepCount > 0;
    }

    // 获取得分
    public getScore(): number {
        return this._score;
    }

    public showGameOverPanel(): void {
        this.gameOverPanel.active = true;
    }

    public showGameWinPanel(): void {
        this.gameWinPanel.active = true;
    }
}

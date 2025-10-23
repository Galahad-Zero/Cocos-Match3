/**
 * GameFsm 使用示例
 * 展示如何在游戏中使用状态机
 */

import GameFsm, { GameState, StateChangeCallback } from './GameFsm';

/**
 * 示例：在 GameMgr 中集成状态机
 */
export class GameFsmUsageExample {
    private gameFsm: GameFsm;

    constructor() {
        // 1. 创建状态机实例，初始状态为 READY
        this.gameFsm = new GameFsm(GameState.READY);

        // 2. 注册状态变化监听
        this.gameFsm.onStateChange(this.onGameStateChange.bind(this));
    }

    /**
     * 状态变化回调
     */
    private onGameStateChange(fromState: GameState, toState: GameState): void {
        console.log(`游戏状态从 ${fromState} 变为 ${toState}`);

        switch (toState) {
            case GameState.READY:
                this.onReady();
                break;
            case GameState.PLAYING:
                this.onPlaying();
                break;
            case GameState.CHECKING:
                this.onChecking();
                break;
            case GameState.ELIMINATING:
                this.onEliminating();
                break;
            case GameState.DROPPING:
                this.onDropping();
                break;
            case GameState.GAME_OVER:
                this.onGameOver();
                break;
            case GameState.GAME_WIN:
                this.onGameWin();
                break;
        }
    }

    /**
     * 开始游戏
     */
    public startGame(): void {
        // 从 READY 转换到 PLAYING
        if (this.gameFsm.changeState(GameState.PLAYING)) {
            console.log('游戏开始！');
        }
    }

    /**
     * 玩家交换方块后
     */
    public onPlayerSwapBlocks(): void {
        // 只有在 PLAYING 状态才能进行操作
        if (this.gameFsm.canPlayerOperate()) {
            // 交换方块后，进入 CHECKING 状态
            this.gameFsm.changeState(GameState.CHECKING);
        }
    }

    /**
     * 检查是否有可消除的方块
     */
    private checkMatches(): void {
        const hasMatches = this.checkIfHasMatches();

        if (hasMatches) {
            // 有匹配，进入消除状态
            this.gameFsm.changeState(GameState.ELIMINATING);
        } else {
            // 没有匹配，回到游玩状态
            this.gameFsm.changeState(GameState.PLAYING);
        }
    }

    /**
     * 消除完成后
     */
    private onEliminateComplete(): void {
        // 检查游戏是否结束
        if (this.isGameWin()) {
            this.gameFsm.changeState(GameState.GAME_WIN);
        } else if (this.isGameOver()) {
            this.gameFsm.changeState(GameState.GAME_OVER);
        } else {
            // 进入掉落状态
            this.gameFsm.changeState(GameState.DROPPING);
        }
    }

    /**
     * 掉落完成后
     */
    private onDropComplete(): void {
        // 掉落完成后，重新检查是否有新的匹配
        this.gameFsm.changeState(GameState.CHECKING);
    }

    /**
     * 重新开始游戏
     */
    public restartGame(): void {
        this.gameFsm.reset();
        this.gameFsm.changeState(GameState.PLAYING);
    }

    // ============= 状态处理方法 =============

    private onReady(): void {
        console.log('准备游戏...');
        // 初始化游戏面板、重置数据等
    }

    private onPlaying(): void {
        console.log('等待玩家操作...');
        // 启用玩家输入
    }

    private onChecking(): void {
        console.log('检查消除...');
        // 执行消除检查逻辑
        this.checkMatches();
    }

    private onEliminating(): void {
        console.log('执行消除...');
        // 播放消除动画、计算分数、触发特殊效果等
        // 动画完成后调用
        this.scheduleOnce(() => {
            this.onEliminateComplete();
        }, 0.5);
    }

    private onDropping(): void {
        console.log('方块掉落...');
        // 执行掉落逻辑、生成新方块等
        // 掉落完成后调用
        this.scheduleOnce(() => {
            this.onDropComplete();
        }, 0.5);
    }

    private onGameOver(): void {
        console.log('游戏失败！');
        // 显示失败界面
    }

    private onGameWin(): void {
        console.log('游戏胜利！');
        // 显示胜利界面
    }

    // ============= 辅助方法（示例） =============

    private checkIfHasMatches(): boolean {
        // 实际的消除检查逻辑
        return true;
    }

    private isGameWin(): boolean {
        // 检查是否达成胜利条件
        return false;
    }

    private isGameOver(): boolean {
        // 检查是否游戏结束
        return false;
    }

    private scheduleOnce(callback: Function, delay: number): void {
        // 模拟延迟调用
        setTimeout(callback, delay * 1000);
    }

    /**
     * 销毁时清理
     */
    public destroy(): void {
        this.gameFsm.destroy();
    }
}

/**
 * 使用示例 2：直接使用状态机
 */
export function directUsageExample() {
    // 创建状态机
    const fsm = new GameFsm();

    // 监听状态变化
    const stateChangeHandler: StateChangeCallback = (from, to) => {
        console.log(`状态变化: ${from} -> ${to}`);
    };
    fsm.onStateChange(stateChangeHandler);

    // 状态转换
    fsm.changeState(GameState.PLAYING); // READY -> PLAYING
    fsm.changeState(GameState.CHECKING); // PLAYING -> CHECKING
    fsm.changeState(GameState.ELIMINATING); // CHECKING -> ELIMINATING
    fsm.changeState(GameState.DROPPING); // ELIMINATING -> DROPPING
    fsm.changeState(GameState.CHECKING); // DROPPING -> CHECKING

    // 检查状态
    if (fsm.isState(GameState.CHECKING)) {
        console.log('当前正在检查状态');
    }

    // 检查是否可以进行玩家操作
    if (fsm.canPlayerOperate()) {
        console.log('玩家可以操作');
    } else {
        console.log('玩家不能操作');
    }

    // 检查游戏是否活跃
    if (fsm.isGameActive()) {
        console.log('游戏正在进行中');
    }

    // 检查是否可以转换到某个状态
    if (fsm.canTransitionTo(GameState.PLAYING)) {
        console.log('可以转换到 PLAYING 状态');
    }

    // 移除监听
    fsm.offStateChange(stateChangeHandler);

    // 销毁状态机
    fsm.destroy();
}

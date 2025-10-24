"use strict";
cc._RF.push(module, 'cea7bT4edhLnIlAunX1zEM2', 'GameFsm');
// Script/gamePlay/common/GameFsm.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
/**
 * 游戏状态枚举
 * 定义游戏的所有可能状态
 */
var GameState;
(function (GameState) {
    /** 准备完成 */
    GameState["READY"] = "ready";
    /** 游玩中 */
    GameState["PLAYING"] = "playing";
    /** 检查消除 */
    GameState["CHECKING"] = "checking";
    /** 消除,并释放特性 */
    GameState["ELIMINATING"] = "eliminating";
    /** 随机产生并掉落 */
    GameState["DROPPING"] = "dropping";
    /** 游戏结束 */
    GameState["GAME_OVER"] = "gameOver";
    /** 过关 */
    GameState["GAME_WIN"] = "gameWin";
})(GameState = exports.GameState || (exports.GameState = {}));
/**
 * 游戏状态机
 * 管理游戏的状态转换和状态相关的逻辑
 */
class GameFsm {
    constructor(initialState = GameState.READY) {
        /** 状态变化回调列表 */
        this._stateChangeCallbacks = [];
        this._currentState = initialState;
        this._stateTransitions = new Map();
        this._initStateTransitions();
    }
    /**
     * 初始化状态转换规则
     * 定义每个状态可以转换到哪些状态
     */
    _initStateTransitions() {
        // Ready 状态可以转换到 Playing
        this._stateTransitions.set(GameState.READY, [GameState.PLAYING]);
        // Playing 状态可以转换到 Checking、GameOver、GameWin
        this._stateTransitions.set(GameState.PLAYING, [
            GameState.CHECKING,
            GameState.GAME_OVER,
            GameState.GAME_WIN,
        ]);
        // Checking 状态可以转换到 Playing、Eliminating、GameOver、GameWin
        this._stateTransitions.set(GameState.CHECKING, [
            GameState.PLAYING,
            GameState.ELIMINATING,
            GameState.GAME_OVER,
            GameState.GAME_WIN,
        ]);
        // Eliminating 状态可以转换到 Dropping、GameOver、GameWin
        this._stateTransitions.set(GameState.ELIMINATING, [
            GameState.DROPPING,
            GameState.GAME_OVER,
            GameState.GAME_WIN,
        ]);
        // Dropping 状态可以转换到 Checking、GameOver、GameWin
        this._stateTransitions.set(GameState.DROPPING, [
            GameState.CHECKING,
            GameState.GAME_OVER,
            GameState.GAME_WIN,
        ]);
        // GameOver 和 GameWin 是终止状态，只能转换到 Ready (重新开始)
        this._stateTransitions.set(GameState.GAME_OVER, [GameState.READY]);
        this._stateTransitions.set(GameState.GAME_WIN, [GameState.READY]);
    }
    /**
     * 获取当前状态
     */
    get currentState() {
        return this._currentState;
    }
    /**
     * 检查是否可以从当前状态转换到目标状态
     * @param toState 目标状态
     * @returns 是否可以转换
     */
    canTransitionTo(toState) {
        const allowedStates = this._stateTransitions.get(this._currentState);
        return allowedStates ? allowedStates.includes(toState) : false;
    }
    /**
     * 转换到新状态
     * @param newState 新状态
     * @param force 是否强制转换（忽略转换规则）
     * @returns 是否转换成功
     */
    changeState(newState, force = false) {
        // 如果状态相同，不执行转换
        if (this._currentState === newState) {
            console.warn(`[GameFsm] 已经处于状态: ${newState}`);
            return false;
        }
        // 检查是否允许转换
        if (!force && !this.canTransitionTo(newState)) {
            console.warn(`[GameFsm] 无法从状态 ${this._currentState} 转换到 ${newState}`);
            return false;
        }
        const oldState = this._currentState;
        this._currentState = newState;
        console.log(`[GameFsm] 状态转换: ${oldState} -> ${newState}`);
        // 触发状态变化回调
        this._notifyStateChange(oldState, newState);
        return true;
    }
    /**
     * 注册状态变化回调
     * @param callback 回调函数
     */
    onStateChange(callback) {
        if (!this._stateChangeCallbacks.includes(callback)) {
            this._stateChangeCallbacks.push(callback);
        }
    }
    /**
     * 移除状态变化回调
     * @param callback 回调函数
     */
    offStateChange(callback) {
        const index = this._stateChangeCallbacks.indexOf(callback);
        if (index !== -1) {
            this._stateChangeCallbacks.splice(index, 1);
        }
    }
    /**
     * 通知所有监听者状态已改变
     * @param fromState 原状态
     * @param toState 新状态
     */
    _notifyStateChange(fromState, toState) {
        this._stateChangeCallbacks.forEach((callback) => {
            try {
                callback(fromState, toState);
            }
            catch (error) {
                console.error('[GameFsm] 状态变化回调执行错误:', error);
            }
        });
    }
    /**
     * 检查是否处于某个状态
     * @param state 要检查的状态
     */
    isState(state) {
        return this._currentState === state;
    }
    /**
     * 检查是否处于游戏进行中的状态（非结束状态）
     */
    isGameActive() {
        return (this._currentState !== GameState.GAME_OVER &&
            this._currentState !== GameState.GAME_WIN &&
            this._currentState !== GameState.READY);
    }
    /**
     * 检查是否可以进行玩家操作
     */
    canPlayerOperate() {
        return this._currentState === GameState.PLAYING;
    }
    /**
     * 重置状态机到初始状态
     */
    reset() {
        const oldState = this._currentState;
        this._currentState = GameState.READY;
        console.log(`[GameFsm] 状态机重置到: ${GameState.READY}`);
        this._notifyStateChange(oldState, GameState.READY);
    }
    /**
     * 清理状态机，移除所有回调
     */
    destroy() {
        this._stateChangeCallbacks = [];
        console.log('[GameFsm] 状态机已销毁');
    }
}
exports.default = GameFsm;

cc._RF.pop();
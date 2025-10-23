import BlockMgr from './BlockMgr';
import PlayPanel from './PlayPanel';
import { Direction, TOUCH_BLOCK_EVENT } from './GameConst';
import TouchHandler, {
    TouchDetailEvent,
    TouchDetailEventType,
} from './TouchHandler';
import {
    BlockConfig,
    BlockSpecialType,
    BlockType,
    EliminateCheckInfo,
    EliminateScore,
    GameCheckInfo,
    LevelConfig,
    Location,
} from './Types';
import { getSwapLocation, isNeighborLocation } from './common/GameUtils';
import GameFsm, { GameState } from './GameFsm';
import { stringifyLocation } from './common/Grid';
import {
    releaseSpecialBlock,
    specialBlockGenerator,
} from './common/EliminateUtils';
import GameUI from './ui/GameUI';
import EffectMgr from './effects/EffectMgr';
import AudioMgr from '../AudioMgr';

const { ccclass, property } = cc._decorator;

const testLevelConfig: LevelConfig = {
    stepLimit: 10,
    targetScore: 100,
    gameMap: {
        width: 6,
        height: 8,
        blocks: {
            '0,0': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '0,1': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '0,2': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '0,3': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '0,4': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '0,5': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '1,0': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '1,1': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '1,2': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '1,3': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '1,4': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '1,5': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '2,0': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '2,1': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '2,2': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '2,3': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '2,4': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '2,5': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '3,0': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '3,1': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '3,2': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '3,3': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '3,4': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '3,5': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '4,0': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '4,1': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '4,2': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '4,3': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '4,4': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '4,5': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '5,0': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '5,1': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '5,2': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '5,3': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '5,4': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '5,5': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '6,0': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '6,1': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '6,2': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '6,3': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '6,4': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '6,5': {
                type: BlockType.BLOCK_TYPE_3,
                special: BlockSpecialType.NONE,
            },
            '7,0': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '7,1': {
                type: BlockType.BLOCK_TYPE_1,
                special: BlockSpecialType.NONE,
            },
            '7,2': {
                type: BlockType.BLOCK_TYPE_4,
                special: BlockSpecialType.NONE,
            },
            '7,3': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
            '7,4': {
                type: BlockType.BLOCK_TYPE_5,
                special: BlockSpecialType.NONE,
            },
            '7,5': {
                type: BlockType.BLOCK_TYPE_2,
                special: BlockSpecialType.NONE,
            },
        },
    },
};

@ccclass
export default class GameMgr extends cc.Component {
    @property(PlayPanel)
    playPanel: PlayPanel = null;

    @property(GameUI)
    gameUI: GameUI = null;

    @property(TouchHandler)
    touchHandler: TouchHandler = null;

    @property(BlockMgr)
    blockMgr: BlockMgr = null;

    @property(EffectMgr)
    effectMgr: EffectMgr = null;

    @property(AudioMgr)
    audioMgr: AudioMgr = null;

    _selectedLocation: Location = null;

    _gameFsm: GameFsm = null;
    _gameCheckInfo: GameCheckInfo = null;

    protected onLoad(): void {
        this._gameFsm = new GameFsm(GameState.READY);
        this._gameFsm.onStateChange(this.onStateChange.bind(this));
        this.touchHandler.node.on(TOUCH_BLOCK_EVENT, this.onTouchEvent, this);
    }

    protected start(): void {
        this.audioMgr.playMusic();
    }

    public initGamePanel(levelConfig: LevelConfig): void {
        this.playPanel.initGamePanel(
            levelConfig,
            this.blockMgr,
            this.effectMgr
        );
        this.gameUI.initGameUI(0, levelConfig.stepLimit);
        // 初始化游戏面板后，转换到游玩状态
        this._gameFsm.changeState(GameState.PLAYING);
    }

    /**
     * 游戏状态改变回调
     *
     * @param fromState 当前状态
     * @param toState 新状态
     */
    public onStateChange(fromState: GameState, toState: GameState): void {
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

    public onTouchEvent(event: TouchDetailEvent): void {
        // 非玩家操作 或 没有步数
        if (!this._gameFsm.canPlayerOperate() || !this.gameUI.haveStepCount()) {
            return;
        }
        // 玩家可操作
        const { type, location } = event;
        if (type === TouchDetailEventType.click) {
            this.onClickBlock(location);
        } else if (type === TouchDetailEventType.drag) {
            this.onDragBlock(location, event.direction || Direction.NONE);
        }
    }

    // 点击方块
    protected onClickBlock(location: Location): void {
        if (!this._selectedLocation) {
            this._selectedLocation = location;
            return;
        }
        // 点击方块
        const isSameBlock =
            this._selectedLocation.row === location.row &&
            this._selectedLocation.column === location.column;
        if (isSameBlock) {
            // 点击同一个方块，取消选中
            this._selectedLocation = null;
            return;
        }
        const isNeighbor = isNeighborLocation(this._selectedLocation, location);
        if (isNeighbor) {
            // 点击相邻方块，交换方块
            this.swapBlocks(this._selectedLocation, location);
            this._selectedLocation = null;
        } else {
            // 点击非相邻方块，更新选中
            this._selectedLocation = location;
        }
    }

    // 拖动方块
    protected onDragBlock(location: Location, direction: Direction): void {
        const swapLocation = getSwapLocation(location, direction);
        if (this.playPanel.isInBounds(swapLocation)) {
            // 以交换后的方块位置优先级更高
            this.swapBlocks(swapLocation, location);
        }
        this._selectedLocation = null;
    }

    protected swapBlocks(location1: Location, location2: Location): void {
        this._gameCheckInfo = this.generatetBaseGameCheckInfo();
        // 交换方块
        this._gameCheckInfo.checkBlockEntry = [location1, location2];
        // 1. 交换方块
        const gameMapInfo = this._gameCheckInfo.gameMapInfo;
        const tempConfig = gameMapInfo[location2.row][location2.column];
        gameMapInfo[location2.row][location2.column] =
            gameMapInfo[location1.row][location1.column];
        gameMapInfo[location1.row][location1.column] = tempConfig;

        this._gameCheckInfo.swapBlocks = [location1, location2];
        this.audioMgr.playSwapAudio();
        // 减少步数
        // 转换到检查消除状态
        this._gameFsm.changeState(GameState.CHECKING);
        // 2. 规则检查
        // 3. 撤回 或 消除
        // 4. 掉落 执行第 2 步
        // 5. 结束
    }

    public onReady(): void {
        console.log('游戏状态准备完成');
    }

    public onPlaying(): void {
        console.log('游戏状态游玩中');
        this._gameCheckInfo = null;
        this.touchHandler.setEnabled(true);
    }

    public onChecking(): void {
        // 检查消除,并标记可消除方块
        // console.log('游戏状态检查消除');
        this.touchHandler.setEnabled(false);

        const excludeLocations = [];
        for (const entry of this._gameCheckInfo.checkBlockEntry) {
            const contiguousLocations = this.playPanel.getContiguousBlocks(
                entry,
                this._gameCheckInfo.gameMapInfo,
                excludeLocations
            );
            // 如果连续方块数量大于等于3，则标记为可消除
            if (contiguousLocations.length >= 3) {
                // 将可消除方块加入排除列表
                excludeLocations.push(...contiguousLocations);
                // 将可消除方块加入可消除方块数组
                this._gameCheckInfo.canEliminateCheckInfos.push({
                    entryLocation: entry,
                    eliminateBlockType: BlockSpecialType.NONE,
                    contiguousLocations,
                });
            }
        }
        if (this._gameCheckInfo.canEliminateCheckInfos.length > 0) {
            // 减少步数
            this._gameCheckInfo.swapBlocks && this.gameUI.decrementStepCount();
            // 转换到消除状态
            this._gameFsm.changeState(GameState.ELIMINATING);
        } else {
            if (this._gameCheckInfo.swapBlocks) {
                const [location1, location2] = this._gameCheckInfo.swapBlocks;
                // 方块交换再还原
                this.playPanel.swapAndBackBlocks(location1, location2, () => {
                    // 没有可消除方块，方块交换再还原，转换到游玩状态
                    this._gameFsm.changeState(GameState.PLAYING);
                });
            } else {
                // 没有可消除方块 且 没有交换方块，检查游戏是否结束
                this.checkGameOver();
            }
        }
    }

    public onEliminating(): void {
        // 获取已经消除的方块
        const alreadyEliminateBlocks: Array<Location> =
            this._gameCheckInfo.canEliminateCheckInfos.reduce((acc, info) => {
                return acc.concat(info.contiguousLocations);
            }, [] as Array<Location>);
        // 消除方块,并释放特性
        for (const eliminateCheckInfo of this._gameCheckInfo
            .canEliminateCheckInfos) {
            // 生成特殊方块
            specialBlockGenerator(eliminateCheckInfo, this._gameCheckInfo);
            // 释放特性, 消除额外方块
            releaseSpecialBlock(
                eliminateCheckInfo,
                alreadyEliminateBlocks,
                this._gameCheckInfo
            );
        }
        // 计算得分
        let score = 0;
        for (const eliminateCheckInfo of this._gameCheckInfo
            .canEliminateCheckInfos) {
            const blockCount = eliminateCheckInfo.contiguousLocations.length;
            // 基础得分
            score += EliminateScore.EliminateBlockScore * blockCount;
            // 特殊得分
            switch (eliminateCheckInfo.eliminateBlockType) {
                case BlockSpecialType.ROW:
                    score += EliminateScore.Base4RowScore;
                    break;
                case BlockSpecialType.COLUMN:
                    score += EliminateScore.Base4ColumnScore;
                    break;
                case BlockSpecialType.BOOM:
                    score += EliminateScore.Irregular5Score;
                    break;
                case BlockSpecialType.SPECIAL_BOOM:
                    score += EliminateScore.Base5Score;
                    break;
            }
        }
        // 连锁加成
        score *= this._gameCheckInfo.chainCount;
        // 增加得分
        this.gameUI.incrementScore(score);
        // 消除方块,并执行动画
        this.effectMgr.playComboAudio(this._gameCheckInfo.chainCount);
        this.playPanel.eliminateBlocks(this._gameCheckInfo, () => {
            this._gameFsm.changeState(GameState.DROPPING);
        });
        // console.log('游戏状态消除,并释放特性');
        // this._gameFsm.changeState(GameState.DROPPING);
    }

    public onDropping(): void {
        // 随机产生并掉落方块
        // 1. 生成特殊方块
        this.playPanel.generateNewSpecialBlocks(this._gameCheckInfo);
        // 2. 掉落随机方块补齐位置
        this.playPanel.dropRandomBlocks((entryList: Array<Location>) => {
            const baseGameCheckInfo = this.generatetBaseGameCheckInfo();
            baseGameCheckInfo.checkBlockEntry = entryList;
            // 连锁次数 + 1
            baseGameCheckInfo.chainCount = this._gameCheckInfo.chainCount + 1;
            this._gameCheckInfo = baseGameCheckInfo;
            console.log('drop check: ', this._gameCheckInfo);
            this._gameFsm.changeState(GameState.CHECKING);
        });
    }

    public onGameOver(): void {
        // 显示游戏结束界面
        this.gameUI.showGameOverPanel();
        this.audioMgr.stopMusic();
        this.touchHandler.setEnabled(false);
    }

    public onGameWin(): void {
        // 显示过关界面
        this.gameUI.showGameWinPanel();
        this.audioMgr.stopMusic();
        this.touchHandler.setEnabled(false);
    }

    /**
     * 检查游戏是否结束
     */
    public checkGameOver(): void {
        const curScore = this.gameUI.getScore();
        const targetScore = this.playPanel.getLevelConfig().targetScore;
        if (curScore >= targetScore) {
            // 得分大于等于目标分数，游戏胜利
            this._gameFsm.changeState(GameState.GAME_WIN);
        }
        // 检查游戏是否结束, 还有步数则继续游戏，否则游戏结束
        else if (this.gameUI.haveStepCount()) {
            const { chainCount } = this._gameCheckInfo;
            this.effectMgr.playCommentAudio(chainCount - 1);
            // 还有步数，继续游戏
            this._gameFsm.changeState(GameState.PLAYING);
        } else {
            // 没有步数，游戏结束
            this._gameFsm.changeState(GameState.GAME_OVER);
        }
    }

    public backToLevelSelect(): void {
        cc.director.loadScene('LevelSelect');
    }

    public generatetBaseGameCheckInfo(): GameCheckInfo {
        // 生成基础游戏检查信息
        const gameMapInfo = this.playPanel.getBlockMapInfo();
        const checkBlockEntry: Location[] = [];
        const canEliminateBlocks: Array<EliminateCheckInfo> = [];
        const eliminateScore = 0;
        const newSpecailBlocks: Record<string, BlockConfig> = {};
        return {
            gameMapInfo,
            checkBlockEntry,
            swapBlocks: null,
            chainCount: 1,
            canEliminateCheckInfos: canEliminateBlocks,
            eliminateScore,
            newSpecailBlocks,
        };
    }

    protected onDestroy(): void {
        cc.audioEngine.stopAllEffects();
        cc.audioEngine.stopMusic();
    }
}

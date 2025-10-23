import BaseBlock from './block/BaseBlock';

export type Location = { row: number; column: number };

// 方块样式
export enum BlockType {
    BLOCK_TYPE_1 = 1,
    BLOCK_TYPE_2 = 2,
    BLOCK_TYPE_3 = 3,
    BLOCK_TYPE_4 = 4,
    BLOCK_TYPE_5 = 5,
}

// 方块类型
export enum BlockSpecialType {
    NONE = 'none', // 普通方块
    ROW = 'row', // 行消除
    COLUMN = 'column', // 列消除
    BOOM = 'boom', // 炸弹
    SPECIAL_BOOM = 'special_boom', // 特殊炸弹
}

// 消除类型
export enum EliminateType {
    BASE_3 = 'base_3', // 基础3连消
    BASE_4_ROW = 'base_4_row', // 基础4连消行
    BASE_4_COLUMN = 'base_4_column', // 基础4连消列
    BASE_5 = 'base_5', // 基础5连消
    IRREGULAR_5 = 'irregular_5', // 异形5连消
}

// 游戏配置
export interface GameConfig {
    level: string;
    levelConfig: LevelConfig;
}

// 关卡配置
export interface LevelConfig {
    stepLimit: number; // 步数限制
    targetScore: number; // 目标分数
    gameMap: GameMap; // 游戏地图
}

// 游戏地图
export interface GameMap {
    width: number; // 行数
    height: number; // 列数
    blocks: Record<string, BlockConfig>; // 方块
}

// 方块
export interface BlockConfig {
    type: BlockType; // 方块样式
    special: BlockSpecialType; // 方块特殊类型
}

/**
 * 游戏检查信息
 * @param gameMapInfo 游戏地图信息
 * @param checkBlockEntry 检查方块入口
 * @param swapBlocks 交换方块
 * @param eliminateScore 消除得分
 * @param canEliminateCheckInfos 可消除方块检查信息
 * @param newSpecailBlocks 新特殊方块
 */
export interface GameCheckInfo {
    gameMapInfo: Array<Array<BlockConfig>>; // 游戏地图信息
    checkBlockEntry: Location[]; // 检查方块入口
    swapBlocks: [Location, Location] | null; // 交换方块, 如果为 null，则表示没有交换方块
    eliminateScore: number; // 消除得分
    canEliminateCheckInfos: Array<EliminateCheckInfo>; // 可消除方块检查信息
    newSpecailBlocks: Record<string, BlockConfig>; // 新特殊方块
}

/**
 * 可消除方块检查信息
 * @param entryLocation 检查方块入口
 * @param eliminateBlockType 特殊方块类型
 * @param contiguousLocations 连续方块
 */
export interface EliminateCheckInfo {
    entryLocation: Location; // 检查方块入口
    eliminateBlockType: BlockSpecialType; // 特殊方块类型
    contiguousLocations: Array<Location>; // 连续方块
}

/**
 * 消除方块信息
 * @param location 方块位置
 * @param blockConfig 方块配置
 */
export interface EliminateBlockInfo {
    location: Location; // 方块位置
    blockConfig: BlockConfig; // 方块配置
}

/**
 * 方块掉落信息
 * @param location 方块位置
 * @param block 方块
 * @param dropTime 掉落时间
 * @param targetLocation 目标位置
 */
export interface BlockDropInfo {
    location: Location; // 方块位置
    block: BaseBlock; // 方块
    dropTime: number; // 掉落时间
    targetDropLocation: Location; // 目标掉落位置
}

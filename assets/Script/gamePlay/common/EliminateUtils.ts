import {
    EliminateBlockInfo,
    EliminateType,
    Location,
    BlockConfig,
    BlockSpecialType,
    EliminateCheckInfo,
    GameCheckInfo,
} from '../Types';
import { isLocationEqual } from './GameUtils';
import { stringifyLocation } from './Grid';

/**
 * 获取消除类型
 * @param entry 检查方块入口
 * @param eliminateBlockInfos 消除方块信息
 * @returns 消除类型
 */
export function getEliminateType(
    entry: Location,
    eliminateBlockInfos: Array<EliminateBlockInfo>
): EliminateType {
    const rowCount = eliminateBlockInfos.reduce((acc, info) => {
        return acc + (info.location.row === entry.row ? 1 : 0);
    }, 0);
    const columnCount = eliminateBlockInfos.reduce((acc, info) => {
        return acc + (info.location.column === entry.column ? 1 : 0);
    }, 0);

    // 彩色炸弹
    if (rowCount >= 5) {
        // Base_5
        return EliminateType.BASE_5;
    } else if (columnCount >= 5) {
        // Base_5
        return EliminateType.BASE_5;
    }

    // 基础4连消
    if (rowCount === 4) {
        if (columnCount >= 3) {
            // IRREGULAR_5
            return EliminateType.IRREGULAR_5;
        } else {
            // Base_4
            return EliminateType.BASE_4_ROW;
        }
    } else if (columnCount === 4) {
        if (rowCount >= 3) {
            // IRREGULAR_5
            return EliminateType.IRREGULAR_5;
        } else {
            // Base_4
            return EliminateType.BASE_4_COLUMN;
        }
    }

    // 基础3连消
    if (rowCount === 3) {
        if (columnCount >= 3) {
            // IRREGULAR_5
            return EliminateType.IRREGULAR_5;
        } else {
            // Base_3
            return EliminateType.BASE_3;
        }
    } else if (columnCount === 3) {
        if (rowCount >= 3) {
            // IRREGULAR_5
            return EliminateType.IRREGULAR_5;
        } else {
            // Base_3
            return EliminateType.BASE_3;
        }
    }
}

/**
 * 生成特殊方块
 * @param blockConfig 方块配置
 * @param eliminateType 消除类型
 * @returns 特殊方块配置
 */
export function generateSpecialBlock(
    blockConfig: BlockConfig,
    eliminateType: EliminateType
): BlockConfig {
    // 基础3连消不生成特殊方块
    if (eliminateType === EliminateType.BASE_3) return null;

    const baseBlockConfig = {
        type: blockConfig.type,
        special: BlockSpecialType.NONE,
    };
    switch (eliminateType) {
        case EliminateType.BASE_4_ROW:
            baseBlockConfig.special = BlockSpecialType.ROW;
            break;
        case EliminateType.BASE_4_COLUMN:
            baseBlockConfig.special = BlockSpecialType.COLUMN;
            break;
        case EliminateType.BASE_5:
            baseBlockConfig.special = BlockSpecialType.SPECIAL_BOOM;
            break;
        case EliminateType.IRREGULAR_5:
            baseBlockConfig.special = BlockSpecialType.BOOM;
            break;
        default:
            return null;
    }
    return baseBlockConfig;
}

/**
 * 特殊方块生成器,生成特殊方块信息,并保存到游戏检查信息中
 * @param eliminateCheckInfo 消除检查信息
 * @param gameCheckInfo 游戏检查信息
 */
export function specialBlockGenerator(
    eliminateCheckInfo: EliminateCheckInfo,
    gameCheckInfo: GameCheckInfo
): void {
    // 如果是特殊消除类型,则不生成特殊方块
    if (eliminateCheckInfo.eliminateBlockType !== BlockSpecialType.NONE) return;
    const eliminateBlockInfos: Array<EliminateBlockInfo> =
        eliminateCheckInfo.contiguousLocations.reduce((acc, location) => {
            const blockConfig =
                gameCheckInfo.gameMapInfo[location.row][location.column];
            return acc.concat({
                location,
                blockConfig,
            });
        }, [] as Array<EliminateBlockInfo>);

    //入口方块位置
    const entryLocation = eliminateCheckInfo.entryLocation;
    // 获取消除类型
    const eliminateType = getEliminateType(entryLocation, eliminateBlockInfos);
    // 生成特殊方块
    if (eliminateType === EliminateType.BASE_3) return;
    const blockConfig =
        gameCheckInfo.gameMapInfo[entryLocation.row][entryLocation.column];
    // 生成特殊方块
    const newSpecailBlock = generateSpecialBlock(blockConfig, eliminateType);
    if (newSpecailBlock) {
        // 保存特殊方块信息
        const location = stringifyLocation(
            entryLocation.row,
            entryLocation.column
        );
        gameCheckInfo.newSpecailBlocks[location] = newSpecailBlock;
    }
}

/**
 * 释放特殊方块，根据消除的类型，释放其他方块
 * @param specialBlockConfig 特殊方块配置
 * @param gameCheckInfo 游戏检查信息
 */
export function releaseSpecialBlock(
    eliminateCheckInfo: EliminateCheckInfo,
    alreadyEliminateBlocks: Array<Location>,
    gameCheckInfo: GameCheckInfo
): void {
    // 获取消除方块信息
    const eliminateBlockInfos: Array<EliminateBlockInfo> =
        eliminateCheckInfo.contiguousLocations.reduce((acc, location) => {
            const blockConfig =
                gameCheckInfo.gameMapInfo[location.row][location.column];
            return acc.concat({
                location,
                blockConfig,
            });
        }, [] as Array<EliminateBlockInfo>);

    // 释放特性
    const specialBlockConfig = eliminateBlockInfos.filter(
        (info) => info.blockConfig.special !== BlockSpecialType.NONE
    );
    const entryLocation = eliminateCheckInfo.entryLocation;
    // 遍历特殊方块
    while (specialBlockConfig.length > 0) {
        let extraEliminateLocations: Array<Location> = [];

        const specialBlockInfo = specialBlockConfig.shift();
        if (specialBlockInfo.blockConfig.special === BlockSpecialType.ROW) {
            // 行消除
            const targetRow = specialBlockInfo.location.row;
            const colCount = gameCheckInfo.gameMapInfo[targetRow].length;
            // 受影响的方块位置
            const effectedLocations: Location[] = new Array(colCount)
                .fill(null)
                .map((_, index) => ({
                    row: targetRow,
                    column: index,
                }));
            // 需要额外消除的方块位置
            extraEliminateLocations = effectedLocations.filter(
                (location) =>
                    !alreadyEliminateBlocks.some((l) =>
                        isLocationEqual(l, location)
                    )
            );
        } else if (
            specialBlockInfo.blockConfig.special === BlockSpecialType.COLUMN
        ) {
            // 列消除
            const targetColumn = specialBlockInfo.location.column;
            const rowCount = gameCheckInfo.gameMapInfo.length;
            // 受影响的方块位置
            const effectedLocations: Location[] = new Array(rowCount)
                .fill(null)
                .map((_, index) => ({
                    row: index,
                    column: targetColumn,
                }));
            // 需要额外消除的方块位置
            extraEliminateLocations = effectedLocations.filter(
                (location) =>
                    !alreadyEliminateBlocks.some((l) =>
                        isLocationEqual(l, location)
                    )
            );
        } else if (
            specialBlockInfo.blockConfig.special === BlockSpecialType.BOOM
        ) {
            // 3 * 3 消除
            const centerLocation = specialBlockInfo.location;
            const effectLocations: Location[] = [];

            const isInRange = (row: number, column: number) => {
                return (
                    row >= 0 &&
                    row < gameCheckInfo.gameMapInfo.length &&
                    column >= 0 &&
                    column < gameCheckInfo.gameMapInfo[0].length
                );
            };

            // 3 * 3 消除，遍历3 * 3 范围内的方块
            const rowOffsetList = [-1, 0, 1];
            const columnOffsetList = [-1, 0, 1];
            for (const row of rowOffsetList) {
                for (const column of columnOffsetList) {
                    const targetRow = centerLocation.row + row;
                    const targetColumn = centerLocation.column + column;
                    if (isInRange(targetRow, targetColumn)) {
                        effectLocations.push({
                            row: targetRow,
                            column: targetColumn,
                        });
                    }
                }
            }
            // 四个角落的方块
            const offsetList = [
                cc.v2(2, 0),
                cc.v2(0, 2),
                cc.v2(-2, 0),
                cc.v2(0, -2),
            ];
            for (const offset of offsetList) {
                const targetRow = centerLocation.row + offset.x;
                const targetColumn = centerLocation.column + offset.y;
                if (isInRange(targetRow, targetColumn)) {
                    effectLocations.push({
                        row: targetRow,
                        column: targetColumn,
                    });
                }
                // 需要额外消除的方块位置
                extraEliminateLocations = effectLocations.filter(
                    (location) =>
                        !alreadyEliminateBlocks.some((l) =>
                            isLocationEqual(l, location)
                        )
                );
            }
        } else if (
            specialBlockInfo.blockConfig.special ===
            BlockSpecialType.SPECIAL_BOOM
        ) {
            // 同类消除
            const entryBlockConfig =
                gameCheckInfo.gameMapInfo[entryLocation.row][
                    entryLocation.column
                ];
            const targetType = entryBlockConfig.type;
            // 受影响的方块位置
            const effectLocations: Location[] = [];
            // 遍历游戏地图信息
            for (let row = 0; row < gameCheckInfo.gameMapInfo.length; row++) {
                const rowBlocks = gameCheckInfo.gameMapInfo[row];
                for (let col = 0; col < rowBlocks.length; col++) {
                    const block = rowBlocks[col];
                    if (block.type === targetType) {
                        effectLocations.push({
                            row,
                            column: col,
                        });
                    }
                }
            }

            // 需要额外消除的方块位置
            extraEliminateLocations = effectLocations.filter(
                (location) =>
                    !alreadyEliminateBlocks.some((l) =>
                        isLocationEqual(l, location)
                    )
            );
        }

        // 获取需要额外消除的方块
        const extraEliminateBlockInfos: Array<EliminateBlockInfo> =
            extraEliminateLocations.reduce((acc, location) => {
                const blockConfig =
                    gameCheckInfo.gameMapInfo[location.row][location.column];
                const blockInfo: EliminateBlockInfo = {
                    location,
                    blockConfig,
                };
                if (blockConfig.special !== BlockSpecialType.NONE) {
                    // 是否是特殊方块,是则加入特殊方块数组,进一步处理
                    specialBlockConfig.push(blockInfo);
                }
                return acc.concat(blockInfo);
            }, [] as Array<EliminateBlockInfo>);
        // 加入可消除方块检查信息
        gameCheckInfo.canEliminateCheckInfos.push({
            entryLocation: specialBlockInfo.location,
            eliminateBlockType: specialBlockInfo.blockConfig.special,
            contiguousLocations: extraEliminateBlockInfos.map(
                (info) => info.location
            ),
        });

        // 将需要额外消除的方块加入已消除方块集合
        alreadyEliminateBlocks.push(...extraEliminateLocations);
    }
}

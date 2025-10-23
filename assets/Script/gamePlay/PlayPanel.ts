import BaseBlock from './block/BaseBlock';
import BlockMgr from './BlockMgr';
import Grid, { parseLocation } from './common/Grid';
import { getRandomBlockConfig, isLocationEqual } from './common/GameUtils';
import {
    BlockConfig,
    BlockDropInfo,
    BlockType,
    GameCheckInfo,
    LevelConfig,
    Location,
} from './Types';

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayPanel extends cc.Component {
    @property(cc.Node)
    gridRootNode: cc.Node = null;

    @property({
        displayName: '网格行数',
        min: 1,
        step: 1,
    })
    rowCount: number = 6;

    @property({
        displayName: '网格列数',
        min: 1,
        step: 1,
    })
    columnCount: number = 8;

    @property({
        displayName: '网格单位宽度',
    })
    cellWidth: number = 70;

    @property({
        displayName: '网格单位高度',
    })
    cellHeight: number = 70;

    @property({
        displayName: '网格单位间距',
    })
    cellSpacing: number = 2;

    _grid: Grid<BaseBlock> = null;
    _blockMgr: BlockMgr = null;
    _levelConfig: LevelConfig = null;
    _blockParentMap: Map<BlockType, cc.Node> = new Map();

    public initGamePanel(levelConfig: LevelConfig, blockMgr: BlockMgr): void {
        this._blockMgr = blockMgr;
        this._levelConfig = levelConfig;
        // 初始化网格数据
        this.initGrid(levelConfig);
        // 初始化方块
        this.initBlocks();
    }

    protected initGrid(levelConfig: LevelConfig): void {
        const { width, height } = levelConfig.gameMap;
        this._grid = new Grid(
            width,
            height,
            new cc.Size(this.cellWidth, this.cellHeight),
            this.cellSpacing
        );
        this.gridRootNode.setContentSize(this._grid.getGridSize());
    }

    protected initBlocks(): void {
        const blockInfos = this._levelConfig.gameMap.blocks;
        const keys = Object.keys(blockInfos);
        for (const key of keys) {
            const { row, column } = parseLocation(key);
            const blockConfig = blockInfos[key];
            this.generateBlock({ row, column }, blockConfig);
        }
    }

    public getBlockParent(blockType: BlockType): cc.Node {
        let blockParent = this._blockParentMap.get(blockType);
        if (!blockParent) {
            blockParent = new cc.Node(`block_parent_${blockType}`);
            this._blockParentMap.set(blockType, blockParent);
            this.gridRootNode.addChild(blockParent);
        }
        return blockParent;
    }

    public getBlockByLocation(location: Location): BaseBlock {
        if (this._grid.isInBounds(location)) {
            return this._grid.getCell(location);
        }
        return null;
    }

    public getBlockByPosition(position: cc.Vec2): BaseBlock {
        const location = this._grid.getTouchedLocation(position);
        return location ? this.getBlockByLocation(location) : null;
    }

    public getLocationByPosition(position: cc.Vec2): {
        row: number;
        column: number;
    } {
        return this._grid.getTouchedLocation(position);
    }

    // 获取相连的方块
    public getContiguousBlocks(
        location: Location,
        mapInfo: Array<Array<BlockConfig>>,
        excludeLocations: Array<Location>
    ): Array<Location> {
        if (
            excludeLocations.some((excludeLocation) =>
                isLocationEqual(excludeLocation, location)
            )
        ) {
            return [];
        }
        const contiguousLocations: Array<Location> = [];
        const queue: Array<Location> = [location];

        const typeIsSame = (
            location1: Location,
            location2: Location
        ): boolean => {
            return (
                mapInfo[location1.row][location1.column].type ===
                mapInfo[location2.row][location2.column].type
            );
        };

        const hasContiguous = (location1: Location): boolean => {
            return contiguousLocations.some((location2) =>
                isLocationEqual(location1, location2)
            );
        };

        const hasExclude = (location1: Location): boolean => {
            return excludeLocations.some((excludeLocation) =>
                isLocationEqual(location1, excludeLocation)
            );
        };

        const inQueue = (location1: Location): boolean => {
            return queue.some((location2) =>
                isLocationEqual(location1, location2)
            );
        };

        // 获取相邻的连续方块
        while (queue.length > 0) {
            const currentLocation = queue.shift();
            contiguousLocations.push(currentLocation);
            const neighborsLocations =
                this._grid.getNeighborsLocations(currentLocation);
            for (const neighborLocation of neighborsLocations) {
                if (
                    typeIsSame(currentLocation, neighborLocation) &&
                    !hasContiguous(neighborLocation) &&
                    !hasExclude(neighborLocation) &&
                    !inQueue(neighborLocation)
                ) {
                    // 如果相邻方块类型相同，且未被访问过，且未在队列中，则加入队列
                    queue.push(neighborLocation);
                }
            }
        }
        const rowList = contiguousLocations.map((location) => location.row);
        const columnList = contiguousLocations.map(
            (location) => location.column
        );
        const rowSet = new Set(rowList);
        const columnSet = new Set(columnList);
        // 有效的连续方块
        const validContiguousLocations: Array<Location> = [];
        // 按行分类,同一行内不满三个的方块，需要排除
        rowSet.forEach((row) => {
            const rowLocations = contiguousLocations.filter(
                (location) => location.row === row
            );
            if (rowLocations.length >= 3) {
                validContiguousLocations.push(...rowLocations);
            }
        });
        // 按列分类,同一列内不满三个的方块，需要排除
        columnSet.forEach((column) => {
            const columnLocations = contiguousLocations.filter(
                (location) => location.column === column
            );
            if (columnLocations.length >= 3) {
                validContiguousLocations.push(...columnLocations);
            }
        });

        // 去重
        return [...new Set(validContiguousLocations)];
    }

    public eliminateBlocks(gameCheckInfo: GameCheckInfo, cd: () => void): void {
        const { swapBlocks } = gameCheckInfo;
        // 交换方块, 并消除方块
        if (swapBlocks) {
            const [location1, location2] = swapBlocks;
            const block1 = this.getBlockByLocation(location1);
            const block2 = this.getBlockByLocation(location2);
            this.swapBlocks(block1, block2, location1, location2, () => {
                // 消除方块
                this.eliminateHandler(gameCheckInfo, cd);
            });
        } else {
            // 没有交换方块，直接消除方块
            this.eliminateHandler(gameCheckInfo, cd);
        }
    }

    protected eliminateHandler(
        gameCheckInfo: GameCheckInfo,
        cd: () => void
    ): void {
        // todo：消除动画 + 特效
        const { canEliminateCheckInfos } = gameCheckInfo;
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
            const { contiguousLocations } = eliminateCheckInfo;
            for (const location of contiguousLocations) {
                const block = this.getBlockByLocation(location);
                this.putBlock(block, location);
            }
        }
        cd && cd();
    }

    public putBlock(block: BaseBlock, location: Location): void {
        // 网格数据清除
        this._grid.setCell(location, null);
        // 将方块放回方块池
        this._blockMgr.putBlock(block);
    }

    public swapBlocks(
        block1: BaseBlock,
        block2: BaseBlock,
        location1: Location,
        location2: Location,
        cd: () => void
    ): void {
        // 交换
        this._grid.setCell(location1, block2);
        this._grid.setCell(location2, block1);

        const pos1 = this._grid.getCellPosition(location1);
        const pos2 = this._grid.getCellPosition(location2);

        let step = 0;
        const actionCd = () => {
            step++;
            if (step === 2) {
                cd();
            }
        };

        const nodeActionSeq1 = cc.sequence(
            cc.moveTo(0.3, pos2),
            cc.callFunc(actionCd)
        );

        const nodeActionSeq2 = cc.sequence(
            cc.moveTo(0.3, pos1),
            cc.callFunc(actionCd)
        );
        // 交换、还原动画
        block1.node.runAction(nodeActionSeq1);
        block2.node.runAction(nodeActionSeq2);
    }

    public swapAndBackBlocks(
        location1: Location,
        location2: Location,
        cd: () => void
    ): void {
        // 获取方块
        const block1 = this.getBlockByLocation(location1);
        const block2 = this.getBlockByLocation(location2);
        // 只交换位置，不交换方块
        const pos1 = this._grid.getCellPosition(location1);
        const pos2 = this._grid.getCellPosition(location2);

        let step = 0;
        const actionCd = () => {
            step++;
            if (step === 2) {
                cd();
            }
        };

        const nodeActionSeq1 = cc.sequence(
            cc.moveTo(0.3, pos2),
            cc.moveTo(0.3, pos1),
            cc.callFunc(actionCd)
        );

        const nodeActionSeq2 = cc.sequence(
            cc.moveTo(0.3, pos1),
            cc.moveTo(0.3, pos2),
            cc.callFunc(actionCd)
        );
        // 交换、还原动画
        block1.node.runAction(nodeActionSeq1);
        block2.node.runAction(nodeActionSeq2);
    }

    public dropRandomBlocks(cd: (entryList: Array<Location>) => void): void {
        // 根据含有空位的列生成随机方块
        const emptyList: Record<string, Array<Location>> = {};
        const data = this._grid.getData();
        for (let row = 0; row < data.length; row++) {
            const rowData = data[row];
            for (let column = 0; column < rowData.length; column++) {
                const cell = rowData[column];
                if (cell === null) {
                    if (!emptyList[column]) {
                        emptyList[column] = [];
                    }
                    emptyList[column].push({ row, column });
                }
            }
        }
        const entryList: Array<Location> = [];
        // 先将悬空的方块向下掉落，再补位
        const blockDropInfos: Array<BlockDropInfo> = [];
        for (const columnKey in emptyList) {
            const column = Number(columnKey);
            const columnList = emptyList[column];
            // 空位的最高行
            // const maxRow = columnList[columnList.length - 1].row;
            let startDropRow = columnList[0].row;
            // 先掉落存在的方块
            for (let row = startDropRow + 1; row < data.length; row++) {
                const cell = data[row][column];
                if (!cell) {
                    continue;
                }
                const targetLocation = {
                    row: startDropRow++,
                    column: column,
                };
                // 添加到入口列表
                entryList.push(targetLocation);
                // 有方块，则将方块掉落到目标位置
                blockDropInfos.push({
                    location: { row, column },
                    block: cell,
                    dropTime: 0.3,
                    targetDropLocation: targetLocation,
                });
                // 清除原位置
                this._grid.setCell({ row, column }, null);
                // 放置新位置
                this._grid.setCell(targetLocation, cell);
            }
            let startGenerateRow = data.length;
            // 再生成空位需要的方块
            for (
                let row = startGenerateRow;
                row < startGenerateRow + columnList.length;
                row++
            ) {
                const targetLocation = {
                    row: startDropRow++,
                    column: column,
                };
                // 添加到入口列表
                entryList.push(targetLocation);
                // 生成随机方块
                const randomBlockConfig = getRandomBlockConfig();
                const block = this.generateBlock(
                    targetLocation,
                    randomBlockConfig,
                    this._grid.getCellPosition({
                        row,
                        column,
                    })
                );
                // 记录
                blockDropInfos.push({
                    location: targetLocation,
                    block,
                    dropTime: 0.3,
                    targetDropLocation: targetLocation,
                });
            }
        }
        console.log('----- blockDropInfos: ', blockDropInfos);
        // 方块掉落动画
        let step = 0;
        const actionCd = () => {
            step++;
            if (step === blockDropInfos.length) {
                cd(entryList);
            }
        };
        for (const blockDropInfo of blockDropInfos) {
            const { block, dropTime, targetDropLocation } = blockDropInfo;
            const targetPos = this._grid.getCellPosition(targetDropLocation);
            block.node.runAction(
                cc.sequence(
                    cc.moveTo(dropTime, targetPos),
                    cc.callFunc(actionCd)
                )
            );
        }
    }

    /**
     * 生成新特殊方块
     * @param gameCheckInfo 游戏检查信息
     */
    public generateNewSpecialBlocks(gameCheckInfo: GameCheckInfo): void {
        const { newSpecailBlocks } = gameCheckInfo;
        const keys = Object.keys(newSpecailBlocks);
        for (const key of keys) {
            const location = parseLocation(key);
            const isEmpty = this._grid.getCell(location) === null;
            if (isEmpty) {
                const blockConfig = newSpecailBlocks[key];
                this.generateBlock(location, blockConfig);
            }
        }
    }

    /**
     * 生成方块
     * @param location 位置
     * @param blockConfig 方块配置
     * @returns 方块
     */
    public generateBlock(
        location: Location,
        blockConfig: BlockConfig,
        initPos?: cc.Vec2
    ): BaseBlock {
        const block = this._blockMgr.getBlock(blockConfig);
        this._grid.setCell(location, block);
        const blockParent = this.getBlockParent(blockConfig.type);
        block.node.setParent(blockParent);
        block.node.setPosition(initPos || this._grid.getCellPosition(location));
        return block;
    }

    // 获取方块地图信息
    public getBlockMapInfo(): Array<Array<BlockConfig>> {
        return this._grid
            .getData()
            .map((row) => row.map((block) => block && block.getConfig()));
    }

    public isInBounds(location: Location): boolean {
        return this._grid.isInBounds(location);
    }
}

"use strict";
cc._RF.push(module, '72c79TFnwVJN7E6xajFitRz', 'PlayPanel');
// Script/gamePlay/PlayPanel.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseBlock_1 = require("./block/BaseBlock");
const Grid_1 = require("./common/Grid");
const GameUtils_1 = require("./common/GameUtils");
const GameTypes_1 = require("./GameTypes");
const { ccclass, property } = cc._decorator;
let PlayPanel = class PlayPanel extends cc.Component {
    constructor() {
        super(...arguments);
        this.gridRootNode = null;
        this.rowCount = 6;
        this.columnCount = 8;
        this.cellWidth = 70;
        this.cellHeight = 70;
        this.cellSpacing = 2;
        this._grid = null;
        this._blockMgr = null;
        this._effectMgr = null;
        this._levelConfig = null;
        this._blockParentMap = new Map();
    }
    initGamePanel(levelConfig, blockMgr, effectMgr) {
        this._blockMgr = blockMgr;
        this._effectMgr = effectMgr;
        this._levelConfig = levelConfig;
        // 初始化网格数据
        this.initGrid(levelConfig);
        // 初始化方块
        this.initBlocks();
    }
    initGrid(levelConfig) {
        const { width, height } = levelConfig.gameMap;
        this._grid = new Grid_1.default(width, height, new cc.Size(this.cellWidth, this.cellHeight), this.cellSpacing);
        this.gridRootNode.setContentSize(this._grid.getGridSize());
        this.node.setContentSize(this._grid.getGridSize());
    }
    initBlocks() {
        const blockInfos = this._levelConfig.gameMap.blocks;
        const keys = Object.keys(blockInfos);
        for (const key of keys) {
            const { row, column } = Grid_1.parseLocation(key);
            const blockConfig = blockInfos[key];
            this.generateBlock({ row, column }, blockConfig);
        }
    }
    getBlockParent(blockType) {
        let blockParent = this._blockParentMap.get(blockType);
        if (!blockParent) {
            blockParent = new cc.Node(`block_parent_${blockType}`);
            this._blockParentMap.set(blockType, blockParent);
            this.gridRootNode.addChild(blockParent);
        }
        return blockParent;
    }
    getBlockByLocation(location) {
        if (this._grid.isInBounds(location)) {
            return this._grid.getCell(location);
        }
        return null;
    }
    getBlockByPosition(position) {
        const location = this._grid.getTouchedLocation(position);
        return location ? this.getBlockByLocation(location) : null;
    }
    getLocationByPosition(position) {
        return this._grid.getTouchedLocation(position);
    }
    // 获取相连的方块
    getContiguousBlocks(location, mapInfo, excludeLocations) {
        if (excludeLocations.some((excludeLocation) => GameUtils_1.isLocationEqual(excludeLocation, location))) {
            return [];
        }
        const contiguousLocations = [];
        const queue = [location];
        const typeIsSame = (location1, location2) => {
            const config1 = mapInfo[location1.row][location1.column];
            const config2 = mapInfo[location2.row][location2.column];
            // 特殊炸弹方块不能与普通方块相连
            return (config1.type === config2.type &&
                config1.special !== GameTypes_1.BlockSpecialType.SPECIAL_BOOM &&
                config2.special !== GameTypes_1.BlockSpecialType.SPECIAL_BOOM);
        };
        const hasContiguous = (location1) => {
            return contiguousLocations.some((location2) => GameUtils_1.isLocationEqual(location1, location2));
        };
        const hasExclude = (location1) => {
            return excludeLocations.some((excludeLocation) => GameUtils_1.isLocationEqual(location1, excludeLocation));
        };
        const inQueue = (location1) => {
            return queue.some((location2) => GameUtils_1.isLocationEqual(location1, location2));
        };
        // 获取相邻的连续方块
        while (queue.length > 0) {
            const currentLocation = queue.shift();
            contiguousLocations.push(currentLocation);
            const neighborsLocations = this._grid.getNeighborsLocations(currentLocation);
            for (const neighborLocation of neighborsLocations) {
                if (typeIsSame(currentLocation, neighborLocation) &&
                    !hasContiguous(neighborLocation) &&
                    !hasExclude(neighborLocation) &&
                    !inQueue(neighborLocation)) {
                    // 如果相邻方块类型相同，且未被访问过，且未在队列中，则加入队列
                    queue.push(neighborLocation);
                }
            }
        }
        const rowList = contiguousLocations.map((location) => location.row);
        const columnList = contiguousLocations.map((location) => location.column);
        const rowSet = new Set(rowList);
        const columnSet = new Set(columnList);
        // 有效的连续方块
        const validContiguousLocations = [];
        // 按行分类,同一行内不满三个的方块，需要排除
        rowSet.forEach((row) => {
            const rowLocations = contiguousLocations.filter((location) => location.row === row);
            if (rowLocations.length >= 3) {
                validContiguousLocations.push(...rowLocations);
            }
        });
        // 按列分类,同一列内不满三个的方块，需要排除
        columnSet.forEach((column) => {
            const columnLocations = contiguousLocations.filter((location) => location.column === column);
            if (columnLocations.length >= 3) {
                validContiguousLocations.push(...columnLocations);
            }
        });
        // 去重
        return [...new Set(validContiguousLocations)];
    }
    eliminateBlocks(gameCheckInfo, cd) {
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
        }
        else {
            // 没有交换方块，直接消除方块
            this.eliminateHandler(gameCheckInfo, cd);
        }
    }
    eliminateHandler(gameCheckInfo, cd) {
        // 消除方块
        const { canEliminateCheckInfos } = gameCheckInfo;
        for (const eliminateCheckInfo of canEliminateCheckInfos) {
            const { contiguousLocations } = eliminateCheckInfo;
            for (const location of contiguousLocations) {
                const block = this.getBlockByLocation(location);
                this.putBlock(block, location);
            }
        }
        // 释放特效
        this._effectMgr.effectHandler(this._grid, gameCheckInfo, cd);
        // cd && cd();
    }
    putBlock(block, location) {
        // 网格数据清除
        this._grid.setCell(location, null);
        // 将方块放回方块池
        this._blockMgr.putBlock(block);
    }
    swapBlocks(block1, block2, location1, location2, cd) {
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
        const nodeActionSeq1 = cc.sequence(cc.moveTo(0.3, pos2), cc.callFunc(actionCd));
        const nodeActionSeq2 = cc.sequence(cc.moveTo(0.3, pos1), cc.callFunc(actionCd));
        // 交换、还原动画
        block1.node.runAction(nodeActionSeq1);
        block2.node.runAction(nodeActionSeq2);
    }
    swapAndBackBlocks(location1, location2, cd) {
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
        // 交换、还原动画
        cc.tween(block1.node)
            .sequence(cc.moveTo(0.3, pos2), cc.moveTo(0.3, pos1), cc.callFunc(actionCd))
            .start();
        cc.tween(block2.node)
            .sequence(cc.moveTo(0.3, pos1), cc.moveTo(0.3, pos2), cc.callFunc(actionCd))
            .start();
    }
    dropRandomBlocks(cd) {
        // 根据含有空位的列生成随机方块
        const emptyList = {};
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
        const entryList = [];
        // 先将悬空的方块向下掉落，再补位
        const blockDropInfos = [];
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
            for (let row = startGenerateRow; row < startGenerateRow + columnList.length; row++) {
                const targetLocation = {
                    row: startDropRow++,
                    column: column,
                };
                // 添加到入口列表
                entryList.push(targetLocation);
                // 生成随机方块
                const randomBlockConfig = GameUtils_1.getRandomBlockConfig();
                const block = this.generateBlock(targetLocation, randomBlockConfig, this._grid.getCellPosition({
                    row,
                    column,
                }));
                // 记录
                blockDropInfos.push({
                    location: targetLocation,
                    block,
                    dropTime: 0.3,
                    targetDropLocation: targetLocation,
                });
            }
        }
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
            cc.tween(block.node)
                .sequence(cc.moveTo(dropTime, targetPos), cc.callFunc(actionCd))
                .start();
        }
    }
    /**
     * 生成新特殊方块
     * @param gameCheckInfo 游戏检查信息
     */
    generateNewSpecialBlocks(gameCheckInfo) {
        const { newSpecailBlocks } = gameCheckInfo;
        const keys = Object.keys(newSpecailBlocks);
        for (const key of keys) {
            const location = Grid_1.parseLocation(key);
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
    generateBlock(location, blockConfig, initPos) {
        const blockParent = this.getBlockParent(blockConfig.type);
        const block = this._blockMgr.getBlock(blockConfig, blockParent);
        this._grid.setCell(location, block);
        block.node.setPosition(initPos || this._grid.getCellPosition(location));
        return block;
    }
    // 获取方块地图信息
    getBlockMapInfo() {
        return this._grid
            .getData()
            .map((row) => row.map((block) => block && block.getConfig()));
    }
    isInBounds(location) {
        return this._grid.isInBounds(location);
    }
    getLevelConfig() {
        return this._levelConfig;
    }
    getAllBlock() {
        const blockList = this.gridRootNode.getComponentsInChildren(BaseBlock_1.default);
        return blockList;
    }
};
__decorate([
    property(cc.Node)
], PlayPanel.prototype, "gridRootNode", void 0);
__decorate([
    property({
        displayName: '网格行数',
        min: 1,
        step: 1,
    })
], PlayPanel.prototype, "rowCount", void 0);
__decorate([
    property({
        displayName: '网格列数',
        min: 1,
        step: 1,
    })
], PlayPanel.prototype, "columnCount", void 0);
__decorate([
    property({
        displayName: '网格单位宽度',
    })
], PlayPanel.prototype, "cellWidth", void 0);
__decorate([
    property({
        displayName: '网格单位高度',
    })
], PlayPanel.prototype, "cellHeight", void 0);
__decorate([
    property({
        displayName: '网格单位间距',
    })
], PlayPanel.prototype, "cellSpacing", void 0);
PlayPanel = __decorate([
    ccclass
], PlayPanel);
exports.default = PlayPanel;

cc._RF.pop();
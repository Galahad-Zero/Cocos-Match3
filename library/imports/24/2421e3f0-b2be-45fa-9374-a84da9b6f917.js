"use strict";
cc._RF.push(module, '2421ePwsr5F+pN0qE2ptvkX', 'BlockMgr');
// Script/gamePlay/block/BlockMgr.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const BlockStyleProperty_1 = require("./BlockStyleProperty");
const BaseBlock_1 = require("./BaseBlock");
const { ccclass, property } = cc._decorator;
let BlockMgr = class BlockMgr extends cc.Component {
    constructor() {
        super(...arguments);
        this.blockPrefab = null;
        this.blockStyleArr = [];
        this._blockLoop = null;
    }
    /**
     * 根据方块类型获取方块样式
     * @param blockType 方块类型
     * @returns 方块样式
     */
    getBlockStyle(blockType) {
        return this.blockStyleArr.find((style) => style.blockType === blockType);
    }
    /**
     * 根据方块配置获取方块
     * @param blockConfig 方块配置
     * @returns 方块
     */
    getBlock(blockConfig, parent) {
        const blockStyle = this.getBlockStyle(blockConfig.type);
        if (!blockStyle) {
            return null;
        }
        const block = this.getBlockLoop().get(blockConfig, blockStyle, parent);
        if (!block) {
            const newBlock = cc.instantiate(this.blockPrefab);
            const blockComp = newBlock.getComponent(BaseBlock_1.default);
            blockComp.reuse(blockConfig, blockStyle, parent);
            return blockComp;
        }
        return block.getComponent(BaseBlock_1.default);
    }
    /**
     * 回收方块
     * @param block 方块
     */
    putBlock(block) {
        this._blockLoop.put(block.node);
    }
    getBlockLoop() {
        if (!this._blockLoop) {
            this._blockLoop = new cc.NodePool(BaseBlock_1.default);
        }
        return this._blockLoop;
    }
    /**
     * 销毁
     */
    onDestroy() {
        this._blockLoop && this._blockLoop.clear();
        this._blockLoop = null;
    }
};
__decorate([
    property(cc.Prefab)
], BlockMgr.prototype, "blockPrefab", void 0);
__decorate([
    property({
        type: [BlockStyleProperty_1.default],
    })
], BlockMgr.prototype, "blockStyleArr", void 0);
BlockMgr = __decorate([
    ccclass
], BlockMgr);
exports.default = BlockMgr;

cc._RF.pop();
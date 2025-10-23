import { BlockConfig, BlockType } from '../GameTypes';
import BlockStyleProperty from './BlockStyleProperty';
import BaseBlock from './BaseBlock';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockMgr extends cc.Component {
    @property(cc.Prefab)
    blockPrefab: cc.Prefab = null;

    @property({
        type: [BlockStyleProperty],
    })
    blockStyleArr: BlockStyleProperty[] = [];

    _blockLoop: cc.NodePool = null;

    /**
     * 根据方块类型获取方块样式
     * @param blockType 方块类型
     * @returns 方块样式
     */
    public getBlockStyle(blockType: BlockType): BlockStyleProperty {
        return this.blockStyleArr.find(
            (style) => style.blockType === blockType
        );
    }

    /**
     * 根据方块配置获取方块
     * @param blockConfig 方块配置
     * @returns 方块
     */
    public getBlock(blockConfig: BlockConfig, parent?: cc.Node): BaseBlock {
        const blockStyle = this.getBlockStyle(blockConfig.type);
        if (!blockStyle) {
            return null;
        }
        const block = this.getBlockLoop().get(blockConfig, blockStyle, parent);
        if (!block) {
            const newBlock = cc.instantiate(this.blockPrefab);
            const blockComp = newBlock.getComponent(BaseBlock);
            blockComp.reuse(blockConfig, blockStyle, parent);
            return blockComp;
        }
        return block.getComponent(BaseBlock);
    }

    /**
     * 回收方块
     * @param block 方块
     */
    public putBlock(block: BaseBlock): void {
        this._blockLoop.put(block.node);
    }

    public getBlockLoop(): cc.NodePool {
        if (!this._blockLoop) {
            this._blockLoop = new cc.NodePool(BaseBlock);
        }
        return this._blockLoop;
    }

    /**
     * 销毁
     */
    protected onDestroy(): void {
        this._blockLoop && this._blockLoop.clear();
        this._blockLoop = null;
    }
}

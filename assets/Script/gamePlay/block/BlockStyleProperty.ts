import { BlockSpecialType, BlockType } from '../Types';
import SpineProperty from '../common/SpineProperty';

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockStyleProperty extends cc.Component {
    @property({
        type: cc.Enum(BlockType),
    })
    blockType: BlockType = BlockType.BLOCK_TYPE_1;

    @property(SpineProperty)
    normalAnimationClip: SpineProperty = null;

    @property(SpineProperty)
    rowAnimationClip: SpineProperty = null;

    @property(SpineProperty)
    columnAnimationClip: SpineProperty = null;

    @property(SpineProperty)
    bombAnimationClip: SpineProperty = null;

    @property(SpineProperty)
    specialAnimationClip: SpineProperty = null;

    public getAnimationInfo(blockSpecialType: BlockSpecialType): SpineProperty {
        switch (blockSpecialType) {
            case BlockSpecialType.ROW:
                return this.rowAnimationClip;
            case BlockSpecialType.COLUMN:
                return this.columnAnimationClip;
            case BlockSpecialType.BOOM:
                return this.bombAnimationClip;
            case BlockSpecialType.SPECIAL_BOOM:
                return this.specialAnimationClip;
            default:
                return this.normalAnimationClip;
        }
    }
}

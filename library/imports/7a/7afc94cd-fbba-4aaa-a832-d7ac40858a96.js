"use strict";
cc._RF.push(module, '7afc9TN+7pKqqgy16xAhYqW', 'BlockStyleProperty');
// Script/gamePlay/block/BlockStyleProperty.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameTypes_1 = require("../GameTypes");
const SpineProperty_1 = require("../common/SpineProperty");
const { ccclass, property } = cc._decorator;
let BlockStyleProperty = class BlockStyleProperty extends cc.Component {
    constructor() {
        super(...arguments);
        this.blockType = GameTypes_1.BlockType.BLOCK_TYPE_1;
        this.normalAnimationClip = null;
        this.rowAnimationClip = null;
        this.columnAnimationClip = null;
        this.bombAnimationClip = null;
        this.specialAnimationClip = null;
    }
    getAnimationInfo(blockSpecialType) {
        switch (blockSpecialType) {
            case GameTypes_1.BlockSpecialType.ROW:
                return this.rowAnimationClip;
            case GameTypes_1.BlockSpecialType.COLUMN:
                return this.columnAnimationClip;
            case GameTypes_1.BlockSpecialType.BOOM:
                return this.bombAnimationClip;
            case GameTypes_1.BlockSpecialType.SPECIAL_BOOM:
                return this.specialAnimationClip;
            default:
                return this.normalAnimationClip;
        }
    }
};
__decorate([
    property({
        type: cc.Enum(GameTypes_1.BlockType),
    })
], BlockStyleProperty.prototype, "blockType", void 0);
__decorate([
    property(SpineProperty_1.default)
], BlockStyleProperty.prototype, "normalAnimationClip", void 0);
__decorate([
    property(SpineProperty_1.default)
], BlockStyleProperty.prototype, "rowAnimationClip", void 0);
__decorate([
    property(SpineProperty_1.default)
], BlockStyleProperty.prototype, "columnAnimationClip", void 0);
__decorate([
    property(SpineProperty_1.default)
], BlockStyleProperty.prototype, "bombAnimationClip", void 0);
__decorate([
    property(SpineProperty_1.default)
], BlockStyleProperty.prototype, "specialAnimationClip", void 0);
BlockStyleProperty = __decorate([
    ccclass
], BlockStyleProperty);
exports.default = BlockStyleProperty;

cc._RF.pop();
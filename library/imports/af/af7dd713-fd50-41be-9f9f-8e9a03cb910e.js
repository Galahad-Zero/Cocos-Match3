"use strict";
cc._RF.push(module, 'af7ddcT/VBBvp+fjpoDy5EO', 'GameTypes');
// Script/gamePlay/GameTypes.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EliminateScore = exports.EliminateType = exports.BlockSpecialType = exports.BlockType = void 0;
// 方块样式
var BlockType;
(function (BlockType) {
    BlockType[BlockType["BLOCK_TYPE_1"] = 1] = "BLOCK_TYPE_1";
    BlockType[BlockType["BLOCK_TYPE_2"] = 2] = "BLOCK_TYPE_2";
    BlockType[BlockType["BLOCK_TYPE_3"] = 3] = "BLOCK_TYPE_3";
    BlockType[BlockType["BLOCK_TYPE_4"] = 4] = "BLOCK_TYPE_4";
    BlockType[BlockType["BLOCK_TYPE_5"] = 5] = "BLOCK_TYPE_5";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
// 方块类型
var BlockSpecialType;
(function (BlockSpecialType) {
    BlockSpecialType["NONE"] = "none";
    BlockSpecialType["ROW"] = "row";
    BlockSpecialType["COLUMN"] = "column";
    BlockSpecialType["BOOM"] = "boom";
    BlockSpecialType["SPECIAL_BOOM"] = "special_boom";
})(BlockSpecialType = exports.BlockSpecialType || (exports.BlockSpecialType = {}));
// 消除类型
var EliminateType;
(function (EliminateType) {
    EliminateType["BASE_3"] = "base_3";
    EliminateType["BASE_4_ROW"] = "base_4_row";
    EliminateType["BASE_4_COLUMN"] = "base_4_column";
    EliminateType["BASE_5"] = "base_5";
    EliminateType["IRREGULAR_5"] = "irregular_5";
})(EliminateType = exports.EliminateType || (exports.EliminateType = {}));
var EliminateScore;
(function (EliminateScore) {
    EliminateScore[EliminateScore["EliminateBlockScore"] = 10] = "EliminateBlockScore";
    EliminateScore[EliminateScore["Base4RowScore"] = 50] = "Base4RowScore";
    EliminateScore[EliminateScore["Base4ColumnScore"] = 50] = "Base4ColumnScore";
    EliminateScore[EliminateScore["Base5Score"] = 200] = "Base5Score";
    EliminateScore[EliminateScore["Irregular5Score"] = 100] = "Irregular5Score";
})(EliminateScore = exports.EliminateScore || (exports.EliminateScore = {}));

cc._RF.pop();
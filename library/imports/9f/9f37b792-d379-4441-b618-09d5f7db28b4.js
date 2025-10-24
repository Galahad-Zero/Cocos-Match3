"use strict";
cc._RF.push(module, '9f37beS03lEQbYYCdX32yi0', 'GameUtils');
// Script/gamePlay/common/GameUtils.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomBlockConfig = exports.getSwapLocation = exports.isNeighborLocation = exports.getNeighborLocations = exports.getDirection = exports.isLocationEqual = void 0;
const GameConst_1 = require("../GameConst");
const GameTypes_1 = require("../GameTypes");
const DirectionList = [
    GameConst_1.Direction.UP,
    GameConst_1.Direction.DOWN,
    GameConst_1.Direction.LEFT,
    GameConst_1.Direction.RIGHT,
];
function isLocationEqual(location1, location2) {
    return (location1.row === location2.row && location1.column === location2.column);
}
exports.isLocationEqual = isLocationEqual;
function getDirection(delta) {
    let minAngle = Infinity;
    let minDirection = GameConst_1.Direction.NONE;
    for (const direction of DirectionList) {
        const dirVec = GameConst_1.DirectionVector[direction];
        const angle = delta.normalize().angle(dirVec);
        if (angle < minAngle) {
            minAngle = angle;
            minDirection = direction;
        }
    }
    return minDirection;
}
exports.getDirection = getDirection;
function getNeighborLocations(location) {
    return [
        { row: location.row - 1, column: location.column },
        { row: location.row + 1, column: location.column },
        { row: location.row, column: location.column - 1 },
        { row: location.row, column: location.column + 1 },
    ];
}
exports.getNeighborLocations = getNeighborLocations;
function isNeighborLocation(location1, location2) {
    if (location1.row === location2.row) {
        return Math.abs(location1.column - location2.column) === 1;
    }
    else if (location1.column === location2.column) {
        return Math.abs(location1.row - location2.row) === 1;
    }
    return false;
}
exports.isNeighborLocation = isNeighborLocation;
function getSwapLocation(location, direction) {
    if (direction === GameConst_1.Direction.NONE) {
        return location;
    }
    const directionVector = GameConst_1.DirectionVector[direction];
    return {
        row: location.row + directionVector.y,
        column: location.column + directionVector.x,
    };
}
exports.getSwapLocation = getSwapLocation;
function getRandomBlockConfig() {
    const blockConfigs = [
        { type: GameTypes_1.BlockType.BLOCK_TYPE_1, special: GameTypes_1.BlockSpecialType.NONE },
        { type: GameTypes_1.BlockType.BLOCK_TYPE_2, special: GameTypes_1.BlockSpecialType.NONE },
        { type: GameTypes_1.BlockType.BLOCK_TYPE_3, special: GameTypes_1.BlockSpecialType.NONE },
        { type: GameTypes_1.BlockType.BLOCK_TYPE_4, special: GameTypes_1.BlockSpecialType.NONE },
        { type: GameTypes_1.BlockType.BLOCK_TYPE_5, special: GameTypes_1.BlockSpecialType.NONE },
    ];
    return blockConfigs[Math.floor(Math.random() * blockConfigs.length)];
}
exports.getRandomBlockConfig = getRandomBlockConfig;

cc._RF.pop();
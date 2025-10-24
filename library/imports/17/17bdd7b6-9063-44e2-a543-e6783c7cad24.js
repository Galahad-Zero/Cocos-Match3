"use strict";
cc._RF.push(module, '17bdde2kGNE4qVD5ng8fK0k', 'GameConst');
// Script/gamePlay/GameConst.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionVector = exports.Direction = exports.TOUCH_BLOCK_EVENT = void 0;
exports.TOUCH_BLOCK_EVENT = 'TOUCH_BLOCK_EVENT';
var Direction;
(function (Direction) {
    Direction["NONE"] = "none";
    Direction["UP"] = "up";
    Direction["DOWN"] = "down";
    Direction["LEFT"] = "left";
    Direction["RIGHT"] = "right";
})(Direction = exports.Direction || (exports.Direction = {}));
exports.DirectionVector = {
    [Direction.UP]: new cc.Vec2(0, 1),
    [Direction.DOWN]: new cc.Vec2(0, -1),
    [Direction.LEFT]: new cc.Vec2(-1, 0),
    [Direction.RIGHT]: new cc.Vec2(1, 0),
};

cc._RF.pop();
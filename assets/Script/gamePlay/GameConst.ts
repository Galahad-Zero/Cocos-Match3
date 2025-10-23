export const TOUCH_BLOCK_EVENT = 'TOUCH_BLOCK_EVENT';

export enum Direction {
    NONE = 'none',
    UP = 'up',
    DOWN = 'down',
    LEFT = 'left',
    RIGHT = 'right',
}

export const DirectionVector = {
    [Direction.UP]: new cc.Vec2(0, 1),
    [Direction.DOWN]: new cc.Vec2(0, -1),
    [Direction.LEFT]: new cc.Vec2(-1, 0),
    [Direction.RIGHT]: new cc.Vec2(1, 0),
};

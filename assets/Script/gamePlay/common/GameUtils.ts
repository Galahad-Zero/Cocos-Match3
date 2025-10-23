import { Direction, DirectionVector } from '../GameConst';
import { BlockConfig, BlockSpecialType, BlockType, Location } from '../Types';

const DirectionList = [
    Direction.UP,
    Direction.DOWN,
    Direction.LEFT,
    Direction.RIGHT,
];

export function isLocationEqual(
    location1: Location,
    location2: Location
): boolean {
    return (
        location1.row === location2.row && location1.column === location2.column
    );
}

export function getDirection(delta: cc.Vec2): Direction {
    let minAngle = Infinity;
    let minDirection = Direction.NONE;
    for (const direction of DirectionList) {
        const dirVec = DirectionVector[direction];
        const angle = delta.normalize().angle(dirVec);
        if (angle < minAngle) {
            minAngle = angle;
            minDirection = direction;
        }
    }
    return minDirection;
}

export function getNeighborLocations(location: Location): Array<Location> {
    return [
        { row: location.row - 1, column: location.column },
        { row: location.row + 1, column: location.column },
        { row: location.row, column: location.column - 1 },
        { row: location.row, column: location.column + 1 },
    ];
}

export function isNeighborLocation(
    location1: Location,
    location2: Location
): boolean {
    if (location1.row === location2.row) {
        return Math.abs(location1.column - location2.column) === 1;
    } else if (location1.column === location2.column) {
        return Math.abs(location1.row - location2.row) === 1;
    }
    return false;
}

export function getSwapLocation(
    location: Location,
    direction: Direction
): Location {
    if (direction === Direction.NONE) {
        return location;
    }
    const directionVector = DirectionVector[direction];
    return {
        row: location.row + directionVector.y,
        column: location.column + directionVector.x,
    };
}

export function getRandomBlockConfig(): BlockConfig {
    const blockConfigs = [
        { type: BlockType.BLOCK_TYPE_1, special: BlockSpecialType.NONE },
        { type: BlockType.BLOCK_TYPE_2, special: BlockSpecialType.NONE },
        { type: BlockType.BLOCK_TYPE_3, special: BlockSpecialType.NONE },
        { type: BlockType.BLOCK_TYPE_4, special: BlockSpecialType.NONE },
        { type: BlockType.BLOCK_TYPE_5, special: BlockSpecialType.NONE },
    ];
    return blockConfigs[Math.floor(Math.random() * blockConfigs.length)];
}

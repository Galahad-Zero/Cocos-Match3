"use strict";
cc._RF.push(module, '3c4d0KLw/pIGYWbNi2f5qjI', 'Grid');
// Script/gamePlay/common/Grid.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseLocation = exports.stringifyLocation = void 0;
const GameUtils_1 = require("./GameUtils");
function stringifyLocation(row, column) {
    return `${row},${column}`;
}
exports.stringifyLocation = stringifyLocation;
function parseLocation(location) {
    const [row, column] = location.split(',').map(Number);
    return { row, column };
}
exports.parseLocation = parseLocation;
class Grid {
    constructor(width, height, cellSize, cellSpacing) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cellSpacing = cellSpacing;
        this.data = new Array(height)
            .fill(null)
            .map(() => new Array(width).fill(null));
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getData() {
        return this.data;
    }
    setData(data) {
        this.data = data;
    }
    getCell({ row, column }) {
        return this.data[row][column];
    }
    setCell({ row, column }, data) {
        this.data[row][column] = data;
    }
    getCellPosition({ row, column }) {
        const x = column * (this.cellSize.width + this.cellSpacing) +
            this.cellSize.width / 2;
        const y = row * (this.cellSize.height + this.cellSpacing) +
            this.cellSize.height / 2;
        return new cc.Vec2(x, y);
    }
    getTouchedLocation(position) {
        const row = Math.floor(position.y / (this.cellSize.height + this.cellSpacing));
        const column = Math.floor(position.x / (this.cellSize.width + this.cellSpacing));
        return this.isInBounds({ row, column }) ? { row, column } : null;
    }
    isInBounds({ row, column }) {
        return (column >= 0 && column < this.width && row >= 0 && row < this.height);
    }
    getNeighbors({ row, column }) {
        const neighborLocations = GameUtils_1.getNeighborLocations({ row, column });
        return neighborLocations.reduce((neighbors, neighborLocation) => {
            if (this.isInBounds(neighborLocation)) {
                neighbors.push(this.getCell(neighborLocation));
            }
            return neighbors;
        }, new Array());
    }
    getNeighborsLocations({ row, column }) {
        const neighborLocations = GameUtils_1.getNeighborLocations({ row, column });
        return neighborLocations.filter((neighborLocation) => this.isInBounds(neighborLocation));
    }
    getGridSize() {
        const { width, height } = this.cellSize;
        const totalWidth = width * this.width + this.cellSpacing * (this.width - 1);
        const totalHeight = height * this.height + this.cellSpacing * (this.height - 1);
        return new cc.Size(totalWidth, totalHeight);
    }
    clear() {
        this.data = new Array(this.height)
            .fill(null)
            .map(() => new Array(this.width).fill(null));
    }
}
exports.default = Grid;

cc._RF.pop();
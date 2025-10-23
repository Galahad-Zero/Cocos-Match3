import { getNeighborLocations } from './GameUtils';
import { Location } from '../Types';

export function stringifyLocation(row: number, column: number): string {
    return `${row},${column}`;
}

export function parseLocation(location: string): {
    row: number;
    column: number;
} {
    const [row, column] = location.split(',').map(Number);
    return { row, column };
}

export default class Grid<T> {
    private width: number;
    private height: number;
    private cellSize: cc.Size;
    private cellSpacing: number;
    private data: Array<Array<T>>;

    constructor(
        width: number,
        height: number,
        cellSize: cc.Size,
        cellSpacing: number
    ) {
        this.width = width;
        this.height = height;
        this.cellSize = cellSize;
        this.cellSpacing = cellSpacing;
        this.data = new Array<Array<T>>(height)
            .fill(null)
            .map(() => new Array<T>(width).fill(null));
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public getData(): T[][] {
        return this.data;
    }

    public setData(data: T[][]): void {
        this.data = data;
    }

    public getCell({ row, column }: Location): T {
        return this.data[row][column];
    }

    public setCell({ row, column }: Location, data: T): void {
        this.data[row][column] = data;
    }

    public getCellPosition({ row, column }: Location): cc.Vec2 {
        const x =
            column * (this.cellSize.width + this.cellSpacing) +
            this.cellSize.width / 2;
        const y =
            row * (this.cellSize.height + this.cellSpacing) +
            this.cellSize.height / 2;
        return new cc.Vec2(x, y);
    }

    public getTouchedLocation(position: cc.Vec2): {
        row: number;
        column: number;
    } {
        const row = Math.floor(
            position.y / (this.cellSize.height + this.cellSpacing)
        );
        const column = Math.floor(
            position.x / (this.cellSize.width + this.cellSpacing)
        );
        return this.isInBounds({ row, column }) ? { row, column } : null;
    }

    public isInBounds({ row, column }: Location): boolean {
        return (
            column >= 0 && column < this.width && row >= 0 && row < this.height
        );
    }

    public getNeighbors({ row, column }: Location): Array<T> {
        const neighborLocations = getNeighborLocations({ row, column });
        return neighborLocations.reduce((neighbors, neighborLocation) => {
            if (this.isInBounds(neighborLocation)) {
                neighbors.push(this.getCell(neighborLocation));
            }
            return neighbors;
        }, new Array<T>());
    }

    public getNeighborsLocations({ row, column }: Location): Array<Location> {
        const neighborLocations = getNeighborLocations({ row, column });
        return neighborLocations.filter((neighborLocation) =>
            this.isInBounds(neighborLocation)
        );
    }

    public getGridSize(): cc.Size {
        const { width, height } = this.cellSize;
        const totalWidth =
            width * this.width + this.cellSpacing * (this.width - 1);
        const totalHeight =
            height * this.height + this.cellSpacing * (this.height - 1);
        return new cc.Size(totalWidth, totalHeight);
    }

    public clear(): void {
        this.data = new Array<Array<T>>(this.height)
            .fill(null)
            .map(() => new Array<T>(this.width).fill(null));
    }
}

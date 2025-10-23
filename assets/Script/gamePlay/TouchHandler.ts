import { Direction, TOUCH_BLOCK_EVENT } from './GameConst';
import { getDirection } from './common/GameUtils';
import PlayPanel from './PlayPanel';

const { ccclass, property } = cc._decorator;

export enum TouchDetailEventType {
    click,
    drag,
}

export interface TouchDetailEvent {
    type: TouchDetailEventType;
    location: { row: number; column: number };
    direction?: Direction;
}

@ccclass
export default class TouchHandler extends cc.Component {
    @property(cc.Node)
    protected target: cc.Node = null;

    @property(PlayPanel)
    playPanel: PlayPanel = null;

    _isEnabled: boolean = true;
    _isDragging: boolean = false;
    _hasEmitEvent: boolean = false;
    _startPos: cc.Vec2 = null;

    protected onLoad(): void {
        this.initTouchEvents();
    }

    protected initTouchEvents(): void {
        this.target.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    protected onTouchStart(e: cc.Event.EventTouch): void {
        if (!this._isEnabled) {
            return;
        }
        this._isDragging = false;
        this._hasEmitEvent = false;
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        this._startPos = pos;
    }

    protected onTouchMove(e: cc.Event.EventTouch): void {
        if (!this._isEnabled) {
            return;
        }
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        const delta = pos.sub(this._startPos);
        const direction = this.getDirection(delta);

        if (direction === Direction.NONE) {
            // 如果方向为NONE，则不发送事件
            return;
        }
        this._isDragging = true;
        // const block = this.playPanel.getBlockByPosition(pos);
        const location = this.playPanel.getLocationByPosition(pos);
        // 发送拖动事件
        if (!this._hasEmitEvent) {
            this.node.emit(TOUCH_BLOCK_EVENT, {
                type: TouchDetailEventType.drag,
                location,
                direction,
            });
            this._hasEmitEvent = true;
        }
    }

    protected onTouchEnd(e: cc.Event.EventTouch): void {
        if (!this._isEnabled) {
            return;
        }
        if (!this._isDragging && !this._hasEmitEvent) {
            const pos = this.target.convertToNodeSpaceAR(e.getLocation());
            const location = this.playPanel.getLocationByPosition(pos);
            // 如果未拖动，则发送点击事件
            this.node.emit(TOUCH_BLOCK_EVENT, {
                type: TouchDetailEventType.click,
                location: location,
            });
            this._hasEmitEvent = true;
        }
        this._isDragging = false;
        this._startPos = null;
    }

    protected getDirection(delta: cc.Vec2, threshold: number = 10): Direction {
        const absDelta = delta.mag();
        if (absDelta < threshold) {
            return Direction.NONE;
        }
        return getDirection(delta);
    }

    public setEnabled(enabled: boolean): void {
        this._isEnabled = enabled;
    }

    protected onDestroy(): void {
        this.target.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
}

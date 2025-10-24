"use strict";
cc._RF.push(module, '8410exNREhD+rUlI1pgwF8x', 'TouchHandler');
// Script/gamePlay/TouchHandler.ts

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TouchDetailEventType = void 0;
const GameConst_1 = require("./GameConst");
const GameUtils_1 = require("./common/GameUtils");
const PlayPanel_1 = require("./PlayPanel");
const { ccclass, property } = cc._decorator;
var TouchDetailEventType;
(function (TouchDetailEventType) {
    TouchDetailEventType[TouchDetailEventType["click"] = 0] = "click";
    TouchDetailEventType[TouchDetailEventType["drag"] = 1] = "drag";
})(TouchDetailEventType = exports.TouchDetailEventType || (exports.TouchDetailEventType = {}));
let TouchHandler = class TouchHandler extends cc.Component {
    constructor() {
        super(...arguments);
        this.target = null;
        this.playPanel = null;
        this._isEnabled = true;
        this._isDragging = false;
        this._hasEmitEvent = false;
        this._startPos = null;
    }
    onLoad() {
        this.initTouchEvents();
    }
    initTouchEvents() {
        this.target.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    onTouchStart(e) {
        if (!this._isEnabled) {
            return;
        }
        this._isDragging = false;
        this._hasEmitEvent = false;
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        this._startPos = pos;
    }
    onTouchMove(e) {
        if (!this._isEnabled) {
            return;
        }
        const pos = this.target.convertToNodeSpaceAR(e.getLocation());
        const delta = pos.sub(this._startPos);
        const direction = this.getDirection(delta);
        if (direction === GameConst_1.Direction.NONE) {
            // 如果方向为NONE，则不发送事件
            return;
        }
        this._isDragging = true;
        // const block = this.playPanel.getBlockByPosition(pos);
        const location = this.playPanel.getLocationByPosition(pos);
        // 发送拖动事件
        if (!this._hasEmitEvent) {
            this.node.emit(GameConst_1.TOUCH_BLOCK_EVENT, {
                type: TouchDetailEventType.drag,
                location,
                direction,
            });
            this._hasEmitEvent = true;
        }
    }
    onTouchEnd(e) {
        if (!this._isEnabled) {
            return;
        }
        if (!this._isDragging && !this._hasEmitEvent) {
            const pos = this.target.convertToNodeSpaceAR(e.getLocation());
            const location = this.playPanel.getLocationByPosition(pos);
            // 如果未拖动，则发送点击事件
            this.node.emit(GameConst_1.TOUCH_BLOCK_EVENT, {
                type: TouchDetailEventType.click,
                location: location,
            });
            this._hasEmitEvent = true;
        }
        this._isDragging = false;
        this._startPos = null;
    }
    getDirection(delta, threshold = 10) {
        const absDelta = delta.mag();
        if (absDelta < threshold) {
            return GameConst_1.Direction.NONE;
        }
        return GameUtils_1.getDirection(delta);
    }
    setEnabled(enabled) {
        this._isEnabled = enabled;
    }
    onDestroy() {
        this.target.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.target.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.target.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }
};
__decorate([
    property(cc.Node)
], TouchHandler.prototype, "target", void 0);
__decorate([
    property(PlayPanel_1.default)
], TouchHandler.prototype, "playPanel", void 0);
TouchHandler = __decorate([
    ccclass
], TouchHandler);
exports.default = TouchHandler;

cc._RF.pop();
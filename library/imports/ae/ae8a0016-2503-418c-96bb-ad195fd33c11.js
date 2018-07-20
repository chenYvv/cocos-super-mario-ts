"use strict";
cc._RF.push(module, 'ae8a0AWJQNBjJa7rRlf0zwR', 'Player');
// script/Player.ts

// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 跳跃高度
        _this.jumpHeight = 0;
        // 跳跃一次的时间
        _this.jumpDuration = 0;
        // 加速度
        _this.accel = 0;
        // 最大速度
        _this.maxSpeed = 0;
        _this.xSpeed = 0;
        _this.accLeft = false;
        _this.accRight = false;
        return _this;
    }
    // 跳跃动作
    Player.prototype.setJumpAction = function () {
        // 上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下降
        var jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    };
    // 初始化
    Player.prototype.onLoad = function () {
        // 使用重复跳跃
        this.node.runAction(this.setJumpAction());
        // 初始化输入监听
        this.addEventListeners();
        // 初始化加速度方向
        this.accLeft = false;
        this.accRight = false;
        // 初始化速度
        this.xSpeed = 0;
    };
    // 按键监听
    Player.prototype.addEventListeners = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
    };
    // 向左
    Player.prototype.moveLeft = function () {
        this.accLeft = true;
        this.accRight = false;
        this.node.scaleX = -1;
    };
    // 向右
    Player.prototype.moveRight = function () {
        this.accLeft = false;
        this.accRight = true;
        this.node.scaleX = 1;
    };
    // 停止左右
    Player.prototype.stopMove = function () {
        this.accLeft = false;
        this.accRight = false;
    };
    // 键盘-按下
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.moveLeft();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.moveRight();
                break;
        }
    };
    // 键盘-弹起
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.stopMove();
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.stopMove();
                break;
        }
    };
    // 屏幕-按下
    Player.prototype.onScreenTouchStart = function (event) {
        console.log(event.getLocation());
        if (event.getLocationX() > cc.winSize.width / 2) {
            this.moveRight();
        }
        else {
            this.moveLeft();
        }
    };
    // 屏幕-抬起
    Player.prototype.onScreenTouchEnd = function (event) {
        this.stopMove();
    };
    Player.prototype.update = function (dt) {
        // 更新速度
        if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        else if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        // 最大速度限制
        if (Math.abs(this.xSpeed) > this.maxSpeed) {
            this.xSpeed = this.maxSpeed * (this.xSpeed / Math.abs(this.xSpeed));
        }
        // 更新位置x
        this.node.x += this.xSpeed * dt;
        // 限制超出屏幕
        if (Math.abs(this.node.x) > (this.node.parent.width / 2 - this.node.width / 2)) {
            // 速度归零
            this.xSpeed = 0;
            this.node.x = (this.node.parent.width / 2 - this.node.width / 2) * (this.node.x / Math.abs(this.node.x));
        }
    };
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "maxSpeed", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.Player = Player;

cc._RF.pop();
"use strict";
cc._RF.push(module, '2f7f5R4HqFDxq7QUGpVXtl2', 'Coin');
// script/Coin.ts

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
var Coin = /** @class */ (function (_super) {
    __extends(Coin, _super);
    function Coin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 马里奥 得到 硬币的距离，达到这个距离算得到，重新生成硬币
        _this.pickRaius = 0;
        _this.game = null;
        return _this;
    }
    Coin.prototype.init = function (game) {
        this.game = game;
    };
    // 获得硬币和马里奥字间的距离
    Coin.prototype.getPlayerDistance = function () {
        var playerpos = this.game.playerNode.getPosition();
        return cc.pDistance(this.node.position, playerpos);
    };
    // 获得硬币时
    Coin.prototype.onGetCoin = function () {
<<<<<<< HEAD
        // 创建新 硬币prefab
        this.game.createNewCoin();
        // 增加积分
        this.game.gainScore();
        // 销毁当前硬币节点
=======
        // 创建新的硬币
        this.game.createNewCoin();
        // 加积分
        this.game.gainScore();
        // 删除现在的硬币
>>>>>>> 154a41b2947654de198298777320ee0ce1160ba2
        this.node.destroy();
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    // start () {
    // }
    Coin.prototype.update = function (dt) {
        // 如果小于距离就获取
        if (this.getPlayerDistance() < this.pickRaius) {
            this.onGetCoin();
            return;
        }
        // 按照计时器和最大时间 比例来减少透明度
        var coinMinOpacity = 50;
        var coinOpacityRatio = this.game.timer / this.game.coinDuration;
        this.node.opacity = 255 - Math.floor((255 - coinMinOpacity) * coinOpacityRatio);
    };
    __decorate([
        property(cc.Integer)
    ], Coin.prototype, "pickRaius", void 0);
    Coin = __decorate([
        ccclass
    ], Coin);
    return Coin;
}(cc.Component));
exports.Coin = Coin;

cc._RF.pop();
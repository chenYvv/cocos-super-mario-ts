(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/Game.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1c41dxCxF5JU52+a8qMnxxu', 'Game', __filename);
// script/Game.ts

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
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 硬币 资源
        _this.coinPerfab = null;
        // 地面节点 用来设置硬币高度
        _this.groundNode = null;
        // 马里奥节点
        _this.playerNode = null;
        // 积分显示节点
        _this.scoreLabel = null;
        // 硬币节点
        _this.coinNode = null;
        // 积分
        _this.score = 0;
        return _this;
        // update (dt) {}
    }
    // 初始化
    Game.prototype.onLoad = function () {
        // 创建硬币
        this.createNewCoin();
    };
    // 生成一个新的硬币
    Game.prototype.createNewCoin = function () {
        // 使用perfab创造节点
        var newCoin = cc.instantiate(this.coinPerfab);
        // 添加到Canvas节点下
        this.node.addChild(newCoin);
        this.coinNode = newCoin;
        newCoin.setPosition(this.createNewCoinPos());
        // 将 Game 组件的实例传入星星组件
        newCoin.getComponent('Coin').game = this;
    };
    // 硬币随机生成一个坐标
    Game.prototype.createNewCoinPos = function () {
        // 硬币长宽
        var coinWith = this.coinNode.width;
        var coinHeight = this.coinNode.height;
        // 地面高度
        var groundY = this.groundNode.y + this.groundNode.height / 2;
        // 生成坐标
        var coinY = groundY + coinHeight / 2 + this.playerNode.getComponent('Player').jumpHeight * cc.random0To1();
        var coinX = cc.randomMinus1To1() * this.node.width / 2;
        coinX += coinWith / 2 * -(Math.abs(coinX) / coinX);
        return cc.p(coinX, coinY);
    };
    // 增加积分
    Game.prototype.gainScore = function () {
        this.score++;
        this.scoreLabel.string = 'Score:' + this.score.toString;
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    Game.prototype.start = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "coinPerfab", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "groundNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "playerNode", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "scoreLabel", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.Game = Game;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Game.js.map
        
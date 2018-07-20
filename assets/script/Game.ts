// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Player } from "./Player";

const {ccclass, property} = cc._decorator;

@ccclass
export class Game extends cc.Component {

    // 硬币 资源
    @property(cc.Prefab)
    private coinPerfab: cc.Prefab = null;

    // 地面节点 用来设置硬币高度
    @property(cc.Node)
    private groundNode: cc.Node = null;

    // 马里奥节点
    @property(cc.Node)
    public playerNode: cc.Node = null;

    // 积分显示节点
    @property(cc.Node)
    public scoreLabel: cc.Label = null;

    // 硬币节点
    private coinNode: cc.Node = null;
    // 积分
    private score: number = 0;

    // 初始化
    protected onLoad() {
        // 创建硬币
        this.createNewCoin();
    }

    // 生成一个新的硬币
    public createNewCoin() {
        // 使用perfab创造节点
        let newCoin = cc.instantiate(this.coinPerfab);
        // 添加到Canvas节点下
        this.node.addChild(newCoin);
        this.coinNode = newCoin;
        newCoin.setPosition(this.createNewCoinPos());
        // 将 Game 组件的实例传入星星组件
        newCoin.getComponent('Coin').game = this;
    }

    // 硬币随机生成一个坐标
    public createNewCoinPos() {
        // 硬币长宽
        let coinWith = this.coinNode.width;
        let coinHeight = this.coinNode.height;
        // 地面高度
        let groundY = this.groundNode.y + this.groundNode.height/2;
        // 生成坐标
        let coinY = groundY + coinHeight/2 + this.playerNode.getComponent('Player').jumpHeight * cc.random0To1();
        let coinX = cc.randomMinus1To1() * this.node.width/2;
        coinX += coinWith/2 * -(Math.abs(coinX)/coinX);
        return cc.p(coinX, coinY);
    }

    // 增加积分
    public gainScore() {
        this.score ++;
        this.scoreLabel.string = 'Score:' +  this.score.toString;
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}

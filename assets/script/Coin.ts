// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

import { Game } from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export class Coin extends cc.Component {

    // 马里奥 得到 硬币的距离，达到这个距离算得到，重新生成硬币
    @property(cc.Integer)
    private pickRaius: number = 0;
    private game: Game = null;

    public init(game) {
        this.game = game;
    }

    
    // 获得硬币和马里奥字间的距离
    public getPlayerDistance (){
        let playerpos = this.game.playerNode.getPosition();
        return cc.pDistance(this.node.position, playerpos);
    }

    // 获得硬币时
    public onGetCoin() {
        // 创建新 硬币prefab
        this.game.createNewCoin();
        // 增加积分
        this.game.gainScore();
        // 销毁当前硬币节点
        this.node.destroy();
    }


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    update (dt) {
        // 如果小于距离就获取
        if (this.getPlayerDistance() < this.pickRaius) {
            this.onGetCoin();
            return;
        }
        // 按照计时器和最大时间 比例来减少透明度
        let coinMinOpacity = 50;
        let coinOpacityRatio = this.game.timer/this.game.coinDuration;
        this.node.opacity = 255 - Math.floor((255 - coinMinOpacity)*coinOpacityRatio);
    }
}

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
        // 创建新的硬币
        this.game.createNewCoin();
        // 加积分
        this.game.gainScore();
        // 删除现在的硬币
        this.node.destroy();
    }


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {

    // }

    update (dt) {
        if (this.getPlayerDistance() < this.pickRaius) {
            this.onGetCoin();
            return;
        }
    }
}

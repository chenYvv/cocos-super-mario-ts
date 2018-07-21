// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export class Player extends cc.Component {
    // 跳跃高度
    @property(cc.Integer)
    private jumpHeight: number = 0;

    // 跳跃一次的时间
    @property(cc.Integer)
    private jumpDuration: number = 0;

    // 加速度
    @property(cc.Integer)
    private accel: number = 0;

    // 最大速度
    @property(cc.Integer)
    private maxSpeed: number = 0;

    private xSpeed: number = 0;
    private accLeft: boolean = false;
    private accRight: boolean = false;

    // 跳跃动作
    private setJumpAction() {
        // 上升
        let jumpUp = cc.moveBy(this.jumpDuration, cc.p(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下降
        let jumpDown = cc.moveBy(this.jumpDuration, cc.p(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    }

    // 初始化
    protected onLoad() {
        // 使用重复跳跃
        this.node.runAction(this.setJumpAction());

        // 初始化输入监听
        this.addEventListeners();

        // 初始化加速度方向
        this.accLeft = false;
        this.accRight = false;

        // 初始化速度
        this.xSpeed = 0;
    }

    // 按键监听
    private addEventListeners() {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd, this);
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
    }

    // 向左
    private moveLeft () {
        this.accLeft = true;
        this.accRight = false;
        this.node.scaleX = -1;
    }
    
    // 向右
    private moveRight () {
        this.accLeft = false;
        this.accRight = true;
        this.node.scaleX = 1;
    }

    // 停止左右
    private stopMove () {
        this.accLeft = false;
        this.accRight = false;
    }

    // 键盘-按下
    private onKeyDown(event) {
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
    }

    // 键盘-弹起
    private onKeyUp(event) {
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
    }

    // 屏幕-按下
    private onScreenTouchStart(event: cc.Event.EventTouch) {
        if ( event.getLocationX() > cc.winSize.width/2 ){
            this.moveRight();
        }else{
            this.moveLeft();
        }
    }

    // 屏幕-抬起
    private onScreenTouchEnd(event: cc.Event.EventTouch) {
        this.stopMove();
    }

    protected update(dt) {
        // 更新速度
        if(this.accRight){
            this.xSpeed += this.accel * dt;
        }else if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        }

        // 最大速度限制
        if( Math.abs(this.xSpeed) > this.maxSpeed ) {
            this.xSpeed = this.maxSpeed * (this.xSpeed/Math.abs(this.xSpeed));
        }
        // 更新位置x
        this.node.x += this.xSpeed * dt;
        
        // 限制超出屏幕
        if( Math.abs(this.node.x) > (this.node.parent.width/2 - this.node.width/2) ){
            // 速度归零
            this.xSpeed = 0;
            this.node.x = (this.node.parent.width/2 - this.node.width/2) * (this.node.x/Math.abs(this.node.x))
        }
        
    }

}

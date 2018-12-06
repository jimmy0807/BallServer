//class BallAction{}
function BallAction(){}

BallAction.prototype.startIntervalMove = function(ball, notMoveImmediately)
{
    if ( !notMoveImmediately )
    {
        this.justMove(ball)
    }
    
    that = this
    ball.interval = setInterval(function () {
        that.justMove(ball)
    },10)
}

BallAction.prototype.stopIntervalMove = function(ball)
{
    if ( ball.interval != null )
    {
        clearInterval(ball.interval)
        ball.interval = null
    }
}

BallAction.prototype.moveToTargetPostion = function(ball)
{
    var that = this

    var times = 10
    var count = 10
    catchUp = ball.catchUp
    if ( ball.orignalSpeedX != null )
    {
        catchUp.speedX = ball.orignalSpeedX
    }
    else
    {
        ball.orignalSpeedX = ball.speedX
        catchUp.speedX = ball.speedX
    }

    if ( ball.orignalSpeedY != null )
    {
        catchUp.speedY = ball.orignalSpeedY
    }
    else
    {
        ball.orignalSpeedY = ball.speedY
        catchUp.speedY = ball.speedY
    }

    console.log("catchUp速度 x:" + catchUp.speedX + "  y:" + catchUp.speedY)

    
    catchUp.offsetWidth = ball.offsetWidth
    catchUp.offsetHeight = ball.offsetHeight

    //先计算10次后 球的真正位置
    caculateNextPostion(ball, count)
    
    ball.xflag = catchUp.x - ball.x > 0 ? 1 : -1;
    ball.yflag = catchUp.y - ball.y > 0 ? 1 : -1;
    ball.speedX = Math.abs(( catchUp.x - ball.x ) / count)
    ball.speedY = Math.abs(( catchUp.y - ball.y ) / count)

    console.log("速度 x:" + ball.speedX + "  y:" + ball.speedY)

    that.stopIntervalMove(ball)
    
    ball.interval = setInterval(function () {
        if ( times > 0 )
        {
            times--;
        }
        else if ( times == 0 )
        {
            times--;
            ball.xflag = catchUp.xflag;
            ball.yflag = catchUp.yflag;
            ball.speedX = catchUp.speedX;
            ball.speedY = catchUp.speedY;
            ball.orignalSpeedX = ball.speedX
            ball.orignalSpeedY = ball.speedY

            console.log("恢复速度 x:" + ball.speedX + "  y:" + ball.speedY)
        }
        that.justMove(ball)
    },10)
}

function caculateNextPostion(ball, count)
{
    catchUp = ball.catchUp

    for ( var i = 0; i < count; i++ )
    {
        if (catchUp.yflag == 1) {
            //小球向下移动
            catchUp.y += catchUp.speedY;
            if (catchUp.y >= 800 - catchUp.offsetWidth) {
                catchUp.y = 800 - catchUp.offsetWidth;
                catchUp.yflag = -1;
            }
        } else if (catchUp.yflag == -1) {
            //小球向上移动
            catchUp.y -= catchUp.speedY;
            if (catchUp.y <= 0) {
                catchUp.y = 0;
                catchUp.yflag = 1;
            }
        }
    
        if ( catchUp.xflag == 1 ) {
            //小球向右移动
            catchUp.x += catchUp.speedX;
            if (catchUp.x >= 1300 - catchUp.offsetHeight) {
                catchUp.x = 1300 - catchUp.offsetHeight;
                catchUp.xflag = -1;
            }
        } else if (catchUp.xflag == -1) {
            //小球向左移动
            catchUp.x -= catchUp.speedX;
            if (catchUp.x <= 0) {
                catchUp.x = 0;
                catchUp.xflag = 1;
            }
        }
    }
}

BallAction.prototype.justMove = function(ball)
{
    ball.style.top = ball.y + "px";
    ball.style.left = ball.x + "px";
    //判断小球的标志量，对小球作出相应操作
    if (ball.yflag == 1) {
        //小球向下移动
        ball.y += ball.speedY;
        if (ball.y >= 800 - ball.offsetWidth) {
            ball.y = 800 - ball.offsetWidth;
            ball.yflag = -1;
        }
    } else if (ball.yflag == -1) {
        //小球向上移动
        ball.y -= ball.speedY;
        if (ball.y <= 0) {
            ball.y = 0;
            ball.yflag = 1;
        }
    }

    if ( ball.xflag == 1 ) {
        //小球向右移动
        ball.x += ball.speedX;
        if (ball.x >= 1300 - ball.offsetHeight) {
            ball.x = 1300 - ball.offsetHeight;
            ball.xflag = -1;
        }
    } else if (ball.xflag == -1) {
        //小球向左移动
        ball.x -= ball.speedX;
        if (ball.x <= 0) {
            ball.x = 0;
            ball.xflag = 1;
        }
    }

    this.crash(ball)
}

var x1, y1, x2, y2;
//碰撞函数
BallAction.prototype.crash = function(ballObj) {
    //通过传过来的小球对象来获取小球的X坐标和Y坐标
    x1 = ballObj.x;
    y1 = ballObj.y;
    for (var i = 0; i < balls.length; i++) {
        //确保不和自己对比
        if (ballObj != balls[i]) {
            x2 = balls[i].x;
            y2 = balls[i].y;
            //判断位置的平方和小球的圆心坐标的关系
            var test = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)
            var test2 = Math.pow(ballObj.offsetWidth + balls[i].offsetWidth, 2)
            if (Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + 1 <= Math.pow(ballObj.offsetWidth / 2 + balls[i].offsetWidth / 2, 2)) {
                //判断传过来的小球对象，相对于碰撞小球的哪个方位
                if (ballObj.x < balls[i].x) {
                    if (ballObj.y < balls[i].y) {
                        //小球对象在被碰小球的左上角
                        ballObj.yflag = -1;
                        ballObj.xflag = -1;
                    } else if (ballObj.y > balls[i].y) {
                        //小球对象在被碰小球的左下角
                        ballObj.xflag = -1;
                        ballObj.yflag = 1;
                    } else {
                        //小球对象在被撞小球的正左方
                        ballObj.xflag = -1;
                    }
                } else if (ballObj.x > balls[i].x) {
                    if (ballObj.y < balls[i].y) {
                        //小球对象在被碰撞小球的右上方
                        ballObj.yflag = -1;
                        ballObj.xflag = 1;
                    } else if (ballObj.y > balls[i].y) {
                        //小球对象在被碰撞小球的右下方
                        ballObj.xflag = 1;
                        ballObj.yflag = 1;
                    } else {
                        //小球对象在被撞小球的正右方
                        ballObj.xflag = 1;
                    }
                } else if (ballObj.y > balls[i].y) {
                    //小球对象在被撞小球的正下方
                    ballObj.yflag = 1;
                } else if (ballObj.y < balls[i].y) {
                    //小球对象在被撞小球的正上方
                    ballObj.yflag = -1;
                }
                //Laketony:碰撞后的动能增加
                // ballObj.speed = 2.0;
                // balls[i].speed = 2.0;
            }
        }
    }
}
    
var ballActionManager = new BallAction()
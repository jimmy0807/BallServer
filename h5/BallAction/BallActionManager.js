//class BallAction{}
function BallAction(){}

BallAction.prototype.startIntervalMove = function(ball)
{
    this.justMove(ball)
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
    catchUp = ball.catchUp
   
    catchUp.remoteX = parseFloat(message.pos.split(",")[0])
    catchUp.remoteY = parseFloat(message.pos.split(",")[1])
    catchUp.xflag = message.pos.split(",")[2] == "true" ? true : false;
    catchUp.yflag = message.pos.split(",")[3] == "true" ? true : false;
}

BallAction.prototype.justMove = function(ball)
{
    ball.style.top = ball.y + "px";
    ball.style.left = ball.x + "px";
    //判断小球的标志量，对小球作出相应操作
    if (ball.yflag == -1) {

    }
    else if (ball.yflag) {
        //小球向下移动
        ball.y += ball.speedY;
        if (ball.y >= 800 - ball.offsetWidth) {
            ball.y = 800 - ball.offsetWidth;
            ball.yflag = false;
        }
    } else {
        //小球向上移动
        ball.y -= ball.speedY;
        if (ball.y <= 0) {
            ball.y = 0;
            ball.yflag = true;
        }
    }

    if (ball.xflag == -1) {

    }else if (ball.xflag) {
        //小球向右移动
        ball.x += ball.speedX;
        if (ball.x >= 1300 - ball.offsetHeight) {
            ball.x = 1300 - ball.offsetHeight;
            ball.xflag = false;
        }
    } else {
        //小球向左移动
        ball.x -= ball.speedX;
        if (ball.x <= 0) {
            ball.x = 0;
            ball.xflag = true;
        }
    }
}

var ballActionManager = new BallAction()
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
    times = 10
    count = 10
    catchUp = ball.catchUp
   
    catchUp.remoteX = parseFloat(message.pos.split(",")[0])
    catchUp.remoteY = parseFloat(message.pos.split(",")[1])
    catchUp.xflag = message.pos.split(",")[2] == "1" ? 1 : -1;
    catchUp.yflag = message.pos.split(",")[3] == "1" ? 1 : -1; 
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
}

var ballActionManager = new BallAction()
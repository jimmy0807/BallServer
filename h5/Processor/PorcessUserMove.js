processUserMove = (message) =>
{
	createBalls2(JSON.parse(message));
}

function createBalls2(message) {
    var ball
    for (var i = 0; i < balls.length; i++ )
    {
        ball = balls[i];
        if ( ball.userID == message.userID )
        {
            break;
        }
    }

    if ( ball == null )
    {
        return;
    }

    caculateDelay(ball, message)
}

function caculateDelay(ball, message)
{
    //这里要加上网络的延时造成的距离 之后加
    
    // remoteX = parseFloat(message.pos.split(",")[0])
    // remoteY = parseFloat(message.pos.split(",")[1])

    // currentX = ball.x
    // currentY = ball.y

    // maxDistance = Math.max(Math.abs(remoteX - currentX), Math.abs(remoteY - currentY))

    // //暂时用10次timer来追


    // console.log("ball.x = " + ball.x + " remote is: " + x)
    // console.log("ball.y = " + ball.y + " remote is: " + y)
    // ball.xflag = message.pos.split(",")[2] == "true" ? true : false;
    // ball.yflag = message.pos.split(",")[3] == "true" ? true : false;

    var catchUp = {}
    catchUp.remoteX = parseFloat(message.pos.split(",")[0])
    catchUp.remoteY = parseFloat(message.pos.split(",")[1])
    catchUp.xflag = message.pos.split(",")[2] == "true" ? true : false;
    catchUp.yflag = message.pos.split(",")[3] == "true" ? true : false;

    ball.catchUp.ball = catchUp

    ballActionManager.moveToTargetPostion(ball)
}
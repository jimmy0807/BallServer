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

    ball.x = parseFloat(message.pos.split(",")[0])
    ball.y = parseFloat(message.pos.split(",")[1])
    ball.xflag = message.pos.split(",")[2] == "true" ? true : false;
    ball.yflag = message.pos.split(",")[3] == "true" ? true : false;
}
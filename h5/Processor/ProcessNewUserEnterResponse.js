processNewUserEnterResponse = (message) =>
{
    var json = JSON.parse(message)
    var users = json["users"]
    for (var i = 0; i < users.length; i++ )
    {
        var user = users[i]
        var ball = ballsHash[user.userID]
        if ( ball == null )
        {
            createBalls(user)
        }
        else
        {
            ball.x = parseFloat(user.pos.split(",")[0])
            ball.y = parseFloat(user.pos.split(",")[1])
            ball.xflag = user.pos.split(",")[2] == "1" ? 1 : -1;
            ball.yflag = user.pos.split(",")[3] == "1" ? 1 : -1;
        }
    }
}
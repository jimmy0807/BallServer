processOnReady = (message) =>
{
    msg = JSON.parse(message)
    userID = msg.userID
    ballsHash[userID] = balls[0]
}

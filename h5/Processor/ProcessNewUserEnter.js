processNewUserEnter = (message) =>
{
	createBalls(JSON.parse(message));
}

function createBalls(message) {
    var ball = document.createElement("p");
    //随机小球起始的X坐标和小球的Y坐标
    ball.x = parseFloat(message.pos.split(",")[0])
    ball.y = parseFloat(message.pos.split(",")[1])
    ball.xflag = message.pos.split(",")[2] == "true" ? true : false;
    ball.yflag = message.pos.split(",")[3] == "true" ? true : false;
   
    ball.speed = 0.5

    //随机小球的背景颜色
    //ball.style.backgroundColor = i == 0 ? "#F00" : randomColor();
    ball.style.backgroundColor = randomColor();
    ball.innerHTML = balls.length + 1;
    //将小球插入当wrapDiv中
    wrapDiv.appendChild(ball);
    //将所有的小球存储到数组中
    balls.push(ball);

    moveBalls(ball, balls.length - 1);
}
jivue = new Vue({
    el: '#ji',
    data: {
      message: 'Hello Vue.js!'
    },
    // 在 `methods` 对象中定义方法
    methods: {
      btnFxL: function (event) {
        // `this` 在方法里指当前 Vue 实例
        console.log('Hello ' + this.name + '!');
        // `event` 是原生 DOM 事件
        if (event) {
            console.log(event.target.tagName);
            moveball1x(1);
        }
      },
      btnFxU: function (event) {
        // `this` 在方法里指当前 Vue 实例
        console.log('Hello ' + this.name + '!');
        // `event` 是原生 DOM 事件
        if (event) {
            console.log(event.target.tagName);
            moveball1y(1);
        }
      },
      btnFxD: function (event) {
        // `this` 在方法里指当前 Vue 实例
        console.log('Hello ' + this.name + '!');
        // `event` 是原生 DOM 事件
        if (event) {
            console.log(event.target.tagName);
            moveball1y(0);
        }
      },
      btnFxR: function (event) {
        // `this` 在方法里指当前 Vue 实例
        console.log('Hello ' + this.name + '!');
        // `event` 是原生 DOM 事件
        if (event) {
            console.log(event.target.tagName);
            moveball1x(0);
        }
      }
    }
    
  });
  // balls[0].speed = 0.5;
  function moveball1x(xf ) {
		var ball = balls[0];
    ball.xflag = xf == 0? 1 : -1;

    console.log(ball);

    var message = {}
					
    message.pos = ball.x + "," + ball.y + "," + ball.xflag + "," + ball.yflag
    message.userID = userID
    message.data = "你好"
    var bytes = JSON.stringify(message)
  
    websocketManager.sendObject(messageEnum.UserMoveMessage, message)
      
  }
  function moveball1y(yf) {
		var ball = balls[0];
   
    ball.yflag = yf == 0? 1 : -1;  
    console.log(ball);

    var message = {}
					
    message.pos = ball.x + "," + ball.y + "," + ball.xflag + "," + ball.yflag
    message.userID = userID
    message.data = "你好"
    var bytes = JSON.stringify(message)
  
    websocketManager.sendObject(messageEnum.UserMoveMessage, message)
	}
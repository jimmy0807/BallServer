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
  balls[0].speed = 0.5;
  function moveball1x(xf ) {
		var ballObj = balls[0];
    ballObj.xflag = xf == 0?true:false;
    ballObj.yflag = -1
    console.log(ballObj);
  }
  function moveball1y(yf) {
		var ballObj = balls[0];
    ballObj.xflag = -1
    ballObj.yflag = yf == 0?true:false;  
    console.log(ballObj);
	}
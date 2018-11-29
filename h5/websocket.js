var socket = new WebSocket("ws://127.0.0.1:12345/ws");
socket.binaryType = "arraybuffer";
socket.onmessage = function(e)
{
    socketManager.onMessage(e);
};

socket.onopen = function (e)
{
	console.log("已连接至服务器");
	socketManager.onOpen(e);
};
  
socket.onclose = function (e)
{
    socketManager.onClose(e);
};
   
socket.onerror = function (e)
{
   console.log("出现错误");
   socketManager.onClose(e);
};

var socketManager = {
	sendData : function(messageType, data)
	{
		var buf = stringToBytes(data);
        var buffer = new ArrayBuffer(4 + buf.length);
        var view = new DataView(buffer);
        view.setUint32(0, messageType);

        var startIndex = -1;
        for (var i = 0; i < buf.length; i++) {
            view.setUint8(i + 4, buf[i]);
        }

        socket.send(view);
	},
	sendObject : function(messageType, object)
	{
		this.sendData(messageType, JSON.stringify(object))
	},
	onMessage : function(e){},
	onOpen : function (e){},
	onClose : function (e){},
}

function stringToBytes(str) {
	var bytes = new Array();
	var len, c;
	len = str.length;
	for(var i = 0; i < len; i++) {
	  c = str.charCodeAt(i);
	  if(c >= 0x010000 && c <= 0x10FFFF) {
	    bytes.push(((c >> 18) & 0x07) | 0xF0);
	    bytes.push(((c >> 12) & 0x3F) | 0x80);
	    bytes.push(((c >> 6) & 0x3F) | 0x80);
	    bytes.push((c & 0x3F) | 0x80);
	  } else if(c >= 0x000800 && c <= 0x00FFFF) {
	    bytes.push(((c >> 12) & 0x0F) | 0xE0);
	    bytes.push(((c >> 6) & 0x3F) | 0x80);
	    bytes.push((c & 0x3F) | 0x80);
	  } else if(c >= 0x000080 && c <= 0x0007FF) {
	    bytes.push(((c >> 6) & 0x1F) | 0xC0);
	    bytes.push((c & 0x3F) | 0x80);
	  } else {
	    bytes.push(c & 0xFF);
	  }
	}

	return bytes;
}

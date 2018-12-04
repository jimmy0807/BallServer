window.onload = function()
{
    var jsArray = new Array({name:"websocket.js",func:onWebSocketJSOnLoaded})
    for ( var i = 0; i < jsArray.length; i++ )
    {
        script = document.createElement("script");
        script.setAttribute("type","text/javascript");
        script.setAttribute("src",jsArray[i].name);
        callback = jsArray[i].func
        document.body.appendChild(script);

        script.onload = script.onreadystatechange = function () {
            if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete"){
                if ( callback != null )
                {
                    callback()
                }
                script.onload = script.onreadystatechange = null;
            }
        };
    }
}

function onWebSocketJSOnLoaded()
{
    websocket.onMessage = function(e)
    {
        var receive = [];
        var buffer = event.data
        
        var arr = [];

        for (var i = 0, j = 4; i < j; ++i) {
          arr.push(buffer.charCodeAt(i));
        }

        var messageType = new DataView(new Uint8Array(arr).buffer).getUint32(0);
        var bytes = event.data.slice(4);

        var f = websocketManager.procssorChain[messageType]
        if ( f != null )
        {
            f(bytes)
        }
    }
    
    websocket.onOpen = function(e)
    {
    }

    websocket.onClose = function(e)
    {
    }
}

function test(bytes)
{

}

var websocketManager = {
	sendData : function(messageType, data)
	{
		websocket.sendData(messageType, data)
	},
	sendObject : function(messageType, object)
	{
		this.sendData(messageType, JSON.stringify(object))
	},
    registerProcssor : function(messageType, func){
        this.procssorChain[messageType] = func
    },
}

websocketManager.procssorChain = {}
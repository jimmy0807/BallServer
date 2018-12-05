package websocket

type onConnected func(client *Client)
type onDisConnected func(message Message)
type onMessage func(message []byte, client *Client)

//Delegate 代理
type Delegate struct {
	onConnected    onConnected
	onDisConnected onDisConnected
	onMessage      onMessage
}

//SetOnConnected 设置连接代理
func (d *Delegate) SetOnConnected(onConnected onConnected) {
	d.onConnected = onConnected
}

//SetOnDisConnected 设置连接代理
func (d *Delegate) SetOnDisConnected(onDisConnected onDisConnected) {
	d.onDisConnected = onDisConnected
}

//SetOnMessage 设置连接代理
func (d *Delegate) SetOnMessage(onMessage onMessage) {
	d.onMessage = onMessage
}

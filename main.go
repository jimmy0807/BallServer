package main

import (
	"fmt"
	"net/http"

	"ball/net/socket"
)

func main() {
	fmt.Println("Starting application...")

	webSocketDelegate := new(websocket.Delegate)
	webSocketDelegate.SetOnConnected(onConnected)
	webSocketDelegate.SetOnDisConnected(onDisConnected)
	webSocketDelegate.SetOnMessage(onMessage)
	go websocket.Instance().Start(webSocketDelegate)

	http.HandleFunc("/ws", wsPage)
	http.ListenAndServe(":12345", nil)
}

func wsPage(res http.ResponseWriter, req *http.Request) {
	websocket.Instance().Upgrader(res, req)
}

func onConnected(message websocket.Message) {

}

func onDisConnected(message websocket.Message) {

}

func onMessage(message websocket.Message) {

}

package main

import (
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
	"net/http"
	"unsafe"

	"ball/net/socket"
	"ball/net/socket/Message"
	"ball/net/socket/Processor"
	"ball/net/socket/Tools"
)

var processingChain map[uint32]processor.ProcessingChain

func main() {
	fmt.Println("Starting application...")

	registerProcssor()
	registerResponse()

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

func registerProcssor() {
	processingChain = make(map[uint32]processor.ProcessingChain)
	processingChain[message.NewUserEnter] = processor.AddProcessor(message.NewUserEnter, processor.NewUserEnterProcess)
	processingChain[message.UserMovedBroadCast] = processor.AddProcessor(message.UserMoveMessage, processor.UserMoveProcess)
}

func registerResponse() {

}

func onConnected(client *websocket.Client) {
	var msg message.OnReadyMessage
	msg.UserID = client.ID

	var buffer bytes.Buffer //Buffer是一个实现了读写方法的可变大小的字节缓冲

	jsonMessage, _ := json.Marshal(msg)

	buffer.Write(Tools.IntToBytes(message.OnReadyBroadCast))
	buffer.Write(jsonMessage)

	websocket.Instance().SendToOneClient(buffer.Bytes(), client)
}

func onDisConnected(message websocket.Message) {

}

func onMessage(message []byte, client *websocket.Client) {
	s := int16(0x1234)
	b := int8(s)
	fmt.Println("int16字节大小为", unsafe.Sizeof(s)) //结果为2

	// c1 := string(message[7:8])
	// fmt.Println(c1)
	var messageType uint32

	if 0x34 == b {
		fmt.Println("little endian")
		messageType = binary.BigEndian.Uint32(message)
		fmt.Println(string(message[4:]))
		processingChain[messageType].ProcessFunction(message[4:], client)
	} else {
		fmt.Println("big endian")
		messageType = binary.LittleEndian.Uint32(message)
	}

	// fmt.Println(aa)
	// c2 := message[4:8]
	// fmt.Println(c2)
	// c3 := string(c2)
	// fmt.Println(c3)
	// fmt.Println(string(message[4:5]))
}

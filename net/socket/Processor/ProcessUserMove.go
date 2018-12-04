package processor

import (
	"ball/net/socket"
	"ball/net/socket/Message"
	"ball/net/socket/Tools"
	"bytes"
	"encoding/json"
	"fmt"
)

//UserMoveProcess 处理
func UserMoveProcess(object interface{}, client *websocket.Client) {
	var msg message.NewUserEnterMessage

	err := json.Unmarshal(object.([]byte), &msg)
	if err != nil {
		fmt.Println(err)
		return
	}

	var buffer bytes.Buffer //Buffer是一个实现了读写方法的可变大小的字节缓冲

	buffer.Write(Tools.IntToBytes(message.UserMovedBroadCast))
	buffer.Write(object.([]byte))

	websocket.Instance().Send(buffer.Bytes(), client)
}

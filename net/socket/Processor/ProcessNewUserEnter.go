package processor

import (
	"ball/net/socket"
	"ball/net/socket/Message"
	"bytes"
	"encoding/binary"
	"encoding/json"
	"fmt"
)

//NewUserEnterProcess 处理
func NewUserEnterProcess(object interface{}, client *websocket.Client) {
	var msg message.NewUserEnterMessage

	err := json.Unmarshal(object.([]byte), &msg)
	if err != nil {
		fmt.Println(err)
		return
	}

	var buffer bytes.Buffer //Buffer是一个实现了读写方法的可变大小的字节缓冲

	buffer.Write(IntToBytes(message.NewUserEnterBroadCast))
	buffer.Write(object.([]byte))

	websocket.Instance().Send(buffer.Bytes(), nil)
}

//IntToBytes sdf
func IntToBytes(n int) []byte {
	x := int32(n)

	bytesBuffer := bytes.NewBuffer([]byte{})
	binary.Write(bytesBuffer, binary.BigEndian, x)
	return bytesBuffer.Bytes()
}

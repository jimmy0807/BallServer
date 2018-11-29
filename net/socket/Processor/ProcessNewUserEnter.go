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
	var message message.NewUserEnterMessage

	err := json.Unmarshal(object.([]byte), &message)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(message.Position)

	bytesM := IntToBytes(2)
	var buffer bytes.Buffer //Buffer是一个实现了读写方法的可变大小的字节缓冲

	buffer.Write(bytesM)

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

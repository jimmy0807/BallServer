package processor

import (
	"ball/net/socket"
	"ball/net/socket/Message"
	"ball/net/socket/Tools"
	"ball/net/socket/User"
	"bytes"
	"fmt"

	jsoniter "github.com/json-iterator/go"
)

//NewUserEnterProcess 处理
func NewUserEnterProcess(object interface{}, client *websocket.Client) {
	var msg message.NewUserEnterMessage

	var json = jsoniter.ConfigCompatibleWithStandardLibrary
	err := json.Unmarshal(object.([]byte), &msg)
	if err != nil {
		fmt.Println(err)
		return
	}

	UserAccount.Instance().GetAllClients()[msg.UserID].Position = msg.Position

	var buffer bytes.Buffer //Buffer是一个实现了读写方法的可变大小的字节缓冲

	buffer.Write(Tools.IntToBytes(message.NewUserEnterBroadCast))
	buffer.Write(object.([]byte))

	websocket.Instance().Send(buffer.Bytes(), client)

	uers := message.NewUserEnterResponseBean{
		// Users: make([]message.NewUserEnterResponseOnePlayerBean, len(UserAccount.Instance().GetAllClients())-1, len(UserAccount.Instance().GetAllClients())-1),
		Users: make([]message.NewUserEnterResponseOnePlayerBean, 0),
	}

	for _, account := range UserAccount.Instance().GetAllClients() {

		userID := account.Client.ID
		if userID != msg.UserID {
			u := message.NewUserEnterResponseOnePlayerBean{
				Position: account.Position,
				UserID:   userID,
			}

			uers.Users = append(uers.Users, u)
		}
	}

	var buffer2 bytes.Buffer

	jsonMessage, _ := json.Marshal(&uers)
	buffer2.Write(Tools.IntToBytes(message.NewUserEnterResponse))
	buffer2.Write(jsonMessage)
	websocket.Instance().SendToOneClient(buffer2.Bytes(), client)
}

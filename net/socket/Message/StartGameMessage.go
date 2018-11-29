package message

import "ball/net/socket"

//StartGameMessage 进入游戏
type StartGameMessage struct {
	websocket.Message
	Position string `json:"pos,omitempty"`
}

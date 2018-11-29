package response

import "ball/net/socket"

//StartGameResponse 进入游戏响应
type StartGameResponse struct {
	websocket.Message
	Position string `json:"pos,omitempty"`
}

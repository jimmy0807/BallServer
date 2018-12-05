package message

//OnReadyMessage 进入游戏
type OnReadyMessage struct {
	UserID string `json:"userID,omitempty"`
}

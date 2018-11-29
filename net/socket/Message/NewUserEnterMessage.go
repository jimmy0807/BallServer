package message

//NewUserEnterMessage 进入游戏
type NewUserEnterMessage struct {
	Position string `json:"pos,omitempty"`
	UserID   int    `json:"userID,omitempty"`
}
